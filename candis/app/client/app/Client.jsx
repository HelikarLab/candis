// This is the starting point of the application.
import React        from 'react'
import ReactDOM     from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import storage      from 'store'
import jsonwebtoken from 'jsonwebtoken'

import config       from './config'
import store        from './store'
import routes       from './routes'

import { signin, signout } from './action/AppAction'

const token       = storage.get('JWT_TOKEN')
const action      = token ? signin(token) : signout()

store.dispatch(action)

const container   = document.getElementById(config.container)
const provider    = (
	<Provider store={store}>
		<Router children={routes}/>
	</Provider>
)

ReactDOM.render(provider, container)