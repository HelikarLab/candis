import ActionType from '../constant/ActionType'

const showDialog = (dialog) => {
  const action   = {
       type: ActionType.SHOW_DIALOG,
    payload: dialog
  }

  return action
}

const hideDialog = (dialog) => {
  const action   = {
       type: ActionType.HIDE_DIALOG,
    payload: dialog
  }

  return action
}

export { showDialog, hideDialog }
