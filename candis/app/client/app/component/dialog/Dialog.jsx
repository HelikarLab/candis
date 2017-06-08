import React       from 'react'
import { connect } from 'react-redux'
import shortid     from 'shortid'
import classNames  from 'classnames'

import DialogType  from '../../constant/DialogType'
import CreatePanel from '../panel/CreatePanel'

const COMPONENTS =
{
  [DialogType.CREATE]: CreatePanel
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

          modal           = (
          <div className="modal" id={ID}>
            <div className={classNames("modal-dialog", "modal-lg": large)}>
              <div className="modal-content">
                <div className="modal-header">
                  <button className="close" data-dismiss="modal">
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

export default connect(mapStateToProps)(Dialog)
