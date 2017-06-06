import { combineReducers } from 'redux'

import dialog from './DialogReducer'

const Reducers = combineReducers({
  dialog: dialog
})

export default Reducers
