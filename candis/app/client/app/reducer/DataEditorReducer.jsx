import shortid    from 'shortid'
import ActionType from '../constant/ActionType'

const initialState = {
     rows: [ ],
  columns: [
    {
            ID: shortid.generate(),
           key: 'id',
          name: 'ID'
    },
    {
            ID: shortid.generate(),
           key: 'file',
          name: 'File'
    },
    {
            ID: shortid.generate(),
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
        row[key]   = key == 'id' ? rows.length + 1 : ''
      })

      rows.push(row)

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
  }

  return state
}

export default dataEditor
