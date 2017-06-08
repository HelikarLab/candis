import ActionType from '../constant/ActionType'

const insertRow  = (row) => {
  const action   = {
       type: ActionType.INSERT_ROW,
    payload: row
  }

  return action
}

const updateRows = (fromRow, toRow, update) => {
  const action   = {
       type: ActionType.UPDATE_ROWS,
    payload: {
      fromRow: fromRow,
        toRow: toRow,
       update: update
    }
  }

  return action
}

export { insertRow, updateRows }
