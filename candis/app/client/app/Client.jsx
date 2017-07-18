// This is the starting point of the application.
import React    from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import config   from './config'
import Store    from './Store'
import Routes   from './Routes'

const container = document.getElementById(config.container)
const provider  = (
  <Provider store={Store}>
    <Router children={Routes}/>
  </Provider>
)

ReactDOM.render(provider, container)