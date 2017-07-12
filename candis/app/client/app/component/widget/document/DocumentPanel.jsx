import React       from 'react'
import PropTypes   from 'prop-types'
import classNames  from 'classnames'

import TabBar      from '../../TabBar'

class DocumentPanel extends React.Component {
  render ( ) {
    const props       = this.props

    const tabs        = props.documents.map((dokument) => {
      const ID        = `tab-${dokument.ID}$`
      const title     = dokument.name.split('.')[0]

      return { ID: ID, title: title }
    })
    const contextmenu = [ ]

    return props.documents.length ?
      (
        <div className="panel panel-default">
          <div className="panel-heading">
            <TabBar tabs={tabs} menu={contextmenu} onClick={() => {
              
            }}/>
          </div>
          <div className="panel-body">
            
          </div>
        </div>
      ) : null
  }
}

DocumentPanel.propTypes     = { documents: PropTypes.array }
DocumentPanel.defaultProps  = { documents: [ ] }

export default DocumentPanel