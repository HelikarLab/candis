import ActionType from '../constant/ActionType'

const initialState   = {
     type: null,
  display: false
}

const dialog         = (state = initialState, action) => {
  let dialog         = action.payload

  switch (action.type) {
    case ActionType.SHOW_DIALOG:
      dialog.display = true

      return dialog

    case ActionType.HIDE_DIALOG:
      dialog.display = false

      return dialog
  }

  return state
}

export default dialog
