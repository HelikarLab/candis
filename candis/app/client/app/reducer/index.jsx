import { combineReducers } from 'redux'

import toolBox         from './ToolBoxReducer'
import documents       from './DocumentsReducer'
import dialog          from './DialogReducer'
import dataEditor      from './DataEditorReducer'
import data            from './DataReducer'

const Reducers = combineReducers({
          toolBox: toolBox,
        documents: documents,
           dialog: dialog,
       dataEditor: dataEditor,
             data: data
})

export default Reducers
