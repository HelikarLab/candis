import { combineReducers } from 'redux'

import app               from './AppReducer'
import toolBox           from './ToolBoxReducer'
import documentProcessor from './DocumentProcessorReducer'
import modal             from './ModalReducer'
import dataEditor        from './DataEditorReducer'
import data              from './DataReducer'

const Reducer = combineReducers({ app, modal, documentProcessor,
	toolBox, dataEditor, data })

export default Reducer
