import React          from 'react'
import { connect }    from 'react-redux'
import shortid        from 'shortid'
import classNames     from 'classnames'

import DialogType     from '../../constant/DialogType'
import { hideDialog } from '../../action/DialogAction'

import CreatePanel    from '../panel/CreatePanel'
import FilePanel      from '../panel/FilePanel'
import AboutPanel     from '../panel/AboutPanel'

const COMPONENTS =
{
  [DialogType.CREATE]: CreatePanel,
    [DialogType.FILE]:   FilePanel,
   [DialogType.ABOUT]:  AboutPanel,
}

class Dialog extends React.Component {
  constructor (props) {
    super (props)

    this.ID  = shortid.generate()
  }

  render ( ) {
    const dialog    = this.props.dialog
    let   modal     = null

    if ( dialog.type ) {
      const ID      = this.props.id ? this.props.id : `dialog-${this.ID}`
      if ( dialog.display ) {
          const Component = COMPONENTS[dialog.type]
          const large     = dialog.size == Dialog.LARGE
          const small     = dialog.size == Dialog.SMALL

          modal           = (
          <div className="modal" id={ID}>
            <div className={classNames("modal-dialog", {"modal-lg": large}, {"modal-sm": small})}>
              <div className="modal-content">
                <div className="modal-header">
                  <button className="close" data-dismiss="modal"
                    onClick={() => {
                      const action = hideDialog({
                        type: dialog.type
                      })

                      this.props.dispatch(action)
                    }}>
                    &times;
                  </button>
                  <div className="modal-title font-heavy">
                    {dialog.title}
                  </div>
                </div>
                <div className="modal-body">
                  <Component {...dialog.props}/>
                </div>
              </div>
            </div>
          </div>
        )

        $(`#${ID}`).modal('show')
      } else {
        $(`#${ID}`).modal('hide')
      }
    }

    return modal
  }
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog
  }
}

Dialog.LARGE = 'L'
Dialog.SMALL = 'S'

export default connect(mapStateToProps)(Dialog)
