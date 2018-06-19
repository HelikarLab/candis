import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import config from '../config'
import SignUpForm from '../component/form/SignUpForm'
import { signin } from '../action/AppAction'

class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data){
    const response = data
  }
  
  
  render(){
    const props = this.props
    const { from } = { from: { pathname: config.routes.base } }
    return props.user !== null ?
      (<Redirect
         to={from} 
        />)
      :
      (
        <div className="jumbotron no-margin vertical-center">
          <div className="container-fluid">
            <div className="panel panel-default no-margin no-background no-border no-shadow">
              <div className="panel-body">
                <img className="img-responsive center-block" src={`${config.routes.images}/logo-w-title.png`} style={{
                    maxHeight: '256px'
                  }}/>
              </div>
            </div>
            <div className="panel panel-default no-margin no-background no-border no-shadow">
              <div className="panel-body">
                <SignUpForm/>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

const mapStateToProps = (state, props) => {
  const app           = state.app

  return {
    user: app.user
  }
}

export default connect(mapStateToProps)(SignUp)
