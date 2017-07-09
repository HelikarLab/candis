import React  from 'react'
import { Route } from 'react-router-dom'

import config from './config'
import App    from './component/App'
import SignIn from './page/SignIn'

const Routes = (
  <div>
    <Route path={config.routes.base}   component={App} exact/>
    <Route path={config.routes.signin} component={SignIn}/>
  </div>
)

export default Routes
