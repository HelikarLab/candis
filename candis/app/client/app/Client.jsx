// This is the starting point of the application.
import React        from 'react'
import ReactDOM     from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'preact/devtools'

import storage      from 'store'
import jsonwebtoken from 'jsonwebtoken'

import config       from './config'
import store        from './Store'
import routes       from './Routes'

import { signin, signout } from './action/AppAction'

// Temporary Fix.
// https://github.com/adazzle/react-data-grid/pull/1027 (To Deploy)
import 'create-react-class'

const token       = storage.get('JWT_TOKEN')
const action      = token ? signin(token) : signout()

store.dispatch(action)

store.subscribe(() => {
	console.log(store.getState())
})

const container   = document.getElementById(config.container)
const provider    = (
	<Provider store={store}>
		<Router children={routes}/>
	</Provider>
)

ReactDOM.render(provider, container)
