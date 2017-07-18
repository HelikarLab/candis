import React     from 'react'
import PropTypes from 'prop-types'

class SignInForm extends React.Component {
  constructor (props) {
    super (props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (event) {
    if ( !event.isDefaultPrevented() ) {
      event.preventDefault()
    }

    this.props.onSuccess()
  }

  render ( ) {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <button className="btn btn-block btn-brand-primary">
            <div className="text-center">
              <div className="text-uppercase font-bold">
                Sign In
              </div>
            </div>
          </button>
        </div>
      </form>
    )
  }
}

SignInForm.propTypes =
{
  onSuccess: PropTypes.func.isRequired
}

export default SignInForm
