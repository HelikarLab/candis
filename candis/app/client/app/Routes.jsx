import React from 'react'
import { Route, IndexRoute } from 'react-router'

import config from './Config'
import App    from './page/App'

const Routes = (
  <Route path={config.routes.base}>
    <IndexRoute component={App}/>
  </Route>
)

export default Routes
