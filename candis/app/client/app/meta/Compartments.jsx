import axios      from 'axios'

import config     from '../config'

import Dialog     from '../component/dialog/Dialog'

import DialogType from '../constant/DialogType'
import { showDialog, hideDialog } from '../action/DialogAction'
import { getResource } from '../action/AsynchronousAction'

const Compartments = [
  {
       name: 'Data',
       icon: `${config.routes.icons}/database.png`,
    tooltip: 'Tools for Source Selection',
      tools: [
        {
             name: 'Create',
             icon: `${config.routes.icons}/edit.png`,
          tooltip: 'Create a new dataset',
          onClick: (dispatch) => {
             const action = showDialog({
                type: DialogType.CREATE,
               title: 'Create',
                size: Dialog.LARGE,
               props: {
                 classNames: {
                     root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                   footer: ['no-background', 'no-border']
                 },
                 onCreate: (dispatch) => {
                   let action = null

                   action     = hideDialog({
                     type: DialogType.CREATE
                   })

                   dispatch(action)
                 },
                 onCancel: (dispatch) => {
                   const action = hideDialog({
                     type: DialogType.CREATE
                   })

                   dispatch(action)
                 }
               }
             })

             dispatch(action)
           }
        },
        {
             name: 'File',
             icon: `${config.routes.icons}/document.png`,
          tooltip: 'Load a CSV file',
          onClick: (dispatch) => {
            const action = showDialog({
               type: DialogType.FILE,
               size: Dialog.LARGE,
              title: 'File',
              props: {
                classNames: {
                    root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                  footer: ['no-background', 'no-border']
                },
                onSelect: (dispatch) => {
                  let action   = null

                  action       = hideDialog({
                    type: DialogType.FILE
                  })

                  dispatch(action)
                },
                onCancel: (dispatch) => {
                  const action = hideDialog({
                    type: DialogType.FILE
                  })

                  dispatch(action)
                }
              }
            })

            dispatch(action)
          }
        }
      ]
  },
  {
       name: 'Preprocess',
       icon: `${config.routes.icons}/gears.png`,
    tooltip: 'Tools for Data Preprocessing',
      tools: [ ],
    fetcher: () => {
      return axios.get(config.routes.preprocess.methods).then((response) => {
        response       = response.data

        if ( response.status == "success" ) {
          const data   = response.data

          const tools  = data.map((method) => {
            const tool = {
                 name: method.name,
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
      tools: [
        {
               name: 'k Nearest Neighbor'
        },
        {
               name: 'Decision Tree',
               icon: `${config.routes.icons}/tree-structure.png`,
            tooltip: 'Classifier, Regressor'
        },
        {
               name: 'Naive Bayes'
        },
        {
               name: 'Random Forest'
        },
        {
               name: 'Support Vector Machine',
            tooltip: 'Classifier, Regressor'
        },
      ]
  },
  {
       name: 'Evaluate',
       icon: `${config.routes.icons}/clipboard.png`,
    tooltip: 'Tools for Model Evaluation',
      tools: [
        {
          name: 'Predict'
        }
      ]
  }
]

export default Compartments
