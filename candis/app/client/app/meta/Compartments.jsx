import axios         from 'axios'

import config        from '../config'
import { pushStage } from '../action/DocumentProcessorAction'

import { showDialog, hideDialog } from '../action/DialogAction'
import Dialog     from '../component/widget/Dialog'
import DialogType from '../constant/DialogType'

const Compartments = [
  {
       name: 'Data',
       icon: `${config.routes.icons}/database.png`,
    tooltip: 'Tools for Source Selection',
      tools: [
        {
             name: 'Create',
             icon: `${config.routes.icons}/edit.png`,
          tooltip: 'Create a new DataSet',
          onClick: (dispatch) => {
            const action = pushStage({
                   name: 'Create',
                onClick: (dispatch) => {
                  // dialog action
                }
            })

            dispatch(action)
          }
        },
        {
             name: 'File',
             icon: `${config.routes.icons}/document.png`,
          tooltip: 'Load a CDATA/CSV file',
          onClick: (dispatch) => {
            
          }
        },
        {
             name: 'Download',
             icon: `${config.routes.icons}/cloud-computing.png`,
          tooltip: 'Download a DataSet from a remote host',
          onClick: (dispatch) => {
            
          }
        }
      ]
  },
  {
       name: 'Visualize',
       icon: `${config.routes.icons}/pie-chart.png`,
    tooltip: 'Tools for Data Visualization'
  },
  {
       name: 'Preprocess',
       icon: `${config.routes.icons}/gears.png`,
    tooltip: 'Tools for Data Preprocessing',
      tools: [
        {
             name: 'k-Fold Cross-Validation',
          tooltip: 'Split a dataset into k folds',
          onClick: (dispatch) => {
            
          }
        }
      ]
  },
  {
       name: 'Feature Selection',
       icon: `${config.routes.icons}/column-select.png`,
    tooltip: 'List of Feature Selection Methods',
    fetcher: () => {
      return axios.get(config.routes.api.featselect.methods).then((response) => {
        response        = response.data

        if ( response.status == "success" ) {
          const data    = response.data
          const tools   = data.map((method) => {
            const tool  = {
                     name: method.name,
              description: method.info.desc.short,
                  onClick: (dispatch) => {
                    
                  }
            }

            return tool
          })

          return tools
        } else {
          return [ ]
        }
      })
    }
  },
  {
       name: 'Model',
       icon: `${config.routes.icons}/network.png`,
    tooltip: 'List of Models',
    fetcher: () => {
      return axios.get(config.routes.api.model.methods).then((response) => {
        response        = response.data

        if ( response.status == "success" ) {
          const data    = response.data
          const tools   = data.map((method) => {
            const tool  = {
                 name: method.name,
                 icon: method.icon,
              tooltip: method.type,
              onClick: (dispatch) => {
                
              }
            }

            return tool
          })

          return tools
        } else {
          return [ ]
        }
      })
    }
  },
  {
       name: 'Evaluate',
       icon: `${config.routes.icons}/clipboard.png`,
    tooltip: 'Tools for Model Evaluation',
      tools: [
        {
             name: 'Predict',
          tooltip: 'Perform a prediction'
        }
      ]
  }
]

export default Compartments
