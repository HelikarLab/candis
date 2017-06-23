import config from '../config'

const Menus = [
  {
      title: 'File',
    actions: [
      {
           text: 'New',
           icon: `${config.routes.icons}/document.png`,
        tooltip: 'Create a new Experiment',
        onClick: (dispatch) => {

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
                cancel: { label: "Cancel", className: "btn-default" },
               confirm: { label: "Quit",   className: "btn-success" }
             },
                size: "small",
             animate: false,
            callback: (confirm) => {

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
