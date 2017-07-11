import React         from 'react'
import PropTypes     from 'prop-types'
import { connect }   from 'react-redux'

import config        from '../../../config'

import ToolBar       from '../ToolBar'
import DocumentPanel from './DocumentPanel'

class DocumentProcessor extends React.Component {
  constructor (props) {
    super (props)

    this.tools =
    [
      {
           name: 'Run',
           icon: `${config.routes.icons}/play-o.png`,
        tooltip: 'Run the currently active pipeline'
      },
      {
           name: 'Pause',
           icon: `${config.routes.icons}/pause-o.png`,
        tooltip: 'Pause the currently active pipeline'
      },
      {
           name: 'Stop',
           icon: `${config.routes.icons}/stop-o.png`,
        tooltip: 'Stop the currently active pipeline'
      }
    ]
  }

  render ( ) {
    const props = this.props

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="text-center">
              <ToolBar tools={this.tools} classNames={{ root: "no-margin" }}/>
            </div>
          </div>
        </div>
        <DocumentPanel documents={props.documents}/>
      </div>
    )
  }
}

const mapStateToProps     = (state) => {
  const documentProcessor = state.documentProcessor

  return {
    documents: documentProcessor.documents
  }
}

export default connect(mapStateToProps)(DocumentProcessor)
