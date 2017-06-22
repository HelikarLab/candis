import ActionType from '../constant/ActionType'

const onHoverTool = (tool) => {
  const action    = {
       type: ActionType.ON_HOVER_TOOL,
    payload: tool
  }

  return action
}

export { onHoverTool }
