import React       from 'react'
import PropTypes   from 'prop-types'
import classNames  from 'classnames'

import GraphEditor from '../GraphEditor'

class DocumentPanel extends React.Component {
  render ( ) {
    const props = this.props

    return props.documents.length ?
      (
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="nav nav-pills">
              {
                props.documents.map((dokument, index) => {
                  const title = dokument.name.split('.')[0]

                  return (
                    <li key={index}>
                      <a href={`#document-${dokument.ID}`} data-toggle="tab">
                        {title}
                      </a>
                    </li>
                  )
                })
              }
            </div>
          </div>
          <div className="panel-body">
            <div className="tab-content">
              {
                props.documents.map((dokument, index) => {
                  return (
                    <div key={index} className="tab-pane" id={`#document-${dokument.ID}`}>
                      <GraphEditor/>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      ) : null
  }
}

DocumentPanel.propTypes     = { documents: PropTypes.array }
DocumentPanel.defaultProps  = { documents: [ ] }

export default DocumentPanel