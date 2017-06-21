import { combineReducers } from 'redux'

import toolBox    from './ToolBoxReducer'
import dialog     from './DialogReducer'
import dataEditor from './DataEditorReducer'
import data       from './DataReducer'

const Reducers = combineReducers({
     toolBox: toolBox,
      dialog: dialog,
  dataEditor: dataEditor,
        data: data
})

export default Reducers
