import React from "react"
import axios from 'axios'
import PropTypes from "prop-types"
import classNames from "classnames"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'

const SignUpBasic = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Username</label>
      <input
        className="form-control"
        type="text"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <small className="help-block">{touched.name && errors.name}</small>
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        className="form-control"
        type="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      <small className="help-block">{touched.email && errors.email}</small>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input
        className="form-control"
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      <small className="help-block">{touched.password && errors.password}</small>
    </div>
    <button className="btn btn-block btn-brand-primary" type="submit" disabled={isSubmitting}>
    <div className="text-center">
      <div className="text-uppercase font-bold">
        Submit
      </div>
    </div>
    </button>
  </form>
)

const SignUpEnhanced = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '', name: '' }),
  
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email is required!"),
    name: Yup.string().min(4).required("This field is required"),
    password: Yup.string().min(8).required("This field is required!")
  }),

  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    console.log(values)
    // LoginToMyApp(values).then(
    //   user => {
    //     setSubmitting(false)
    //     // do whatevs...
    //     // props.updateUser(user)
    //   },
    //   errors => {
    //     setSubmitting(false)
    //     // Maybe even transform your API's errors into the same shape as Formik's!
    //     setErrors(transformMyApiErrors(errors))
    //   }
    // )
    setSubmitting(true)
  },
})(SignUpBasic)

const SignUpForm = props => (
  <div>
    <SignUpEnhanced />
  </div>
)

export default SignUpForm


