import React  from 'react'

import config from '../config'

import SignInForm from '../component/form/SignInForm'

class SignIn extends React.Component {
  render ( ) {
    return (
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
          <div className="panel panel-default no-background no-border no-shadow">
            <div className="panel-body">
              <SignInForm/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
