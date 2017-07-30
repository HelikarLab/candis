import storage      from 'store'
import jsonwebtoken from 'jsonwebtoken'

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

const signin       = (token) => 
{
	const dispatcher = (dispatch) =>
	{
		storage.set('JWT_TOKEN', token)
 
		const decoded  = jsonwebtoken.decode(token)
		const user     = decoded.data

		const action   = setUser(user)

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