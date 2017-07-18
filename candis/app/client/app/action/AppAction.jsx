import ActionType from '../constant/ActionType'

const setAuthenticated = (authenticated) => {
  const action = {
       type: ActionType.App.SET_AUTHENTICATED,
    payload: authenticated
  }

  return action
}

export { setAuthenticated }