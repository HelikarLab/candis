import { combineReducers } from 'redux'

import toolBox         from './ToolBoxReducer'
import flowGraphEditor from './FlowGraphEditorReducer'
import dialog          from './DialogReducer'
import dataEditor      from './DataEditorReducer'
import data            from './DataReducer'

const Reducers = combineReducers({
          toolBox: toolBox,
  flowGraphEditor: flowGraphEditor,
           dialog: dialog,
       dataEditor: dataEditor,
             data: data
})

export default Reducers
