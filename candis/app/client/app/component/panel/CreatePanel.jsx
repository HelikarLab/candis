import React         from 'react'
import { connect }   from 'react-redux'
import classNames    from 'classnames'
import DataEditor    from '../widget/DataEditor'
import XEditable     from '../widget/XEditable'

import FileFormat    from '../../constant/FileFormat'
import { write }     from '../../action/AsynchronousAction'

class CreatePanel extends React.Component {
  constructor (props) {
    super (props)

    this.onChange     = this.onChange.bind(this)

    this.onCreate     = this.onCreate.bind(this)
    this.onCancel     = this.onCancel.bind(this)
    this.onChangeData = this.onChangeData.bind(this)

    this.state        = CreatePanel.defaultStates
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onCreate ( ) {
    const data        = this.state.data
    const filename    = this.state.filename
    let   attributes  = [ ]

    data.columns.forEach((column) => {
      if ( column.key != 'ID' ) {
        attributes.push({ name: column.name, type: column.type })
      }
    })

    const rows        = data.rows.map((row) => {
      delete row.ID

      return row
    })

    const buffer      = { attributes: attributes, data: rows }
    const dispatch    = this.props.dispatch

    const params      = { format: FileFormat.CDATA, name: filename,
      buffer: buffer }

    dispatch((dispatcher) => {
      write(dispatcher, params)
    })

    dispatch(this.props.onCreate)
  }

  onCancel ( ) {
    this.props.dispatch(this.props.onCancel)
  }

  onChangeData (data) {
    this.setState({
      data: data
    })
  }

  render ( ) {
    const that = this

    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <div className="form-group">
            <XEditable
              value={this.state.filename}
              onChange={(value) => {
                that.setState({
                  filename: value
                })
              }}/>
          </div>
          <DataEditor
            onChangeData={this.onChangeData}/>
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

CreatePanel.defaultStates =
{
  filename: "Untitled",
      data: { columns: [ ], rows: [ ] }
}

export default connect()(CreatePanel)
