import ActionType from '../constant/ActionType'

const removeDocument = (doc) => {
  const action       = {
       type: ActionType.Documents.REMOVE_DOCUMENT,
    payload: doc
  }

  return action
}

export { removeDocument }
