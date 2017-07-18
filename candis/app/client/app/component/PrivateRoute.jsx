import React       from 'react'
import PropTypes   from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import config      from '../config'

class PrivateRoute extends Route {
	render ( ) {
		const {authenticated, component, ...rest} = this.props

		return <Route render={(props) => {
				return authenticated ? 
					<component {...props}/>
						: <Redirect to={{
							pathname: config.routes.signin,
							   state: { from: props.location }
							}}/>
			}}/>
	}
}

PrivateRoute.propTypes = 
{
	authenticated: PropTypes.bool.isRequired
}

const mapStateToProps  = (state, props) => {
	const app          = state.app

	return {
		authenticated: app.authenticated
	}
}

export default connect(mapStateToProps)(PrivateRoute)