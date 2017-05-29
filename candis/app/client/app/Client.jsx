import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import Config   from './Config'
import Store    from './Store'
import Routes   from './Routes'

const container  = $(`#${Config.container}`)[0]

const provider   = (
  <Provider store={Store}>
    <Router
      history={browserHistory}
      children={Routes}/>
  </Provider>
)

ReactDOM.render(provider, container)
