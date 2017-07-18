import ActionType from '../constant/ActionType'

const initialState = { authenticated: false }
const app          = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.App.SET_AUTHENTICATED: {
    	const authenticated = action.payload

    	return {...state, authenticated: authenticated }
    }
  }

  return state
}

export default app
