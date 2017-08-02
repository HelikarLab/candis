# importsm - standard imports
import os

# imports - third-party imports
import addict
import pandas as pd, arff
from rpy2.robjects.packages import importr
from rpy2                   import robjects

# imports - module imports
from candis.config import CONFIG
from candis.util   import assign_if_none

class CData(object):
    CONFIG = CONFIG.Pipeline.Preprocess

    def load(path, delimiter = ','):
        # NOTE - Let pandas check for file exists.
        data         = pd.read_csv(path, sep = delimiter)

        abspath      = os.path.abspath(path)
        head, tail   = os.path.split(abspath)

        columns      = list(data.columns)
        cclass       = [col for col in columns if '!class' in col]

        if len(cclass) == 0:
            raise ValueError('No class attribute found.')
        if len(cclass) != 1:
            raise ValueError('Various class attributes found.')

        cclass       = cclass[0]

        # NOTE - Lets normalize paths.
        for column in columns:
            if any(tag in column for tag in ('!file', '!cel')):
                paths = data[column]

                for i, p in enumerate(paths):
                    path     = paths[i]

                    if not os.path.isabs(p):
                        path = os.path.normpath(os.path.join(head, p))

                    if not os.path.exists(path) and not os.path.isfile(path):
                        raise ValueError('{path} is not a valid file.'.format(path = path))

                    paths[i] = path


        cdat         = CData()
        cdat.data    = data
        cdat.clss    = cdat.data[cclass]
        cdat.iclss   = columns.index(cclass)

        print(cdat.iclss)

        return cdat

    def toARFF(self, path, express_config = { }, verbose = False):
        # NOTE - This is assuming a single !cel input vector only.
        for column in self.data.columns:
            if any(tag in column for tag in ('!cel')):
                paths = list(self.data[column])

                break

        if not paths:
            raise ValueError('No valid DNA microarray found.')
        else:
            head, tail = os.path.split(path)

            importr('affy')

            robj = robjects.r('read.affybatch')
            cels = robj(*paths)

            para = CData.CONFIG
            para.update(express_config)

            robj = robjects.r('expresso')
            eset = robj(cels,
              normalize_method = para.NORMALIZATION,
              bgcorrect_method = para.BACKGROUND_CORRECTION,
              pmcorrect_method = para.PHENOTYPE_MICROARRAY_CORRECTION,
                summary_method = para.SUMMARY,
                       verbose = verbose
            )

            name = os.path.join(head, '.tmp_eset')
            robj = robjects.r('write.exprs')
            robj(eset, file = name)
              
            eset = pd.read_csv(name, sep = '\t')
            AIDs = eset.ix[:, 0] # Affymetrix IDs
            vals = eset.ix[:,1:].T.assign(label = self.clss.values)

            uniq = list(self.clss.unique())

            meta = addict.Dict()
            meta.relation   = 'affy'
            meta.attributes = [(ID, 'NUMERIC') for ID in AIDs] + [('CLASS', uniq)]
            meta.data       = list(vals.values)

            with open(path, mode = 'w') as f:
                arff.dump(meta, f)

            os.remove(name)

    def __repr__(self):
        string = self.data.to_string()

        return string