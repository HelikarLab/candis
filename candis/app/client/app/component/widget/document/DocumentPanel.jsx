import React     from 'react'
import PropTypes from 'prop-types'

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
                      <a href="javascript:void(0);">
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
                props.documents.map((dokument, idnex) => {
                  return (
                    <div className="tab-pane">

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

DocumentPanel.propTypes    = { documents: PropTypes.array }
DocumentPanel.defaultProps = { documents: [ ] }

export default DocumentPanel