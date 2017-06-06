import React       from 'react'
import { connect } from 'react-redux'
import shortid     from 'shortid'
import classNames  from 'classnames'

import DialogType  from '../../constant/DialogType'

import FilePanel   from '../panel/FilePanel'
import AboutPanel  from '../panel/AboutPanel'

const COMPONENTS =
{
    [DialogType.FILE]: FilePanel,
   [DialogType.ABOUT]: AboutPanel
}

class Dialog extends React.Component {
  constructor (props) {
    super (props)

    this.ID  = shortid.generate()
  }

  render ( ) {
    const dialog    = this.props.dialog

    if ( dialog.type ) {
      const ID        = this.props.id ? this.props.id : `dialog-${this.ID}`
      const Component = COMPONENTS[dialog.type]
      const large     = dialog.size == Dialog.LARGE

      if ( dialog.display ) {
        $(`#${ID}`).modal('show')
      }

      return (
        <div className="modal" id={ID}>
          <div className={classNames("modal-dialog", large: "modal-lg")}>
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
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog
  }
}

Dialog.LARGE = 'L'

export default connect(mapStateToProps)(Dialog)
