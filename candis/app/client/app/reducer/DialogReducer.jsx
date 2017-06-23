import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'

const initialState   = { }

const dialog         = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_DIALOG: {
      let dialog     = cloneDeep(action.payload)

      dialog.display = true

      return dialog
    }

    case ActionType.HIDE_DIALOG: {
      let dialog     = cloneDeep(action.payload)

      dialog.display = false

      return dialog
    }
  }

  return state
}

export default dialog
