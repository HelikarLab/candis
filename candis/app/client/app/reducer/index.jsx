import { combineReducers } from 'redux'

import app               from './AppReducer'
import toolBox           from './ToolBoxReducer'
import documentProcessor from './DocumentProcessorReducer'
import graphEditor       from './GraphEditorReducer'
import dialog            from './DialogReducer'
import dataEditor        from './DataEditorReducer'
import data              from './DataReducer'

const Reducers = combineReducers({
				  app: app,
              toolBox: toolBox,
	documentProcessor: documentProcessor,
		  graphEditor: graphEditor,
               dialog: dialog,
           dataEditor: dataEditor,
                 data: data
})

export default Reducers
