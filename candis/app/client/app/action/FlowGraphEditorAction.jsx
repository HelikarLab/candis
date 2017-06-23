import ActionType from '../constant/ActionType'

const addNode  = (node) => {
  const action = {
       type: ActionType.ADD_NODE,
    payload: node
  }

  return action
}

export { addNode }
