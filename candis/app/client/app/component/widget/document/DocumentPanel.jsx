import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

import { removeDocument } from '../../../action/DocumentsAction'

class DocumentPanel extends React.Component {
  constructor (props) {
    super (props)

    this.onClose = this.onClose.bind(this)
  }

  onClose (doc) {
    const dispatch = this.props.dispatch

    bootbox.confirm({
       message: "Are you sure you want to close this document?",
       buttons:
       {
          cancel: { label: "Cancel", className: "btn-sm btn-primary" },
         confirm: { label: "Close",  className: "btn-sm btn-success" }
       },
          size: "small",
       animate: false,
      callback: (confirm) => {
        if ( confirm ) {
          const action = removeDocument(doc)

          dispatch(action)
        }
      }
    })
  }

  render ( ) {
    const props = this.props

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {
            props.documents.length ?
              <ul className="nav nav-pills">
                {
                  props.documents.map((doc, index) => {
                    return (
                      <li key={index}>
                        <div className="row">
                          <div className="col-xs-9">
                            <a href={`#document-${doc.ID}`}
                              data-toggle="tab">
                              <div className="text-center">
                                {doc.title}
                              </div>
                            </a>
                          </div>
                          <div className="col-xs-3">
                            <a href="javascript:void(0);" onClick={() => { this.onClose(doc) }}>
                              <i className="fa fa-fw fa-times"></i>
                            </a>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul> : false
          }
        </div>
        <div className="panel-body">
          {
            props.documents.length ?
              props.documents.map((doc, index) => {
                return (
                  <div key={index} className={classNames("tab-pane")} id={`document-${doc.ID}`}>

                  </div>
                )
              }) : false
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const documents     = state.documents

  return {
    documents: documents.documents
  }
}

export default connect(mapStateToProps)(DocumentPanel)
