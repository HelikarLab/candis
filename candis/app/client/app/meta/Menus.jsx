import config     from '../Config'

import Dialog     from '../component/dialog/Dialog'

import DialogType from '../constant/DialogType'
import { showDialog, hideDialog } from '../action/DialogAction'
import { refreshResource } from '../action/AsynchronousAction'

const Menus = [
  {
      title: 'File',
    actions: [
      {
           text: 'New',
           icon: `${config.routes.icons}/file.png`,
        tooltip: 'Create a new experiment',
        onClick: (dispatch) => {

        }
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
        tooltip: 'Shows application information',
        onClick: (dispatch) => {
          const action = showDialog({
             type: DialogType.ABOUT,
            title: `${config.title}`,
            props: {
              classNames: {
                  root: ['no-background', 'no-border', 'no-shadow', 'no-margin'],
                footer: ['no-background', 'no-border']
              },
                 onClose: (dispatch) => {
                   const action = hideDialog({
                     type: DialogType.ABOUT
                   })

                   dispatch(action)
                 }
            }
          })

          dispatch(action)
        }
      }
    ]
  }
]

export default Menus
