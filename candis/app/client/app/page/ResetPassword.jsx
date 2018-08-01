import React        from 'react'
import PropTypes    from 'prop-types'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { connect }  from 'react-redux'

import jsonwebtoken from 'jsonwebtoken'

import config       from '../config'

import ResetPasswordForm from '../component/form/ResetPasswordForm'
import ActionType   from '../constant/ActionType'
import { signin }   from '../action/AppAction'

class ResetPassword extends React.Component {
  constructor (props) {
    super (props)
    
    this.state = {
      resetToken: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    const props = this.props
    const reset_token = props.location.search.match(/reset_token=(.*)/)[1]
    const output = { reset_token }
    axios.post(config.routes.API.user.resetPassword, output).then(({ data }) => {
      console.log("data is", data)
      this.setState({
        resetToken: reset_token
      })
    }).catch(({response}) => {
      this.setState({
        resetToken: null
      })
      toastr.error("Invalid Reset Token!")
    })
  }

  onSubmit (data) {
    const reset_token = this.state.resetToken
    const output = { reset_token, new_password: data }
    axios.post(config.routes.API.user.resetPassword, output).then(({ data }) => {
      console.log("data is", data)
      toastr.success("Password updated successfully! Login with your new password.")
    }).catch(({response}) => {
      this.setState({
        resetToken: null
      })
      toastr.error("Reset Token might have expired. Generate again!")
    })
  }

  render () {
    const props = this.props
    
    return this.state.reset_token !== null ?
    (
      <div>
        <ResetPasswordForm onSubmit={this.onSubmit}/>
      </div>
    )
    :
    (
      <div>
        <Link to={config.routes.base}>Return Home</Link>
      </div>
    )
  }
}

export default ResetPassword
