import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { dateRangePicker } from 'react-dates'
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
                        <label>Email</label>
                        <Field type="email" name="email" placeholder="Email"/>
                        <hr/>
                        <label>Tool Name</label>
                        <Field type="text" name="toolName" placeholder="Tool Name"/>
                        <hr/>
                        <label>Database</label>
                        <Field type="text" name="database" placeholder="Database Name"/>
                        <hr/>
                        <label>Term</label>
                        <Field type="text" name="term" placeholder="Term"/>
                        <hr/>
                        <label>Use history?</label>
                        <Field type="checkbox" name="useHistory" checked={props.values.useHistory}/>
                        <hr/>
                        <label>Choose Dates of publication</label>
                        <dateRangePicker
                            startDate={undefined}
                            endDate={undefined}
                            startDateId='1'
                            endDateId='2'
                        />
                        <hr/>
                        <button>Search</button>
                    </Form>
                
                </div>
            </div>
        )
    }

}

const Entrez = withFormik({
    mapPropsToValues({ email, toolName, database, term, useHistory }){
        return {
            email: email || '',
            toolName: toolName || '',
            database: database || 'pubmed',
            term: term || 'asthma',
            useHistory: useHistory || false
        }
    },
    handleSubmit(values) {
        console.log(values)
    }
})(EntrezBasic)

export default Entrez
