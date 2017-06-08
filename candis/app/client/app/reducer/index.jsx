import { combineReducers } from 'redux'

import dialog     from './DialogReducer'
import dataEditor from './DataEditorReducer'

const Reducers = combineReducers({
      dialog: dialog,
  dataEditor: dataEditor
})

export default Reducers
