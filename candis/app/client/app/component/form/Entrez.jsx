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
      <div className={classNames("container", props.classNames.root)}>
        <Form>
            
          <label>Email</label>
          <div className="row">
              <div className="col-xs-12">
                <Field type="email" name="email" />
              </div>

              {props.touched.email &&
                props.errors.email && (
                  <div style={{ color: "red", marginTop: ".5rem", marginBottom: ".5rem" }}>
                    {props.errors.email}
                  </div>
                )}
          </div>
          

          <label>Tool Name</label>
          <div className="row">
            <div className="col-xs-8">
              <Field type="text" name="toolName" />
            </div>
          </div>
            
          <label>API KEY</label>
          <div className="row">
            <div className="col-xs-8">
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
            name={"term"}
            multi={true}
            onChange={props.setFieldValue}
            onBlur={props.setFieldTouched}
            value={props.values.term}
            error={props.errors.term}
            touched={props.touched.term}
          />
          
          <div className="row">
            <div className="col-xs-3">
              <button disabled={props.isSubmitting} class="btn btn-primary">
                Search
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
      .required("Email is required!"),
    api_key: Yup.string(),
    name: Yup.string(),
    database: Yup.string().nullable().required("This field is required!"),
    term: Yup.string().required("This field is required!")
  }),
  handleSubmit(values, actions) {
    const payload = {
      ...values,
      database: values.database.value,
      term: values.term.map(t => t.value)
    }
    axios.post(config.routes.API.data.search, payload).then(({data}) => {
      const searchResults = data.data
      console.log(searchResults)
      const rows = Object.values(searchResults)  // list of objects, with each object having keys, 'title', 'accession', and 'summary'
    }).catch((error) => {
      console.log(error)
    })
    actions.setSubmitting(false)
  },
  displayName: "Entrez Form"
})(EntrezBasic)

export default Entrez
