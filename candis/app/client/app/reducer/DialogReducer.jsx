import ActionType from '../constant/ActionType'

const initialState = { }
const dialog       = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_DIALOG:
      let dialog     = action.payload.dialog
      dialog.display = true

      return dialog
    case ActionType.HIDE_DIALOG:
      return state
    default:
      return state
  }
}

export default dialog
