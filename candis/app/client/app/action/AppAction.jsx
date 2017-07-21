import ActionType from '../constant/ActionType'

const setUser  = (user) => {
  const action = { type: ActionType.App.SET_USER, payload: user }

  return action
}

const exit     = ( ) => {
  const action = { type: ActionType.App.EXIT }

  return action
}

export { setUser, exit }