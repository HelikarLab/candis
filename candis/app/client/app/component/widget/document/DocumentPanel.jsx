import React       from 'react'
import PropTypes   from 'prop-types'
import classNames  from 'classnames'

import TabBar      from '../../TabBar'

class DocumentPanel extends React.Component {
  constructor (props) {
    super (props)

    this.contextmenu  = [ ]
  }

  render ( ) {
    const props       = this.props

    const tabs        = props.documents.map((dokument) => {
      const ID        = dokument.ID
      const title     = dokument.name.split('.')[0]
      const active    = props.active == ID

      return { ID: ID, title: title, active: active }
    })
    const active      = props.documents.filter((dokument) => {
      return props.active == dokument.ID
    })[0]

    return props.documents.length ?
      (
        <div className="panel panel-default">
          <div className="panel-heading">
            <TabBar tabs={tabs} menu={this.contextmenu} onClick={(tab) => {
              const dokument = props.documents.filter((dokument) => {
                return dokument.ID == tab.ID
              })[0]

              props.onActive(dokument)
            }}/>
          </div>
          <div className="panel-body">
            {
              
            }
          </div>
        </div>
      ) : null
  }
}

DocumentPanel.propTypes     = { documents: PropTypes.array }
DocumentPanel.defaultProps  = { documents: [ ] }

export default DocumentPanel