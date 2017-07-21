import ActionType    from '../constant/ActionType'

const initialState  = { user: null }
const app           = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.App.SET_USER:
      return { ...state, user: action.payload }

    case ActionType.Asynchronous.WRITE_REQUEST:
      NProgress.set(0.0)

      break

    case ActionType.Asynchronous.WRITE_SUCCESS:
      NProgress.set(1.0)

      break

    case ActionType.App.EXIT:
      // STUB
      return {...state, user: null }
      // end STUB
  }

  return state
}

export default app
