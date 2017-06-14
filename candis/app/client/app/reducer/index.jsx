import { combineReducers } from 'redux'

import dialog     from './DialogReducer'
import dataEditor from './DataEditorReducer'
import data       from './DataReducer'

const Reducers = combineReducers({
      dialog: dialog,
  dataEditor: dataEditor,
        data: data
})

export default Reducers
