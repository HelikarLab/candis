import ActionType from '../constant/ActionType'

const initialState = {
  files: [ ]
}
const filePanel    = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REFRESH_RESOURCE_SUCCESS: {
      return {...state, files: action.payload.files }
    }
  }

  return state
}

export default filePanel
