import React         from 'react'
import { Editors }   from 'react-data-grid-addons'
import shortid       from 'shortid'

import ActionType    from '../constant/ActionType'
import AttributeType from '../constant/AttributeType'

const initialState = {
     data: { },
     rows: [ ],
  columns: [
    {
          key: 'ID',
         name: 'ID'
    },
    {
          key: 'file',
         name: 'File',
         type: AttributeType.FILE
    },
    {
           key: 'label',
          name: 'Label',
      editable: true
    }
  ]
}

const dataEditor   = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INSERT_ROW: {
      let rows     = action.payload.slice()
      let columns  = state.columns
      let row      = { }

      columns.forEach((column) => {
        let key    = column.key
        row[key]   = key == 'ID' ? rows.length + 1 : ''
      })

      rows.push(row)

      return {...state, rows: rows }
    }

    case ActionType.INSERT_COLUMN: {
      let columns  = action.payload.slice()
      let column   = { key: shortid.generate(), name: '', editable: true }

      columns.push(column)

      return {...state, columns: columns }
    }

    case ActionType.UPDATE_ROWS: {
      let { fromRow, toRow, update } = action.payload
      let rows                       =  state.rows.slice()

      for (let i = fromRow ; i <= toRow ; ++i) {
        rows[i]  = {...rows[i], ...update }
      }

      return {...state, rows: rows }
    }

    case ActionType.REFRESH_RESOURCE_SUCCESS: {
      let options = action.payload.data.map((data) => {
        return data.name
      })

      let editor  = <Editors.DropDownEditor options={options}/>
      let columns = state.columns.slice()

      columns.forEach((column) => {
        if ( column.type == AttributeType.FILE ) {
            column.editor = editor
        }
      })

      return {...state, columns: columns }
    }
  }

  return state
}

export default dataEditor
