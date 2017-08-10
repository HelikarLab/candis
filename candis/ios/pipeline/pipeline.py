# imports - standard imports
import sys, os, warnings
import random
import threading
try:
    from io import StringIO # Python 3
except ImportError:
    from StringIO import StringIO # Python 2

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
from candis.ios    import pipeline
from candis.util   import assign_if_none, get_rand_uuid_str

class Pipeline(object):
    CONFIG   = CONFIG.Pipeline

    PENDING  = 'PENDING'
    READY    = 'READY'
    RUNNING  = 'RUNNING'
    COMPLETE = 'COMPLETE'

    def __init__(self, config = { }):
        self.status  = Pipeline.PENDING
        self.config  = Pipeline.CONFIG
        self.thread  = None
        self.stages  = [ ]

        self.set_config(config)

    def set_config(self, config):
        self.config.update(config)

    def set_status(self, status):
        self.status  = status

    def add_stages(self, *args):
        self.stages += args

        if any(stage == Pipeline.PENDING for stage in self.stages):
            self.set_status(Pipeline.PENDING)
        if all(stage == Pipeline.READY   for stage in self.stages):
            self.set_status(Pipeline.READY)

    # raise IOError, ValueError.
    def load(path):
        if not os.path.isabs(path):
            path     = os.path.abspath(path)

        if not os.path.exists(path):
            raise IOError('{path} does not exist.'.format(path = path))
        if not os.path.isfile(path):
            raise IOError('{path} is not a valid file.'.format(path = path))

        objekt       = Pipeline()
        stages       = [addict.Dict(stage) for stage in pipeline.read(path)]
        update       = [ ]

        fpath        = [addict.Dict(stage) for stage in stages if stage.code == 'dat.fle']
        if len(fpath) == 0:
            raise ValueError('No valid input found.')
        if len(fpath)  > 1:
            raise ValueError('More than one input file found.')
        fpath        = fpath[0]

        if any(stage.status == Pipeline.PENDING for stage in stages):
            raise ValueError('Resource pending.')

        dpath        = os.path.join(fpath.value.path, fpath.value.name)
        data         = cdata.read(dpath)
        fpath.status = Pipeline.READY
        objekt.add_stages(fpath)

        config       = addict.Dict()

        # Background Correction
        stageprpbgc  = [stage for stage in stages if stage.code.startswith('prp.bgc')]
        if len(stageprpbgc)  > 1:
            raise ValueError('More than one Background Correction method provided.')
        if len(stageprpbgc) == 0:
            stageprpbgc     = addict.Dict(
            {
                   'ID': get_rand_uuid_str(),
                 'code': 'prp.bgc',
                 'name': 'Background Correction',
                'value': 'rma',
                'label': 'Robust Multi-Array Average'
            })
        else:
            stageprpbgc     = stageprpbgc[0]
        stageprpbgc.status  = Pipeline.READY
        config.preprocess.background_correction \
        = stageprpbgc.value
        objekt.add_stages(stageprpbgc)

        # Normalization
        stageprpnrm  = [stage for stage in stages if stage.code.startswith('prp.nrm')]
        if len(stageprpnrm)  > 1:
            raise ValueError('More than one Normalization method provided.')
        if len(stageprpnrm) == 0:
            stageprpnrm     = addict.Dict({
                   'ID': get_rand_uuid_str(),
                 'code': 'prp.nrm',
                 'name': 'Normalization',
                'value': 'quantiles',
                'label': 'Quantiles'
            })
        else:
            stageprpnrm    = stageprpnrm[0]
        stageprpnrm.status = Pipeline.READY
        config.preprocess.normalization \
        = stageprpnrm.value
        objekt.add_stages(stageprpnrm)

        # Phenotype Microarray Correction
        stageprppmc  = [stage for stage in stages if stage.code.startswith('prp.pmc')]
        if len(stageprppmc)  > 1:
            raise ValueError('More than one Phenotype Microarray Correction method provided.')
        if len(stageprppmc) == 0:
            stageprppmc     = addict.Dict({
                   'ID': get_rand_uuid_str(),
                 'code': 'prp.pmc',
                 'name': 'Phenotype Microarray Correction',
                'value': 'pmonly',
                'label': 'PM Only'
            })
        else:
            stageprppmc    = stageprppmc[0]
        stageprppmc.status = Pipeline.READY
        config.preprocess.phenotype_microarray_correction \
        = stageprppmc.value
        objekt.add_stages(stageprppmc)

        # Summarization
        stageprpsum  = [stage for stage in stages if stage.code.startswith('prp.sum')]
        if len(stageprpsum)  > 1:
            raise ValueError('More than one Summarization method provided.')
        if len(stageprpsum) == 0:
            stageprpsum     = addict.Dict({
                   'ID': get_rand_uuid_str(),
                 'code': 'prp.sum',
                 'name': 'Summarization',
                'value': 'medianpolish',
                'label': 'Median Polish'
            })
        else:
            stageprpsum    = stageprpsum[0]
        stageprpsum.status = Pipeline.READY
        config.preprocess.normalization \
        = stageprpsum.value
        objekt.add_stages(stageprpsum)

        # k-Fold Cross Validation
        stageprpkcv  = [stage for stage in stages if stage.code.startswith('prp.kcv')]
        if len(stageprpkcv)  > 1:
            raise ValueError('More than one fold value provided.')
        if len(stageprpkcv) == 0:
            stageprpkcv     = addict.Dict({
                   'ID': get_rand_uuid_str(),
                 'code': 'prp.kcv',
                 'name': 'k-Fold Cross Validation',
                'value': 2,
                'label': 2
            })
        else:
            stageprpkcv    = stageprpkcv[0]
        stageprpkcv.status = Pipeline.READY
        config.preprocess.normalization \
        = int(stageprpkcv.value)
        objekt.add_stages(stageprpkcv)

        objekt.set_config(config)

        return data, objekt

    def runner(self, cdat, heap_size = 512, seed = None, save = False, verbose = False):
        self.set_status(Pipeline.RUNNING)

        para = self.config

        for i, stage in enumerate(self.stages):
            if stage.code in ('dat.fle', 'prp.bgc', 'prp.nrm', 'prp.pmc', 'prp.sum'):
                self.stages[i].status = Pipeline.RUNNING

        name = '{name}.arff'.format(name = get_rand_uuid_str())
        cdat.toARFF(name, express_config = para.Preprocess, verbose = verbose)

        for i, stage in enumerate(self.stages):
            if stage.code in ('dat.fle', 'prp.bgc', 'prp.nrm', 'prp.pmc', 'prp.sum'):
                self.stages[i].status = Pipeline.COMPLETE

        JVM.start()

        load = Loader(classname = 'weka.core.converters.ArffLoader')
        data = loader.load_file(load)
        data.class_index = cdat.iclss

        for i, stage in enumerate(self.stages):
            if stage.code == 'prp.kcv':
                self.stages[i].status = Pipeline.RUNNING

        # TODO - Check if this seed is worth it.
        seed = assign_if_none(seed, random.randint(0, 1000))
        opts = ['-S', str(seed), '-N', str(para.Preprocess.FOLDS)]
        wobj = Filter(classname = 'weka.filters.supervised.instance.StratifiedRemoveFolds', options = opts + ['-V'])
        wobj.inputformat(data)
        
        tran = wobj.filter(data)
        if save:
            savr = Saver(classname = 'weka.core.converters.ArffSaver')
            savr.save_file('{name}_train.arff'.format(name = name))

        wobj.options = opts
        test = wobj.filter(data)

        for i, stage in enumerate(self.stages):
            if stage.code == 'prp.kcv':
                self.stages[i].status = Pipeline.COMPLETE

        JVM.stop()

        self.set_status(Pipeline.COMPLETE)

    def run(self, cdat, heap_size = 512, seed = None, save = False, verbose = False):
        if not self.thread:
            self.thread = threading.Thread(target = self.runner, args = (cdat, heap_size, seed, save, verbose))
            self.thread.start()
        else:
            warnings.warn('Pipeline currently active.')
