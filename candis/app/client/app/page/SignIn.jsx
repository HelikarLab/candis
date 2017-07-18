import React  from 'react'
import { Redirect } from 'react-router-dom'

import config from '../config'

import SignInForm from '../component/form/SignInForm'

class SignIn extends React.Component {
  constructor (props) {
    super (props)

    this.onSuccess = this.onSuccess.bind(this)
    this.state     = SignIn.defaultState
  }

  onSuccess ( ) {
    this.setState({
      success: true
    })
  }

  render ( ) {
    return this.state.success ? 
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

SignIn.defaultState = { success: false }

export default SignIn
