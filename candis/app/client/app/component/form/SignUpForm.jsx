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
    <label>Username</label>
    <input
      type="name"
      name="name"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.name}
    />
    <label>Email</label>
    <input
      type="email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {touched.email && errors.email && <div>{errors.email}</div>}
    <label>Password</label>
    <input
      type="password"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
)

const SignUp = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '', name: '' }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required!"),
    name: Yup.string(),
    password: Yup.string().required("This field is required!")
  }),
  handleChange: (e) => {
    values[e.target.name] = e.target.value
  },
  // Submission handler
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
    setSubmitting(false)
  },
})(SignUpBasic)

const SignUpForm = props => (
  // <div className={classNames("container", props.classNames.root)}>
  <div>
    <SignUp />
  </div>
)

export default SignUpForm


