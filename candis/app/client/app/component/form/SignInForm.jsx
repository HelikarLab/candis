import React from 'react'

class SignInForm extends React.Component {
  constructor (props) {
    super (props)
  }

  render ( ) {
    return (
      <form>
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

export default SignInForm
