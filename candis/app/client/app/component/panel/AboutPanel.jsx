import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

import config      from '../../Config'

class AboutPanel extends React.Component {
  constructor (props) {
    super (props)

    this.onClose = this.onClose.bind(this)
  }

  onClose ( ) {
    this.props.dispatch(this.props.onClose)
  }

  render ( ) {
    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <img className="img-responsive center-block" src={`${config.routes.images}/logo.png`}
            style={{
              maxHeight: 256
            }}/>
        </div>
        <div className={classNames("panel-footer", this.props.classNames.footer)}>
          <div className="text-right">
            <button className={classNames("btn btn-default", this.props.classNames.button)}
              onClick={this.onClose}>
              <div className="text-uppercase font-bold">
                Close
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AboutPanel)
