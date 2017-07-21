// This is the starting point of the application.
import React    from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import config   from './config'
import store    from './store'
import routes   from './routes'

const container = document.getElementById(config.container)
const provider  = (
	<Provider store={store}>
		<Router children={routes}/>
	</Provider>
)

ReactDOM.render(provider, container)