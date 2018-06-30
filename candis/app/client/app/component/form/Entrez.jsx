import React from "react"
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from "prop-types"
import ReactDataGrid  from 'react-data-grid'
import classNames from "classnames"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'
import SelectTags from "../widget/SelectTags"
import entrez from '../../action/EntrezAction'

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

const EntrezEnhanced = withFormik({
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
  handleSubmit(values, { props, setSubmitting }) {
    const payload = {
      ...values,
      database: values.database.value,
      term: values.term.map(t => t.value)
    }

    const action = entrez.search(payload)
    props.dispatch(action)
    setSubmitting(false)  // this happens synchronously, use promise callback. 
  },
  displayName: "Entrez Form"
})(EntrezBasic)

const EntrezDataGrid = props => {
  // cols 'key' are dependent on api/data/search API endpoint
  const cols = [
    {
      key: 'accession',
      name: 'accession number',
      resizable: true,
      width: 200
    },
    {
      key: 'title',
      name: 'title',
      resizable: true,
      width: 1000

    },
    {
      key: 'taxon',
      name: 'taxon',
      resizable: true,
      width: 200
    }
  ]

  const rowGetter = i => {
    return props.search_results[i]
  }

  const onSelect = (row) => {
    const payload = {
      accession: row[0].accession,
      toolName: props.toolName,
      database: props.database,
      email: props.email
    }
    const action = entrez.download(payload)
    props.dispatch(action)
  }

  return (
    <div>
      <ReactDataGrid
        rowKey="accession"
        columns={cols}
        rowGetter={rowGetter}
        rowsCount={props.search_results.length}
        enableCellSelect={true}
        enableRowSelect="single"
        onRowSelect={onSelect}
        minHeight={500}
      />
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const entrez = state.entrez
  return {
    search_results: entrez.search_results,
    toolName: entrez.toolName,
    database: entrez.database,
    api_key: entrez.api_key,
    email: entrez.email
  }
}

const ConnectedEntrezEnhanced = connect(mapStateToProps)(EntrezEnhanced)
const ConnectedEntrezDataGrid = connect(mapStateToProps)(EntrezDataGrid)

const Entrez = (props) => {
  return (
    <div>
      { !props.search_results.length
        ?
        <ConnectedEntrezEnhanced />
        :
        <ConnectedEntrezDataGrid />
      }
    </div>
  )
}

export default connect(mapStateToProps)(Entrez)

