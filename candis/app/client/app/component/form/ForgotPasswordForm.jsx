import React from "react"
import axios from 'axios'
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from 'react-redux'
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'

const ForgotPasswordBasic = props => (
  <Form className="form-inline">
    <div className="form-group">
      <label>Email</label>
      <Field type="email" name="email" className="form-control" placeholder={props.email}/>
      <small className="help-block">
        {props.touched.email && props.errors.email}
      </small>
    </div>
  </Form>
)

const ForgotPasswordEnhanced = withFormik({
  mapPropsToValues: (props) => ({email: props.email || ""}),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("This field is required")
  }),
  onSubmit: (values) => {
    console.log("Values are", values)
  }
})(ForgotPasswordBasic)

export default ForgotPasswordEnhanced

