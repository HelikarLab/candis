import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import SelectTags from "./SelectTags"

const EntrezBasic = props => {
  return (
    <div className={classNames("panel panel-default", props.classNames.root)}>
      <div className="panel-body">
        <Form>
          <div className="row">
            <div className="col-xs-3">
              <label>Email</label>
            </div>
            <div className="col-xs-6">
              <Field type="email" name="email" />
            </div>
            <div className="col-xs-3">
              {props.touched.email &&
                props.errors.email && <small>{props.errors.email}</small>}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <label>Tool Name</label>
            </div>
            <div className="col-xs-6">
              <Field type="text" name="toolName" />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <label>API KEY</label>
            </div>
            <div className="col-xs-6">
              <Field type="text" name="api_key" />
            </div>
          </div>
          <label>Database (Select 1)</label>
          <SelectTags
            name={"database"}
            multi={false}
            onChange={props.setFieldValue}
            options={props.options}
            onBlur={props.setFieldTouched}
            value={props.values.database}
            error={props.errors.database}
            touched={props.touched.database}
          />
          <label>Terms (Enter Atleast 1)</label>
          <SelectTags
            name={"terms"}
            multi={true}
            onChange={props.setFieldValue}
            onBlur={props.setFieldTouched}
            value={props.values.terms}
            error={props.errors.terms}
            touched={props.touched.terms}
          />
          <div className="col-xs-3">
            {props.touched.terms &&
              props.errors.terms && <small>{props.errors.terms}</small>}
          </div>
          <button disabled={props.isSubmitting}>Search</button>
        </Form>
      </div>
    </div>
  )
}

const Entrez = withFormik({
  mapPropsToValues({ email, toolName, database, terms, useHistory, api_key }) {
    return {
      email: email || "",
      toolName: toolName || "",
      api_key: api_key || ""
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required!"),
    api_key: Yup.string(),
    name: Yup.string(),
    database: Yup.string().required("This field is required!"),
    terms: Yup.string().required("This field is required!")
  }),
  handleSubmit(values) {
    const payload = {
      ...values,
      database: values.database.value,
      terms: values.terms.map(t => t.value)
    }
    console.log(payload)
  },
  displayName: "Entrez Form"
})(EntrezBasic)

export default Entrez
