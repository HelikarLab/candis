import React        from 'react'
import { Route }    from 'react-router-dom'

import config       from './config'
import PrivateRoute from './component/PrivateRoute'
import App          from './component/App'
import SignIn       from './page/SignIn'

const Routes = (
  <div>
    <PrivateRoute
    	     path={config.routes.base}
    	component={App}/>
    <Route
    		   path={config.routes.signin}
    	component={SignIn}/>
  </div>
)

export default Routes
