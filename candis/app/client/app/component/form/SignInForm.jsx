import React     from 'react'
import PropTypes from 'prop-types'

class SignInForm extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state    = SignInForm.defaultStates
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit (event) {
    if ( !event.isDefaultPrevented() )
      event.preventDefault()

    const props = this.props

    // STUB
    // This stub fakes form data to be sent to HOC.
    const data  = { }
    // end STUB

    props.onSubmit(data)
  }

  render ( ) {
    return (
      <form onChange={this.onChange} onSubmit={this.onSubmit}>
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

SignInForm.propTypes     =
{
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
}
SignInForm.defaultProps  = 
{
  onChange: (data) => { }
}
SignInForm.defaultStates = 
{

}

export default SignInForm
