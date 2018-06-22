import storage      from 'store'

import ActionType   from '../constant/ActionType'

const setUser      = (user) =>
{
	const action     = 
	{
		   type: ActionType.App.SET_USER,
		payload: user
	}

	return action
}

// const signin       = (token) => 
// {
// 	const dispatcher = (dispatch) =>
// 	{
// 		storage.set('JWT_TOKEN', token)
 
// 		const decoded  = jsonwebtoken.decode(token)
// 		const user     = decoded.data

// 		const action   = setUser(user)

// 		dispatch(action)
// 	}

// 	return dispatcher
// }

const signin = (payload) => {
  const dispatcher = (dispatch) => {
    storage.set('JWT_TOKEN', payload.token)
    storage.set('ACTIVE_USER', payload.user)
    const action = setUser(payload.user)
    dispatch(action)

  }
  return dispatcher
}

const signout      = ( ) =>
{
	const dispatcher = (dispatch) =>
	{	
		storage.remove('JWT_TOKEN')

		const action   = setUser(null)

		dispatch(action)
	}

	return dispatcher
}

export { signin, signout, setUser }