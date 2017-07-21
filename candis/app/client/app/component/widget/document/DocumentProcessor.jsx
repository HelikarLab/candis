import React         from 'react'
import PropTypes     from 'prop-types'
import { connect }   from 'react-redux'

import axios         from 'axios'

import ToolBar       from '../ToolBar'
import DocumentPanel from './DocumentPanel'
import { setActiveDocument } from '../../../action/DocumentProcessorAction'

class DocumentProcessor extends React.Component {
  constructor (props) {
    super (props)

    this.tools =
    [
      {
           name: 'Run',
         faicon: 'play',
        tooltip: 'Run the currently active pipeline',
        onClick: ( ) => {
          NProgress.set(0.0)

          var dialog = bootbox.dialog({ title: 'Normalizing...' })

          axios.get('/api/run').then(() => {
            console.log('run')

            NProgress.set(1.0)
          })
        }
      },
      {
           name: 'Pause',
         faicon: 'pause',
        tooltip: 'Pause the currently active pipeline',
        onClick: ( ) => {
          
        }
      },
      {
           name: 'Stop',
         faicon: 'stop',
        tooltip: 'Stop the currently active pipeline',
        onClick: ( ) => {
          
        }
      }
    ]
  }

  render ( ) {
    const props = this.props

    return (
      <div>
        <div className="panel panel-default no-shadow">
          <div className="panel-heading">
            <div className="text-center">
              <ToolBar tools={this.tools} classNames={{ root: "no-margin" }}/>
            </div>
          </div>
        </div>
        <DocumentPanel
          documents={props.documents}
             active={props.active}
           onActive={(dokument) => {
              props.dispatch(setActiveDocument(dokument))
           }}/>
      </div>
    )
  }
}

DocumentProcessor.propTypes    = { documents: PropTypes.array }
DocumentProcessor.defaultProps = { documents: [ ] }

const mapStateToProps          = (state, props) => {
  const documentProcessor      = state.documentProcessor
  const documents              = documentProcessor.documents
  const active                 = documentProcessor.active

  return { documents: documents, active: active }
}

export default connect(mapStateToProps)(DocumentProcessor)
