import React    from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import config   from './config'
import Store    from './Store'
import Routes   from './Routes'

const container  = $(`#${config.container}`)[0]

const provider   = (
  <Provider store={Store}>
    <Router
      history={browserHistory}
      children={Routes}/>
  </Provider>
)

ReactDOM.render(provider, container)
