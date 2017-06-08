import React      from 'react'

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
       icon: `/assets/img/icon/database.png`,
    tooltip: 'Tools for Source Selection',
      tools: [
        {
             name: 'Create',
             icon: `/assets/img/icon/edit.png`,
          tooltip: 'Create a new dataset',
          onClick: () => {
             const action = showDialog({
                type: DialogType.CREATE,
               title: 'Create',
                size: Dialog.LARGE,
               props: {
                 classNames: {
                     root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                   footer: ['no-background', 'no-border']
                 },
                 onCreate: () => {
                   const action = hideDialog({
                     type: DialogType.CREATE
                   })

                   return action
                 },
                 onCancel: () => {
                   const action = hideDialog({
                     type: DialogType.CREATE
                   })

                   return action
                 }
               }
             })

             return action
           }
        },
        {
             name: 'Save',
             icon: `/assets/img/icon/floppy-disk.png`,
          tooltip: 'Save data to an output file'
        }
      ]
  },
  {
       name: 'Visualize',
       icon: `/assets/img/icon/pie-chart.png`,
    tooltip: 'Tools for Data Visualization',
      tools: [

      ]
  },
  {
       name: 'Preprocess',
       icon: `/assets/img/icon/gears.png`,
    tooltip: 'Tools for Data Preprocessing',
      tools: [

      ]
  },
  {
       name: 'Model',
       icon: `/assets/img/icon/network.png`,
    tooltip: 'List of Models',
      tools: [
        {
               name: 'k Nearest Neighbor'
        },
        {
               name: 'Decision Tree',
               icon: `/assets/img/icon/tree-structure.png`,
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
       icon: `/assets/img/icon/clipboard.png`,
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
               icon: `/assets/img/icon/file.png`,
            tooltip: 'Create a new experiment'
          },
          {
               text: 'Quit',
               icon: `/assets/img/icon/quit.png`,
            tooltip: 'Quit the application'
          }
        ]
      },
      {
          title: 'Help',
        actions: [
          {
               text: 'About',
               icon: `/assets/img/icon/info.png`,
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
