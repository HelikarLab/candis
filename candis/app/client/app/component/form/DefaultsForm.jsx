import React from "react"
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from "prop-types"
import ReactDataGrid  from 'react-data-grid'
import classNames from "classnames"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

import config from '../../config'

const DefaultsBasic = props => {
  return(
    <div className="container-fluid">
      <Form>
        <div className="slidecontainer">
          <Field type="range" min="1" max="100" value="70" className="slider" name="trainPercent"/>
        </div>
      </Form>
    </div>
  )
}

const DefaultsEnhanced = withFormik({
  mapPropsToValues: (props) => ({
    trainPercent: props.trainPercent || ""
  })
})(DefaultsBasic)
