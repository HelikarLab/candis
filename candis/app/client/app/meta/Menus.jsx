import config     from '../config'

import FileFormat from '../constant/FileFormat'
import { exit }   from '../action/AppAction'
import { write }  from '../action/AsynchronousAction'

const Menus = [
  {
      title: 'File',
    actions: [
      {
           text: 'New',
           icon: `${config.routes.icons}/document.png`,
        tooltip: 'Create a new Pipeline',
        onClick: (dispatch) => {
          bootbox.prompt({
                title: '<span class="font-bold">Pipeline Name</span>',
            inputType: 'text',
              buttons:
              {
                 cancel: { label: "Cancel", className: "btn-sm btn-primary" },
                confirm: { label: "Create", className: "btn-sm btn-success" }
              },
                 size: "small",
              animate: false,
             callback: (name) => {
               if ( name !== null ) {
                 const output = { name: `${name}.cpipe`, format: FileFormat.PIPELINE }
                 const action = write(output)

                 dispatch(action)
               }
             }
          })
        }
      },
      {
           text: 'Open',
           icon: `${config.routes.icons}/envelope-open.png`,
        tooltip: 'Open an existing Pipeline',
        onClick: (dispatch) => {
          // TODO: create "Open" dialog and display.
        }
      },
      {
           text: 'Quit',
           icon: `${config.routes.icons}/quit.png`,
        tooltip: 'Quit the application',
        onClick: (dispatch) => {
          bootbox.confirm({
             message: "Are you sure you want to quit?",
             buttons:
             {
                cancel: { label: "Cancel", className: "btn-sm btn-primary" },
               confirm: { label: "Quit",   className: "btn-sm btn-success" }
             },
                size: "small",
             animate: false,
            callback: (confirm) => {
              if ( confirm ) {
                const action = exit()

                dispatch(action)
              }
            }
          })
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
           // TODO: create "Settings" dialog and display.
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
          const title   =
          `
            <span class="font-bold">
              ${config.title}
            </span>
          `
          const message =
          `
            <div class="wrapper">
              <img class="img-responsive center-block" src="${config.routes.images}/logo-title.png"
                style="max-height: 256px">
            </div>
          `

          bootbox.alert({
              title: title,
            message: message,
            buttons:
            {
              ok: { label: "Ok", className: "btn-sm btn-primary" }
            },
            animate: false
          })
        }
      },
      {
           text: 'Documentation',
           icon: `${config.routes.icons}/documentation.png`,
        tooltip: 'View Documentation',
        onClick: () => {
          window.open(config.urls.docs)
        }
      }
    ]
  }
]

export default Menus
