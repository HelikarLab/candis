import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

class DocumentPanel extends React.Component {
  render ( ) {
    const documents = this.props.documents

    return (
      <div className="panel panel-default">
        <div className="panel-heading">

        </div>
        <div className="panel-heading">
          {
            documents.length ?
              <ul className="nav nav-pills">
                {
                  documents.map((doc, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={`#document-${doc.ID}`}
                          data-toggle="tab">
                          {doc.title}
                        </a>
                      </li>
                    )
                  })
                }
              </ul> : false
          }
        </div>
        <div className="panel-body">
          {
            documents.length ?
              documents.map((doc, index) => {
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
