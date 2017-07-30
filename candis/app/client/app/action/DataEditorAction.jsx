import ActionType from '../constant/ActionType'

const insertRow    = (row) => {
  const action     = {
       type: ActionType.INSERT_ROW,
    payload: row
  }

  return action
}

const insertColumn = (column) => {
  const action     = {
       type: ActionType.INSERT_COLUMN,
    payload: column
  }

  return action
}

const deleteRow    = (row) => {
  const action     = {
       type: ActionType.DELETE_ROW,
    payload: row
  }

  return action
}

const deleteColumn = (column) => {
  const action     = {
       type: ActionType.DELETE_COLUMN,
    payload: column
  }

  return action
}

const selectRow    = (selected) => {
  const action     = {
       type: ActionType.SELECT_ROW,
    payload: selected
  }

  return action
}

const deselectRow  = (deselected) => {
  const action     = {
       type: ActionType.DESELECT_ROW,
    payload: deselected
  }

  return action
}

const updateRows   = (fromRow, toRow, update) => {
  const action     = {
       type: ActionType.UPDATE_ROWS,
    payload: {
      fromRow: fromRow,
        toRow: toRow,
       update: update
    }
  }

  return action
}

const refresh = ( ) => {
  const action = {
    type: ActionType.DataEditor.REFRESH
  }

  return action
}

export { insertRow, insertColumn, selectRow, deselectRow, deleteRow,
  deleteColumn, updateRows, refresh }
