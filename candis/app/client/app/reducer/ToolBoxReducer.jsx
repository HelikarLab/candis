import ActionType   from '../constant/ActionType'

import Compartments from '../meta/Compartments'

const initialState = { }

const toolBox      = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ON_HOVER_TOOL: {
      const tool   = action.payload
      
      return {...state, activeTool: tool}
    }
  }

  return state
}

export default toolBox
