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

    const props = this.props

    // STUB
    const user  = { }
    // end STUB

    props.onSuccess(user)
  }

  render ( ) {
    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-block btn-brand-primary">
          <div className="text-center">
            <div className="text-uppercase font-bold">
              Sign In
            </div>
          </div>
        </button>
      </form>
    )
  }
}

SignInForm.propTypes =
{
  onSuccess: PropTypes.func.isRequired
}

export default SignInForm
