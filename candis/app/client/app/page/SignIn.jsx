import React  from 'react'

import config from '../config'

class SignIn extends React.Component {
  render ( ) {
    return (
      <div className="container-fluid">
        <div className="panel panel-default no-background no-border no-shadow">
          <div className="panel-body">
            <img className="img-responsive center-block" src={`${config.routes.images}/logo-title.png`} style={{
                maxHeight: '256px'
              }}/>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
