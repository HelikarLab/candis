import React      from 'react'

import config     from '../Config'

import MenuBar    from '../component/MenuBar'
import ToolBox    from '../component/widget/toolbox/ToolBox'
import Canvas     from '../component/widget/Canvas'
import Dialog     from '../component/dialog/Dialog'
import CreatePanel from '../component/panel/CreatePanel'

import DialogType from '../constant/DialogType'
import { showDialog, hideDialog } from '../action/DialogAction'

const compartments = [
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
        },
        {
             name: 'Save',
             icon: `${config.routes.icons}/floppy-disk.png`,
          tooltip: 'Save data to an output file'
        }
      ]
  },
  {
       name: 'Visualize',
       icon: `${config.routes.icons}/pie-chart.png`,
    tooltip: 'Tools for Data Visualization',
      tools: [

      ]
  },
  {
       name: 'Preprocess',
       icon: `${config.routes.icons}/gears.png`,
    tooltip: 'Tools for Data Preprocessing',
      tools: [

      ]
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

class App extends React.Component {
  constructor (props) {
    super (props)

    this.menus = [
      {
          title: 'File',
        actions: [
          {
               text: 'New',
               icon: `${config.routes.icons}/file.png`,
            tooltip: 'Create a new experiment'
          },
          {
               text: 'Quit',
               icon: `${config.routes.icons}/quit.png`,
            tooltip: 'Quit the application'
          }
        ]
      },
      {
          title: 'Help',
        actions: [
          {
               text: 'About',
               icon: `${config.routes.icons}/info.png`,
            tooltip: 'Shows application information'
          }
        ]
      }
    ]
  }

  render ( ) {
    return (
      <div>
        <MenuBar
          menus={this.menus}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ToolBox title="Tool Box" compartments={compartments}/>
            </div>
            <div className="col-md-9">
              <Canvas/>
            </div>
          </div>
        </div>
        <Dialog/>
      </div>
    )
  }
}

export default App
