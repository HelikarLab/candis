import React       from 'react'
import PropTypes   from 'prop-types'
import classNames  from 'classnames'

import TabBar      from '../TabBar'
import GraphEditor from '../GraphEditor'

class DocumentPanel extends React.Component {
  constructor (props) {
    super (props)
  }

  render ( ) {
    const props  = this.props

    const active = props.active
    const tabs   = props.documents.map((dokument) => {
      const name = dokument.output.name.split('.')[0]

      return {
            ID: dokument.ID,
         title: name,
        active: active.ID == dokument.ID
      }
    })

    return props.documents.length ?
      (
        <div className="panel panel-default">
          <div className="panel-heading">
            <TabBar
                 tabs={tabs}
              onClick={(tab) => {
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

DocumentPanel.propTypes    = { documents: PropTypes.array, active: PropTypes.object }
DocumentPanel.defaultProps = { documents: [ ], active: null }

export default DocumentPanel