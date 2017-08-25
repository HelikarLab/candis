import React         from 'react'
import { Editors }   from 'react-data-grid-addons'

import shortid       from 'shortid'

import ActionType    from '../constant/ActionType'
import AttributeType from '../constant/AttributeType'
import FileFormat    from '../constant/FileFormat'

import { getFiles } from '../util'

const initial      = 
{
     data: { },
     rows: [ ],
  columns: [
    {
          key: 'File',
         name: 'File',
         type: AttributeType.FILE,
      allowed: [FileFormat.CEL]
    },
    {
           key: 'Label',
          name: 'Label',
          type: AttributeType.CLASS,
      editable: true
    }
  ]
}

const dataEditor   = (state = initial, action) => {
  switch (action.type) {
    case ActionType.DataEditor.INSERT_ROW: {
      const payload  = action.payload
      var   rows     = state.rows.slice()

      // rows.slice(payload.position, 0, payload.row)
      rows.push(payload.row)

      return {...state, rows: rows }
    }

    case ActionType.DataEditor.INSERT_COLUMN: {
      const payload  = action.payload
      var   cols     =  state.columns.slice()

      // cols.slice(payload.position, 0, payload.column)
      cols.push(payload.column)

      return {...state, columns: cols }
    }

    case ActionType.DataEditor.SELECT_ROW: {
      const payload = action.payload
      var   rows    =  state.rows.slice()

      rows[payload.index].selected = true

      return {...state, rows: rows }
    }

    case ActionType.DataEditor.DESELECT_ROW: {
      const payload = action.payload
      var   rows    =  state.rows.slice()

      rows[payload.index].selected = false

      return {...state, rows: rows }
    }

    case ActionType.DataEditor.DELETE_ROW: {
      const payload =  action.payload
      var   rows    =   state.rows.slice()
      var   index   = payload.index

      rows.splice(index, 1)

      return {...state, rows: rows }
    }

    case ActionType.DELETE_ROW: {
      const toDelete = action.payload
      let       rows =  state.rows.slice()
      const    index = toDelete.rowIdx

      rows.splice(index, 1)

      rows.forEach((row, index) => {
        row.ID       = index + 1,
        row.selected = false
      })

      return {...state, rows: rows }
    }

    case ActionType.UPDATE_ROWS: {
      let { fromRow, toRow, update } = action.payload
      let rows                       =  state.rows.slice()

      for (let i = fromRow ; i <= toRow ; ++i) {
        rows[i]  = {...rows[i], ...update }
      }

      return {...state, rows: rows }
    }

    case ActionType.Asynchronous.GET_RESOURCE_SUCCESS: {
      let resource = action.payload.data
      let columns  = state.columns.slice()

      columns.forEach((column) => {
        if ( column.type == AttributeType.FILE ) {
          let files     = getFiles(resource, column.allowed)

          let options   = files.map((file, index) => {
            return {
                 id: shortid.generate(),
              value: file.name,
              title: shortid.generate(),
              text: file.name,
            }
          })

          column.editor = <Editors.DropDownEditor options={options}/>
        }
      })

      return {...state, columns: columns }
    }
  }

  return state
}

export default dataEditor
