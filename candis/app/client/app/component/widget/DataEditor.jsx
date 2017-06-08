import React         from 'react'
import { connect }   from 'react-redux'
import ReactDataGrid from 'react-data-grid'

import { insertRow, updateRows } from '../../action/DataEditorAction'

class DataEditor extends React.Component {
  constructor (props) {
    super (props)

    const that = this
    this.tools =
    [
      {
           icon: `/assets/img/icon/insert-row.png`,
        tooltip: 'Insert Row',
        onClick: () => {
          const action = insertRow(that.props.rows)

          return action
        }
      },
      {
           icon: `/assets/img/icon/insert-column.png`,
        tooltip: 'Insert Column',
        onClick: () => {

        }
      },
      {
           icon: `/assets/img/icon/reload.png`,
        tooltip: 'Refresh',
        onClick: () => {

        }
      }
    ]
  }

  render ( ) {
    const that = this
    return (
      <div className="wrapper">
        <div className="panel panel-default no-background no-border no-shadow">
          <div className="panel-body">
            <div className="text-center">
              {
                this.tools.map((tool, index) => {
                  const tooltip = tool.tooltip
                  const ttattrs = tooltip ?
                    {
                         "data-toggle": "tooltip",
                      "data-placement": "top",
                                 title: tooltip
                    } : { }

                  return (
                    <button key={index} className="btn no-background no-border no-shadow"
                      {...ttattrs} onClick={() => { that.props.dispatch(tool.onClick()) }}>
                      <img width="20" src={tool.icon}/>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>
        <ReactDataGrid
           enableCellSelect={true}
                    columns={this.props.columns}
                  rowGetter={(index) => { return that.props.rows[index] }}
                  rowsCount={this.props.rows.length}
            enableRowSelect={true}
          onGridRowsUpdated={({ fromRow, toRow, updated }) => {
            that.props.dispatch(updateRows(fromRow, toRow, updated))
          }}/>
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
