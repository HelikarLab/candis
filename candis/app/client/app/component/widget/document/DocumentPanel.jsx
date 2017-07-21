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
    
    const tabs   = props.documents.map((dokument) => {
      const name = dokument.output.name.split('.')[0]

      return {
            ID: dokument.ID,
         title: name,
        active: dokument.active
      }
    })
    const active = props.active

    return props.documents.length ?
      (
        <div className="panel panel-default">
          <div className="panel-heading">
            <TabBar
                 tabs={tabs}
              onClick={(tab)     => {
                const dokument   = props.documents.filter((dokument) => {
                  return tab.ID == dokument.ID
                })[0]

                props.onActive(dokument)
              }}/>
          </div>
          <div className="panel-body">
            {
              active ?
                <GraphEditor
                       graph={active.data}
                  classNames={{ root: ["no-background", "no-border", "no-shadow", "no-margin"] }}/>
                : null
            }
          </div>
        </div>
      ) : null
  }
}

DocumentPanel.propTypes    = 
{
  documents: PropTypes.array,
   onActive: PropTypes.func,
     active: PropTypes.object
}
DocumentPanel.defaultProps =
{
  documents: [ ],
   onActive: (dokument) => { },
     active: null
}

export default DocumentPanel