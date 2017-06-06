import ActionType from '../constant/ActionType'

const displayDialog = (dialog) => {
  const action =
  {
       type: ActionType.SHOW_DIALOG,
    payload:
    {
      dialog: dialog
    }
  }

  return action
}

export { displayDialog }
