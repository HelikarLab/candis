import React         from 'react'
import PropTypes     from 'prop-types'
import { connect }   from 'react-redux'
import classNames    from 'classnames'

import DataEditor    from '../widget/DataEditor'
import XEditable     from '../widget/XEditable'

class FileEditor extends React.Component {
  constructor (props) {
    super (props)

    this.state        = FileEditor.defaultStates
  }

  onChangeData (data) {
    const props = this.props
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

    this.setState({
      data: data
    })

    props.onChange.data(buffer)
  }

  render ( ) {
    const props = this.props

    return (
      <div className={classNames("panel panel-default", props.classNames.root)}>
        <div className="panel-body">
          <div className="form-group">
            <label>Name</label>
            <div>
              <XEditable
                   value={this.state.name}
                   empty="Untitled"
                onChange={(value) => {
                  this.setState({ name: value })

                  props.onChange.name(value)
                }}/>
            </div>
          </div>
          <DataEditor
            onChangeData={this.onChangeData.bind(this)}/>
        </div>
      </div>
    )
  }
}

FileEditor.propTypes     =
{
  classNames: PropTypes.object
}
FileEditor.defaultProps  =
{
  classNames: { }
}

FileEditor.defaultStates =
{
  name: "",
  data: { columns: [ ], rows: [ ] }
}

export default connect()(FileEditor)
