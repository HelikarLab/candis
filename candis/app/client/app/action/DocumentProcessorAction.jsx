import ActionType from '../constant/ActionType'

const removeDocument = (doc) => {
  const action       = {
       type: ActionType.DocumentProcessor.REMOVE_DOCUMENT,
    payload: doc
  }

  return action
}

export { removeDocument }
