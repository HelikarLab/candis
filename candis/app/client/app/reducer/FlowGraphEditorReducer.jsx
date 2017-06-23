import shortid    from 'shortid'
import graphlib   from 'graphlib'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'

const initialState    = { graph: new graphlib.Graph() }
const flowGraphEditor = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      const ID    = shortid.generate()
      const node  = action.payload
      let   graph = cloneDeep(state.graph)

      graph.setNode(ID, JSON.stringify(node))

      return {...state, graph: graph}
    }
  }

  return state
}

export default flowGraphEditor
