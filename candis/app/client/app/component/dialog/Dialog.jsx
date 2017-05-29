import React   from 'react'
import shortid from 'shortid'

class Dialog extends React.Component {
  constructor (props) {
    super (props)

    this.ID  = shortid.generate()
  }

  render ( ) {
    const ID = this.props.id ? this.props.id : `dialog-${this.ID}`

    return (
      <div className="modal" id={ID}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" data-dismiss="modal">
                &times;
              </button>
              <div className="modal-title font-heavy">
                {this.props.title}
              </div>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog
