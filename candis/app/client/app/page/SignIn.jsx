import React        from 'react'
import PropTypes    from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect }  from 'react-redux'

import config       from '../config'

import SignInForm   from '../component/form/SignInForm'
import { setUser }  from '../action/AppAction'

class SignIn extends React.Component {
  constructor (props) {
    super (props)

    this.onSuccess = this.onSuccess.bind(this)
  }

  onSuccess (user) {
    const props    = this.props

    const action   = setUser(user)

    props.dispatch(action)
  }

  render ( ) {
    const props = this.props
    const to    = props.location.state.from || { pathname: config.routes.base }

    return props.user !== null ? 
      (<Redirect to={to}/>)
      : 
      (
        <div className="jumbotron no-margin vertical-center">
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

SignIn.propTypes      = { user: PropTypes.object }
SignIn.defaultProps   = { user: null }

const mapStateToProps = (state, props) => {
  const app           = state.app

  return {
    user: app.user
  }
}

export default connect(mapStateToProps)(SignIn)
