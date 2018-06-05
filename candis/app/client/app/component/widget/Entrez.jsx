import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withFormik, Form, Field } from 'formik'

import * as Yup from 'yup'


const EntrezBasic = (props) => {
    return (
        <div className={classNames("panel panel-default", props.classNames.root)}>
            <div className="panel-body">
                <Form>
                    <div className="row">
                        <div className="col-xs-3">
                            <label>Email</label>
                        </div>
                        <div className="col-xs-6">
                            <Field type="email" name="email"/>
                        </div>
                        <div className="col-xs-3">
                            {props.touched.email && props.errors.email && <small>{props.errors.email}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6">
                            <label>Tool Name</label>
                        </div>
                        <div className="col-xs-6">
                            <Field type="text" name="toolName"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6">
                            <label>API KEY</label>
                        </div>
                        <div className="col-xs-6">
                            <Field type="text" name="api_key"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6">
                            <label>Database</label>
                        </div>
                        <div className="col-xs-6">
                            <Field component="select" name="database">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </Field>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6">
                            <label>Term</label>
                        </div>
                        <div className="col-xs-6">
                            <Field type="text" name="term" placeholder="Term"/>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        {props.touched.term && props.errors.term && <small>{props.errors.term}</small>}
                    </div>
                    <button disabled={props.isSubmitting}>Search</button>
                </Form>
            </div>
        </div>
    )
}



const Entrez = withFormik({
    mapPropsToValues({ email, toolName, database, term, useHistory, api_key }){
        return {
            email: email || '',
            toolName: toolName || '',
            api_key: api_key || '',
            database: database || '2',
            term: term || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is not valid').required('Email is required!'),
        api_key: Yup.string(),
        name: Yup.string(),
        term: Yup.string().required()
    }),
    handleSubmit(values) {
        console.log(values)
    },
    displayName: 'Entrez Form'
})(EntrezBasic)

export default Entrez
