import config     from '../config'

import DialogType from '../constant/DialogType'
import { showDialog } from '../action/DialogAction'

const Menus = [
  {
      title: 'File',
    actions: [
      {
           text: 'New',
           icon: `${config.routes.icons}/document.png`,
        tooltip: 'Create a new experiment',
        onClick: (dispatch) => {

        }
      },
      {
           text: 'Quit',
           icon: `${config.routes.icons}/quit.png`,
        tooltip: 'Quit the application',
        onClick: (dispatch) => {

        }
      }
    ]
  },
  {
      title: 'Options',
    actions: [
      {
            text: 'Settings',
            icon: `${config.routes.icons}/settings.png`,
         tooltip: 'Open Settings View',
         onClick: (dispatch) => {

         }
      }
    ]
  },
  {
      title: 'Help',
    actions: [
      {
           text: 'About',
           icon: `${config.routes.icons}/info.png`,
        tooltip: 'Show application information',
        onClick: (dispatch) => {
          const dialog =
          {
             type: DialogType.ABOUT,
            title: config.title
          }
          const action = showDialog(dialog)

          dispatch(action)
        }
      },
      {
           text: 'Documentation',
           icon: `${config.routes.icons}/documentation.png`,
        tooltip: 'View Documentation',
        onClick: () => {
          window.open(config.urls.documentation)
        }
      }
    ]
  }
]

export default Menus
