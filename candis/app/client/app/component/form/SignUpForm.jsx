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
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
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
  mapPropsToValues: props => ({ email: '', password: '', username: '' }),
  
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email is required!"),
    username: Yup.string().min(4).required("This field is required"),
    password: Yup.string().min(8).required("This field is required!")
  }),

  handleSubmit: (
    values,
    {
      props,
      resetForm,
      setSubmitting,
      setStatus,
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    console.log(values)
    axios.post(config.routes.API.user.sign_up, values).then(({data}) => {
      console.log(data)
      toastr.success("Registered Successfully")
      resetForm()
    }).catch(({response}) => {
      console.log(response.data.error)
      toastr.error(response.data.error.errors[0].message)
    })
    setSubmitting(false)
  },
})(SignUpBasic)

const SignUpForm = props => (
  <div>
    <SignUpEnhanced />
  </div>
)

export default SignUpForm


