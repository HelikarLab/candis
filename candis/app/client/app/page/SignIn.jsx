import React        from 'react'
import PropTypes    from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect }  from 'react-redux'

import config       from '../config'

import SignInForm   from '../component/form/SignInForm'
import { setAuthenticated } from '../action/AppAction'

class SignIn extends React.Component {
  constructor (props) {
    super (props)

    this.onSuccess = this.onSuccess.bind(this)
    this.state     = SignIn.defaultState
  }

  onSuccess ( ) {
    const props    = this.props

    props.dispatch(setAuthenticated(true))
  }

  render ( ) {
    const props    = this.props

    return props.authenticated ? 
      (
        <Redirect to={config.routes.base}/>
      )
      : 
      (
        <div className="vertical-center" style={{
            minHeight: '100%',
            minHeight: '100vh'
          }}>
          <div className="container-fluid">
            <div className="panel panel-default no-margin no-background no-border no-shadow">
              <div className="panel-body">
                <img className="img-responsive center-block" src={`${config.routes.images}/logo-title.png`} style={{
                    maxHeight: '256px'
                  }}/>
              </div>
            </div>
            <div className="panel panel-default no-margin no-background no-border no-shadow">
              <div className="panel-body">
                <SignInForm onSuccess={this.onSuccess}/>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

SignIn.propTypes      = { authenticated: PropTypes.bool.isRequired }

const mapStateToProps = (state, props) => {
  const app           = state.app

  return {
    authenticated: app.authenticated
  }
}

export default connect(mapStateToProps)(SignIn)
