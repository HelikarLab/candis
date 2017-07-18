import React       from 'react'
import PropTypes   from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import config      from '../config'

class PrivateRoute extends Route {
	render ( ) {
		const props         = this.props
		const authenticated = props.authenticated
		const Component     = props.component

		return <Route render={(props) => {
				return authenticated ? 
					<Component {...props}/>
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