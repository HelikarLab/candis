import React          from 'react'
import { connect }    from 'react-redux'
import ReactDataGrid  from 'react-data-grid'

import config         from '../../config'

import ToolBar        from './ToolBar'

import { insertRow, insertColumn, deleteRow, deleteColumn, selectRow, deselectRow,
  updateRows } from '../../action/DataEditorAction'
import { getResource } from '../../action/AsynchronousAction'

class DataEditor extends React.Component {
  constructor (props) {
    super (props)

    this.tools =
    [
      {
           icon: `${config.routes.icons}/insert-row.png`,
        tooltip: 'Insert Row',
        onClick: (props, dispatch) => {
          const action = insertRow(props.rows)

          dispatch(action)
        }
      },
      {
           icon: `${config.routes.icons}/insert-column.png`,
        tooltip: 'Insert Column',
        onClick: (props, dispatch) => {
          const action = insertColumn(props.columns)

          dispatch(action)
        }
      },
      {
           icon: `${config.routes.icons}/delete-row.png`,
        tooltip: 'Delete Row',
        onClick: (props, dispatch) => {
          props.rows.forEach((row) => {
            if ( row.selected ) {
              const action = deleteRow(row)

              dispatch(action)
            }
          })
        }
      },
      {
           icon: `${config.routes.icons}/delete-column.png`,
        tooltip: 'Delete Column',
        onClick: (dispatch) => {

        }
      },
      {
           icon: `${config.routes.icons}/reload.png`,
        tooltip: 'Refresh',
        onClick: (dispatch) => {

        }
      }
    ]
  }

  componentWillMount() {
    
    const props  = this.props
    const action = getResource()

    props.dispatch(action)
  }

  render ( ) {
    const props  = this.props

    return (
      <div>
        <div className="panel panel-default no-background no-border no-shadow">
          <div className="panel-body">
            <div className="text-right">
              <ToolBar tools={this.tools} onClick={(tool) => {
                tool.onClick(props, props.dispatch)
              }}/>
            </div>
          </div>
        </div>
        <div>
          <ReactDataGrid
                          ref="grid"
             enableCellSelect={true}
                      columns={props.columns}
                    rowGetter={(index) => { return props.rows[index] }}
                    rowsCount={props.rows.length}
                 rowSelection={{
                        showCheckbox: true,
                   enableShiftSelect: true,
                      onRowsSelected: (rows) => {
                        rows.forEach((row) => {
                          const action = selectRow(row)

                          props.dispatch(action)
                        })
                      },
                    onRowsDeselected: (rows) => {
                        rows.forEach((row) => {
                          const action = deselectRow(row)

                          props.dispatch(action)
                        })
                    },
                            selectBy: { isSelectedKey: 'selected' }
                 }}
            onGridRowsUpdated={({ fromRow, toRow, updated }) => {
              props.dispatch((dispatch) => {
                const action  = updateRows(fromRow, toRow, updated)

                dispatch(action)

                props.onChangeData({
                  columns: props.columns,
                     rows: props.rows
                })
              })
            }}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const dataEditor    = state.dataEditor

  return {
       rows: dataEditor.rows,
    columns: dataEditor.columns
  }
}

export default connect(mapStateToProps)(DataEditor)
