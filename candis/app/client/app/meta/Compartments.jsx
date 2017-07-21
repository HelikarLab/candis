import axios       from 'axios'

import config      from '../config'
import { setNode } from '../action/DocumentProcessorAction'

// RAW
import DialogType  from '../constant/DialogType'
import Dialog      from '../component/widget/Dialog'
import { showDialog, hideDialog } from '../action/DialogAction'
// end raw

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
            const node = 
            {
                 code: 'dat.crt',
                label: 'Create',
              onClick: (dispatch) =>
              {
                // RAW
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
                // end raw

                dispatch(action)
              }
            }

            const action = setNode(node)

            dispatch(action)
          }
        },
        {
             name: 'File',
             icon: `${config.routes.icons}/document.png`,
          tooltip: 'Load a CDATA/CSV file',
          onClick: (dispatch) => {
            const node   = 
            {
                 code: 'dat.fle',
                label: 'File',
              onClick: (dispatch) =>
              {
                // RAW
                const action = showDialog({
                    type: DialogType.FILE,
                   title: 'File',
                    size: Dialog.LARGE,
                   props: {
                     classNames: {
                         root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                       footer: ['no-background', 'no-border']
                     },
                     onSelect: (dispatch) => {
                       var action = null

                       action     = hideDialog({
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
                 // end
              }
            }

            const action = setNode(node)

            dispatch(action)
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
      ],
    fetcher: () => {
      return axios.get(config.routes.api.preprocess.methods).then((response) => {
        response       = response.data

        if ( response.status == "success" ) {
          const data   = response.data

          const tools  = data.map((method) => {
            const options = method.methods.map((option) => {
              return { name: option.name, description: option.info.desc }
            })

            const tool = {
                 name: method.name,
              onClick: (dispatch) => {
                  const node   = {
                       code: method.code,
                      label: method.name,
                    onClick: (dispatch) => {
                       const action = showDialog({
                          type: DialogType.SELECT,
                         title: method.name,
                         props: {
                           classNames: {
                               root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                             footer: ['no-background', 'no-border']
                           },
                            options: options,
                           onSelect: (dispatch) => {
                             let action = null

                             action     = hideDialog({
                               type: DialogType.SELECT
                             })

                             dispatch(action)
                           },
                           onCancel: (dispatch) => {
                             const action = hideDialog({
                               type: DialogType.SELECT
                             })

                             dispatch(action)
                           }
                         }
                       })

                       dispatch(action)
                    }
                  }

                  const action = setNode(node)

                  dispatch(action)
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
       name: 'Feature Selection',
       icon: `${config.routes.icons}/column-select.png`,
    tooltip: 'List of Feature Selection Methods',
    fetcher: () =>
    {
      return axios.get(config.routes.api.featselect.methods).then((response) => {
        response       = response.data
        var tools      = [ ]

        if ( response.status == "success" ) 
        {
          const data   = response.data
          tools        = data.map((method) => 
          {
            const desc = method.desc
            const tool = 
            {
                     name: method.name,
                     icon: method.icon,
              description: desc.short,
                  onClick: (dispatch) => 
                  {
                    const node        = 
                    {
                         code: method.code,
                        label: method.name,
                      onClick: (dispatch) => 
                      {
                        const title    = 
                        `
                        <div class="font-bold">
                          ${method.name}
                        </div>
                        `
                        ,     detail   = desc.long || desc.short || method.type
                        ,     message  = 
                        ` 
                        <div class="text-justify">
                          ${detail.replace(/\n/g, '<br/>')}
                        </div>
                        `
                        ,     dialog   = bootbox.dialog({
                            title: title,
                          message: message,
                          buttons: { ok: { label: "Ok"} }
                        })

                         dialog.init(() => {
                          setTimeout(() => {
                            var $element = dialog.find('.bootbox-body');

                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                          }, 1000)
                        })
                      }
                    }
                    const action       = setNode(node)

                    dispatch(action)
                  }
            }

            return tool
          })
        }

        return tools
      })
    }
  },
  {
       name: 'Model',
       icon: `${config.routes.icons}/network.png`,
    tooltip: 'List of Models',
    fetcher: () => 
    {
      return axios.get(config.routes.api.model.methods).then((response) => {
        response       = response.data
        var tools      = [ ]

        if ( response.status == "success" ) 
        {
          const data   = response.data
          tools        = data.map((method) => 
          {
            const desc = method.desc
            const tool = 
            {
                     name: method.name,
                     icon: method.icon,
                  tooltip: method.type,
              description: desc.short || method.type,
                  onClick: (dispatch) => 
                  {
                    const node        = 
                    {
                         code: method.code,
                        label: method.name,
                      onClick: (dispatch) => 
                      {
                        const title    = 
                        `
                        <div class="font-bold">
                          ${method.name}
                        </div>
                        `
                        ,     detail   = desc.long || desc.short || method.type
                        ,     message  = 
                        ` 
                        <div class="text-justify">
                          ${detail.replace(/\n/g, '<br/>')}
                        </div>
                        `
                        ,     dialog   = bootbox.dialog({title:title, message:message,
                          buttons: { ok: { label: "Ok"} } })

                         dialog.init(() => {
                          setTimeout(() => {
                            var $element = dialog.find('.bootbox-body');

                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                          }, 1000)
                        })
                      }
                    }
                    const action       = setNode(node)

                    dispatch(action)
                  }
            }

            return tool
          })
        }

        return tools
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
