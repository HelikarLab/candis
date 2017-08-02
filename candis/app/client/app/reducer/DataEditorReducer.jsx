import React         from 'react'
import { Editors }   from 'react-data-grid-addons'
import shortid       from 'shortid'

import ActionType    from '../constant/ActionType'
import AttributeType from '../constant/AttributeType'
import FileFormat    from '../constant/FileFormat'

import { filterFiles } from '../util'

const initialState = {
     data: { },
     rows: [ ],
  columns: [
    {
          key: 'ID',
         name: 'ID'
    },
    {
          key: 'File',
         name: 'File',
         type: AttributeType.FILE,
      allowed: [FileFormat.CEL]
    },
    {
           key: 'Label',
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

    case ActionType.SELECT_ROW: {
      const selected = action.payload
      let       rows = state.rows.slice()
      const    index = selected.rowIdx

      rows[index].selected = true

      return {...state, rows: rows }
    }

    case ActionType.DESELECT_ROW: {
      const deselected = action.payload
      let         rows = state.rows.slice()
      const      index = deselected.rowIdx

      rows[index].selected = false

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
          let files     = filterFiles(resource, column.allowed)

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

    case ActionType.DataEditor.REFRESH: {
      return initialState;
    }
  }

  return state
}

export default dataEditor
