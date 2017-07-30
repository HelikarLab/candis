import React        from 'react'
import PropTypes    from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect }  from 'react-redux'

import jsonwebtoken from 'jsonwebtoken'

import config       from '../config'

import SignInForm   from '../component/form/SignInForm'
import ActionType   from '../constant/ActionType'
import { signin }   from '../action/AppAction'

class SignIn extends React.Component {
  constructor (props) {
    super (props)

    this.onSubmit  = this.onSubmit.bind(this)
  }

  onSubmit (data) {
    const props    = this.props
    const dispatch = props.dispatch

    dispatch({
      type: ActionType.App.SIGNIN_REQUEST
    })

    // STUB
    // This stub fakes a request and creates a tokenized `response` object.
    const response = { data: { } }
    const token    = jsonwebtoken.sign(response, 'JWT_SECRET')
    // end STUB

    const action   = signin(token)

    props.dispatch(action)
    props.dispatch({
      type: ActionType.App.SIGNIN_SUCCESS
    })
  }

  render ( ) {
    const props    = this.props
    const { from } = props.location.state || { from: { pathname: config.routes.base } }

    return props.user !== null ? 
      (<Redirect to={from}/>)
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
                <SignInForm onSubmit={this.onSubmit}/>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

SignIn.propTypes      = 
{
  user: PropTypes.object
}
SignIn.defaultProps   = 
{
  user: null
}

const mapStateToProps = (state, props) => {
  const app           = state.app

  return {
    user: app.user
  }
}

export default connect(mapStateToProps)(SignIn)
