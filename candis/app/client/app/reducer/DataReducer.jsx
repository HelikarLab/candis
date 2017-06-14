import ActionType from '../constant/ActionType'

const initialState = { resource: { } }
const data         = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REFRESH_RESOURCE_SUCCESS: {
      return {...state, resource: action.payload }
    }
  }

  return state
}

export default data
