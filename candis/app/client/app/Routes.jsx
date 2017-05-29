import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Config from './Config'
import App    from './page/App'

const Routes = (
  <Route path={Config.routes.base}>
    <IndexRoute component={App}/>
  </Route>
)

export default Routes
