import React           from 'react'
import Select          from 'react-select'
import ReactDataGrid   from 'react-data-grid'
import { connect }     from 'react-redux'
import classNames      from 'classnames'

import axios           from 'axios'

import config          from '../../config'
import FileFormat      from '../../constant/FileFormat'
import { filterFiles } from '../../util'
import { getResource } from '../../action/AsynchronousAction'

class FileViewer extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)

    this.state    = FileViewer.defaultStates
  }

  onChange (value) {
    this.setState({
      select: value
    })

    const parameters = JSON.parse(value.value)
    const that       = this

    axios.post(config.routes.api.data.read, parameters)
         .then((response) => {
           response = response.data

           if ( response.status == "success" ) {
             const dataset = response.data

             const columns = dataset.attributes.map((attribute, index) => {
               return {...attribute, key: attribute.name}
             })
             const rows    = dataset.data

             that.setState({
               data: { columns: columns, rows: rows }
             })
           }
         })

    this.props.onSelect(parameters)
  }

  render ( ) {
    const that = this

    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <div className="form-group">
            <Select
                options={this.props.files}
                   name="select"
                  value={this.state.select}
               onChange={this.onChange}
              clearable={false}/>
          </div>
          <div>
            <ReactDataGrid
                      ref="grid"
                  columns={this.state.data.columns}
                rowGetter={(index) => {
                  return that.state.data.rows[index]
                }}
                rowsCount={this.state.data.rows.length}/>
          </div>
        </div>
      </div>
    )
  }
}

FileViewer.defaultStates =
{
  select: { },
    data: { columns: [ ], rows: [ ] }
}

const mapStateToProps   = (state) => {
  const data            = state.data
  const files           = filterFiles(data.resource, [FileFormat.CDATA])

  const options         = files.map((file) => {
    return {
      value: `{"path": "${file.path}", "name": "${file.name}"}`,
      label: file.name
    }
  })

  return {
    files: options
  }
}

export default connect(mapStateToProps)(FileViewer)
