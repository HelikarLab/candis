import React          from 'react'
import PropTypes      from 'prop-types'
import { connect }    from 'react-redux'
import shortid        from 'shortid'
import classNames     from 'classnames'

import DialogType     from '../../constant/DialogType'
import { hideDialog } from '../../action/DialogAction'

import CreatePanel    from '../panel/CreatePanel'
import FilePanel      from '../panel/FilePanel'
import SelectPanel    from '../panel/SelectPanel'

const COMPONENTS =
{
  [DialogType.CREATE]: CreatePanel,
    [DialogType.FILE]: FilePanel,
  [DialogType.SELECT]: SelectPanel
}

class Dialog extends React.Component {
  constructor (props) {
    super (props)
  }

  render ( ) {
    const dialog    = this.props.dialog
    let   modal     = null

    if ( dialog ) {
      if ( dialog.type ) {
        if ( dialog.display ) {
            console.log(dialog.type)
            const Component = COMPONENTS[dialog.type]
            const large     = dialog.size == Dialog.LARGE
            const small     = dialog.size == Dialog.SMALL

            modal           = (
            <div className="modal" id={this.props.ID}>
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

          $(`#${this.props.ID}`).modal('show')
        } else {
          $(`#${this.props.ID}`).modal('hide')
        }
      }
    }

    return modal
  }
}

Dialog.LARGE = 'DIALOG_LARGE'
Dialog.SMALL = 'DIALOG_SMALL'

Dialog.propTypes      =
{
      ID: PropTypes.string
}
Dialog.defaultProps   =
{
      ID: shortid.generate()
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog
  }
}

export default connect(mapStateToProps)(Dialog)
