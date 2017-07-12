import ActionType from '../constant/ActionType'

const setActiveDocument = (dokument) => {
  const action          = {
  	   type: ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT,
  	payload: dokument
  }

  return action
}

const removeDocument    = (dokument) => {
  const action          = {
       type: ActionType.DocumentProcessor.REMOVE_DOCUMENT,
    payload: dokument
  }

  return action
}

export { setActiveDocument, removeDocument }
