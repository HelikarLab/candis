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

  const rows = {
    "100000096": {
      accession: "GPL96",
      taxon: "Homo sapiens",
      title: "[HG-U133A] Affymetrix Human Genome U133A Array"
    },
    "100000571": {
      accession: "GPL571",
      taxon: "Homo sapiens",
      title: "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array"
    },
    "100004557": {
      accession: "GPL4557",
      taxon: "Homo sapiens",
      title:
        "Affymetrix GeneChip Human Genome U133 Array Set HG-U133A [CDF: Hs133A_Hs_UG_3]"
    },
    "100008289": {
      accession: "GPL8289",
      taxon: "Homo sapiens",
      title:
        "Affymetrix GeneChip Human Genome U133 Array Set HG-U133A based on a custom CDF (GeneAnnot version 1.4.5)"
    },
    "100009021": {
      accession: "GPL9021",
      taxon: "Homo sapiens",
      title: "Affymetrix Human Genome U133A Array [CDF: XLab gahgu133a_2.0.1]"
    },
    "100009741": {
      accession: "GPL9741",
      taxon: "Homo sapiens",
      title: "Affymetrix Human Genome U133A Array [CDF: XLab gahgu133a_1.5.0]"
    },
    "100010553": {
      accession: "GPL10553",
      taxon: "Homo sapiens",
      title:
        "Affymetrix GeneChip Human Genome HG-U133A Custom CDF [ncilpg_U133Agb]"
    },
    "100014663": {
      accession: "GPL14663",
      taxon: "Homo sapiens",
      title:
        "Affymetrix GeneChip Human Genome HG-U133A Custom CDF [Affy_HGU133A_CDF_ENTREZG_10]"
    },
    "100016212": {
      accession: "GPL16212",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A] Affymetrix Human Genome U133A Array [Custom Brainarray v16 ENTREZG CDF]"
    },
    "100017027": {
      accession: "GPL17027",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A] Affymetrix Human Genome U133A Array [hgu133ahsentrezg.cdf]"
    },
    "100017180": {
      accession: "GPL17180",
      taxon: "Homo sapiens",
      title:
        "Affymetrix GeneChip Human Genome U133 Array Set HG-U133A based on a custom CDF (GeneAnnot version 2.1.0)"
    },
    "100017662": {
      accession: "GPL17662",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A] Affymetrix Human Genome U133A Array Custom Brainarray v15 [HGU133A_Hs_ENTREZG_15.0.0]"
    },
    "100018033": {
      accession: "GPL18033",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array [HGU133A2_Hs_ENTREZG_17.0.0]"
    },
    "100018034": {
      accession: "GPL18034",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array [HGU133A2_Hs_ENTREZG_17.1.0]"
    },
    "100018478": {
      accession: "GPL18478",
      taxon: "Homo sapiens",
      title:
        "[HG_U133A 2.0_Hs_ENTREZG_V13] Affymetrix GeneChip  HG_U133 V2.0 Array [Brainarray Entrez Version 13]"
    },
    "100018991": {
      accession: "GPL18991",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array [HGU133A2_Hs_ENTREZG_16.0.0]"
    },
    "100019184": {
      accession: "GPL19184",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A] Affymetrix Human Genome U133A Array [Custom Brainarray v18 ENTREZG CDF]"
    },
    "100022932": {
      accession: "GPL22932",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array (HGU133A2_Hs_ENTREZG_20.0.0)"
    },
    "100023080": {
      accession: "GPL23080",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array (HGU133A2 Hs ENTREZG 19.0.0)"
    },
    "100024120": {
      accession: "GPL24120",
      taxon: "Homo sapiens",
      title:
        "[HG-U133A] Affymetrix Human Genome U133A Array (HGU133A Hs ENTREZG 19.0.0)"
    }
  }

  const rows_data = Object.values(rows)

  const rowGetter = i => {
    return props.search_results[i]
  }

  const onSubmit = (row) => {
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
        rowsCount={rows_data.length}
        enableCellSelect={true}
        enableRowSelect="single"
        onRowSelect={onSubmit}
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

