import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'
import DataEditor  from '../widget/DataEditor'

class CreatePanel extends React.Component {
  constructor (props) {
    super (props)

    this.onCreate = this.onCreate.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCreate ( ) {
    this.props.dispatch(this.props.onCreate())
  }

  onCancel ( ) {
    this.props.dispatch(this.props.onCancel())
  }

  render ( ) {
    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <DataEditor/>
        </div>
        <div className={classNames("panel-footer", this.props.classNames.footer)}>
          <div className="text-right">
            <div className="btn-group">
              <button className="btn btn-primary" onClick={this.onCreate}>
                <div className="text-uppercase font-bold">
                  Create
                </div>
              </button>
              <button className="btn btn-default" onClick={this.onCancel}>
                <div className="text-uppercase font-bold">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(CreatePanel)
