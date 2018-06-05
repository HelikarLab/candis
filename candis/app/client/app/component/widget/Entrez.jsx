import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withFormik, Form, Field } from 'formik'

import Yup from 'yup'

class EntrezBasic extends React.Component {
    constructor (props) {
        super(props)
        this.state = undefined
    }


    render() {
        const props = this.props
        return (
            <div className={classNames("panel panel-default", props.classNames.root)}>
                <div className="panel-body">
                
                    <Form>
                        <div className="row">
                            <div className="col-xs-6">
                                <label>Email</label>
                            </div>
                            <div className="col-xs-6">
                                <Field type="email" name="email"/>
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
                                    <ul>
                                    {
                                        props.dbs.map((db) => {
                                            return (
                                                <li>
                                                    {console.log(db)}
                                                    <option value={`${db}`}>{`${db}`}</option>
                                                </li>
                                            )
                                        })    
                                    }
                                    </ul>
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
                        <button>Search</button>
                    
                    </Form>
                
                </div>
            </div>
        )
    }

}

const Entrez = withFormik({
    mapPropsToValues({ email, toolName, database, term, useHistory, api_key }){
        return {
            email: email || '',
            toolName: toolName || '',
            api_key: api_key || '',
            database: database || '',
            term: term || ''
        }
    },
    handleSubmit(values) {
        console.log(values)
    }
})(EntrezBasic)

export default Entrez
