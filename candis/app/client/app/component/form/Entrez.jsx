import React from "react"
import axios from 'axios'
import PropTypes from "prop-types"
import classNames from "classnames"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'
import SelectTags from "../widget/SelectTags"

const EntrezBasic = props => {
  return (
    <div className="container-fluid">
      <Form>
          
        <div className="form-group">
          <label>Email</label>
          <Field type="email" name="email" className="form-control" />
          <small className="help-block">
            {props.touched.email && props.errors.email}
          </small>
        </div>
        
        <div className="form-group">
          <label>Tool Name</label>
          <Field type="text" name="toolName" className="form-control"/>
          <small className="help-block">
            {props.touched.toolName && props.errors.toolName}
          </small>          
        </div>
          
        <div className="form-group">
          <label>API KEY</label>
          <Field type="text" name="api_key" className="form-control" />
        </div>

        <div className="form-group">
          <label>Database (Select 1)</label> 
          <SelectTags
            className="form-control"
            name={"database"}
            multi={false}
            onChange={props.setFieldValue}
            options={props.options}
            onBlur={props.setFieldTouched}
            value={props.values.database}
            error={props.errors.database}
            touched={props.touched.database}
          />
        </div>

        <div className="form-group">
          <label>Terms (Enter Atleast 1)</label>
          <SelectTags
            className="form-control"
            name={"term"}
            multi={true}
            onChange={props.setFieldValue}
            onBlur={props.setFieldTouched}
            value={props.values.term}
            error={props.errors.term}
            touched={props.touched.term}
          />
        </div>
        
        <div className="row">
          <div className="col-xs-8">
          </div>
          <div className="col-xs-4">
            <button type="submit" disabled={props.isSubmitting} className="btn btn-block btn-primary">
              <div className="text-uppercase font-bold">
              {props.isSubmitting ? <i className="fa fa-spinner fa-pulse"></i> : <i className="fa fa-search"></i>}
                {" "}Search
              </div>
            </button>
          </div>
        </div>

      </Form>
    </div>
  )
}

const Entrez = withFormik({
  mapPropsToValues({ email, toolName, database, term, useHistory, api_key }) {
    return {
      email: email || "",
      toolName: toolName || "",
      api_key: api_key || ""
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("This field is required!"),
    api_key: Yup.string(),
    toolName: Yup.string().required("This field is required!"),
    database: Yup.string().required("This field is required!"),
    term: Yup.string().required("This field is required!")
  }),
  handleSubmit(values, actions) {
    const payload = {
      ...values,
      database: values.database.value,
      term: values.term.map(t => t.value)
    }
    axios.post(config.routes.API.data.search, payload).then(({data}) => {
      // to be implemented - to feed results into the data-grid table.
      const searchResults = data.data
      console.log(searchResults)
      const rows = Object.values(searchResults)  // list of objects, with each object having keys, 'title', 'accession', and 'summary'
      actions.setSubmitting(false)
    }).catch((error) => {
      // to be implemented
      console.log(error)
    })
  },
  displayName: "Entrez Form"
})(EntrezBasic)

export default Entrez
