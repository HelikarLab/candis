import React from "react"
import axios from 'axios'
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from 'react-redux'
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'

const ResetPasswordBasic = props => (
  <Form>
    <div className="form-group">
      <label>Password</label>
      <Field type="password" name="password" className="form-control"/>
      <small className="help-block">
        {props.touched.password && props.errors.password}
      </small>
    </div>  

    <div className="form-group">
      <label>Confirm Password</label>
      <Field type="password" name="confirmPassword" className="form-control"/>
      <small className="help-block">
        {props.touched.confirmPassword && props.errors.confirmPassword}
      </small>
    </div>
    
    <button className="btn btn-block btn-brand-primary">
    <div className="text-center">
      <div className="text-uppercase font-bold">
        Reset Password
      </div>
    </div>
    </button>
  </Form>
)

const ResetPasswordEnhanced = withFormik({
  mapPropsToValues: (props) => ({
    password: props.password || "",
    confirmPassword: props.confirmPassword || ""
  }),

  validationSchema: Yup.object().shape({
    password: Yup.string().required("This field is required to login"),
    confirmPassword: Yup.string().equalTo(Yup.ref('password'), 'passwords must match').required('Confirm password required')
  }),

  handleSubmit: (values) => {
      console.log("values are ", values)
  }
})(ResetPasswordBasic)

export default ResetPasswordEnhanced

