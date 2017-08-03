# imports - standard imports
import sys, os
import random
import threading

# imports - third-party imports
import addict
import numpy as np
from weka.core                import jvm as JVM
from weka.core.converters     import Loader
from weka.filters             import Filter
from weka.attribute_selection import ASSearch, ASEvaluation, AttributeSelection

# imports - module imports
from candis.config import CONFIG
from candis.ios    import cdata
from candis.ios    import json as JSON
from candis.util   import assign_if_none, get_rand_uuid_str

# importsm - standard imports
import os
import re
import json

# imports - third-party imports
import addict
import pandas as pd, arff
from rpy2.robjects.packages import importr
from rpy2                   import robjects

# imports - module imports
from candis.config   import CONFIG
from candis.resource import R
from candis.util     import assign_if_none
from candis.ios      import json as JSON

class Pipeline(object):
    CONFIG   = CONFIG.Pipeline

    PENDING  = 'PENDING' # addict.Dict({ 'name': 'pending' })
    READY    = 'READY'
    COMPLETE = 'COMPLETE'
    RUNNING  = 'RUNNING' # addict.Dict({ 'name': 'running' })
    FAILED   = 'FAILED'  # addict.Dict({ 'name': 'failed'  })

    def __init__(self, config = { }):
        self.status = Pipeline.PENDING
        self.config = Pipeline.CONFIG
        self.empty  = True
        self.message = ''

        self.set_config(config)

    def set_config(self, config):
        self.config.update(config)

    def set_status(self, status):
        self.status = status

    def load(path):
        if not os.path.isabs(path):
            path    = os.path.abspath(path)
        if not os.path.exists(path):
            raise IOError('{path} does not exist.'.format(path = path))
        if not os.path.isfile(path):
          raise IOError('{path} is not a valid input file.'.format(path = path))

        stages      = JSON.read(path)
        pipeline    = Pipeline()
        pipeline.set_status(Pipeline.READY)

        if len(stages) != 0:
            pipeline.empty = False

        ready       = True

        for stage in stages:
            stage   = addict.Dict(stage)
            if stage.status == 'RESOURCE_REQUIRED':
                ready = False
                break
        if not ready:
            pipeline.set_status(Pipeline.PENDING)
            return pipeline

        # check if file input is provided
        file        = [stage for stage in stages if stage['code'] == 'dat.fil']
        new_stages  = [ ]
        print(file)
        if len(file) == 0:
            pipeline.message = 'No valid file input provided.'
            return pipeline
        if len(file) > 1:
            pipeline.message = 'More than one input file provided.'
            return pipeline
        file        = file[0]
        file['status'] = Pipeline.RUNNING
        new_stages.append(file)

        preprocess = [stage for stage in stages if stage['code'].startswith('prp')]
        preconfig  = addict.Dict()
        for pre in preprocess:
            if pre['code'] == 'prp.bgc':
                preconfig.background_correction = pre['value']
            else:
                new_stages.append({ "label": "Robust Multi-Array Average", "code": "prp.bgc", "ID": get_rand_uuid_str(), "status": "RUNNING", "value": "rma", "name": "Background Correction"})
            if pre['code'] == 'prp.nrm':
                preconfig.normalization = pre['value']
            else:
                new_stages.append({ "label": "Quantiles", "code": "prp.nrm", "ID": get_rand_uuid_str(), "status": "RUNNING", "value": "quantiles", "name": "Normalization" })
            if pre['code'] == 'prp.pmc':
                preconfig.phenotype_microarray_correction = pre['value']
            else:
                new_stages.append({ "label": "PM Only", "code": "prp.pmc", "ID": get_rand_uuid_str(), "status": "RUNNING", "value": "pmonly", "name": "Phenotype Microarray Correction" })
            if pre['code'] == 'prp.sum':
                preconfig.summary = pre['value']
            else:
                new_stages.append({ "label": "Median Polish", "code": "prp.sum", "ID": get_rand_uuid_str(), "status": "RUNNING", "value": "medianpolish", "name": "Summarization" })
            if pre['code'] == 'prp.kcv':
                preconfig.folds = int(pre['value'])
            else:
                new_stages.append({ "label": "2", "code": "prp.kcv", "ID": get_rand_uuid_str(), "status": "RUNNING", "value": "2", "name": "k-Fold Cross-Validation" })

        JSON.write(path, new_stages)

        for i, stage in enumerate(new_stages):
            stage = addict.Dict(stage)

            if stage.code == 'dat.fil':
                value                   = os.path.join(stage.value.path, stage.value.name)
                new_stages[i]['status'] = Pipeline.RUNNING
                new_stages[i]['log']    = 'Reading File'

                JSON.write(path, new_stages)

                name        = '{path}.arff'.format(path = os.path.splitext(value)[0])
                cdat        = cdata.read(value)

                new_stages[i]['status'] = Pipeline.COMPLETE
                new_stages[i]['log']    = 'File Found'

                JSON.write(path, new_stages)
            

            JSON.write(path, new_stages)

        for i, stage in enumerate(new_stages):
            stage = addict.Dict(stage)

            if stage.code == 'prp.bgc':
                new_stages[i]['status'] = Pipeline.RUNNING
                new_stages[i]['log']    = 'Preprocessing...'

                JSON.write(path, new_stages)

                cdat.toARFF(name, verbose = True, express_config = preconfig)

                new_stages[i]['status'] = Pipeline.COMPLETE
                new_stages[i]['log']    = 'Complete...'

                JSON.write(path, new_stages)

        return pipeline

    def run(self, path, delimitter = ',', heap_size = 512, seed = None):
        self.set_status(Pipeline.RUNNING)

        if not os.path.isabs(path):
          path      = os.path.abspath(path)

        if not os.path.exists(path):
          self.set_status(Pipeline.FAILED)

          raise IOError('{path} does not exist.'.format(path = path))

        if not os.path.isfile(path):
          self.set_status(Pipeline.FAILED)

          raise IOError('{path} is not a valid input file.'.format(path = path))

        name        = '{path}.arff'.format(path = os.path.splitext(path)[0])
        cdat        = cdata.read(path, delimitter = delimitter)

        para        = self.config

        cdat.toARFF(name, express_config = para.Preprocess, verbose = True)
        
        JVM.start()

        load = Loader(classname = 'weka.core.converters.ArffLoader')
        data = load.load_file(name)
        data.class_index = cdat.iclss

        # cross-validation
        print('cross validating')
        seed = assign_if_none(seed, random.randint(0, 1000))

        opts = ['-S', str(seed), '-N', str(para.Preprocess.FOLDS)]
        wobj = Filter(classname = 'weka.filters.supervised.instance.StratifiedRemoveFolds', options = opts + ['-V'])
        wobj.inputformat(data)
        
        tran = wobj.filter(data)
        print(tran)

        wobj.options = opts
        test = wobj.filter(data)
        print(test)

        # end cross-validation
        # ----- feature selection ------
        comb   = [comb for comb in para.feature_selection if comb.use]
        for c in comb:
          meta = c.search
          srch = ASSearch(classname = 'weka.attributeSelection.{klass}'.format(klass = meta.name), options = encode(meta.options))
          meta = c.evaluator
          ewal = ASEvaluation(classname = 'weka.attributeSelection.{klass}'.format(klass = meta.name), options = encode(meta.options))
          
          attr = AttributeSelection()
          attr.search(srch)
          attr.evaluator(ewal)
          attr.select_attributes(tran)

          print(attr.selected_attributes)

        JVM.stop()