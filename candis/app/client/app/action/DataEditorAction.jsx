import ActionType from '../constant/ActionType'

const deleteColumn = (column) => {
  const action     = {
       type: ActionType.DELETE_COLUMN,
    payload: column
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

const row     = 
{
  insert: (position, row) =>
  {
    const action = 
    {
          type: ActionType.DataEditor.INSERT_ROW,
      payload: { position: position, row: row }
    }

    return action
  },
  select: (index, row) =>
  {
    const action =
    {
         type: ActionType.DataEditor.SELECT_ROW,
      payload: { index: index, row: row }
    }

    return action
  },
  deselect: (index, row) =>
  {
    const action =
    {
         type: ActionType.DataEditor.DESELECT_ROW,
      payload: { index: index, row: row }
    }

    return action
  },
  delete: (index, row) =>
  {
    const action =
    {
         type: ActionType.DataEditor.DELETE_ROW,
      payload: { index: index, row: row }
    }

    return action
  }
}
const column  = 
{
  insert: (position, column) =>
  {
    const action     = {
          type: ActionType.DataEditor.INSERT_COLUMN,
      payload: { position: position, column: column }
    }

    return action
  }
}

export { row, column,
  deleteColumn, updateRows, refresh }
