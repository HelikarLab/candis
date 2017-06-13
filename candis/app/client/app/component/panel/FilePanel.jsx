import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

import { refreshResource } from '../../action/AsynchronousAction'

class FilePanel extends React.Component {
  constructor (props) {
    super (props)

    this.onSelect = this.onSelect.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSelect ( ) {
    const value   = $(this.refs.selectpicker).selectpicker('val')

    this.props.dispatch(this.props.onSelect)
  }

  onCancel ( ) {
    this.props.dispatch(this.props.onCancel)
  }

  componentWillMount ( ) {
    this.props.dispatch(refreshResource)
  }

  componentDidMount ( ) {
    $(this.refs.selectpicker).selectpicker('render')
  }

  render ( ) {
    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <select className="selectpicker" ref="selectpicker" data-width="100%">
            {
              this.props.files.map((file, index) => {
                return (
                  <option key={index} value={file.id}>
                    {file.name}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className={classNames("panel-footer", this.props.classNames.footer)}>
          <div className="text-right">
            <div className="btn-group">
              <button className="btn btn-primary" onClick={this.onSelect}>
                <div className="text-uppercase font-bold">
                  Select
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

const mapStateToProps = (state) => {
  const filePanel     = state.filePanel

  return {
    files: filePanel.files
  }
}

export default connect(mapStateToProps)(FilePanel)
