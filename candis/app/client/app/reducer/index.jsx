import { combineReducers } from 'redux'

import dialog     from './DialogReducer'
import dataEditor from './DataEditorReducer'
import filePanel  from './FilePanelReducer'

const Reducers = combineReducers({
      dialog: dialog,
  dataEditor: dataEditor,
   filePanel: filePanel
})

export default Reducers
