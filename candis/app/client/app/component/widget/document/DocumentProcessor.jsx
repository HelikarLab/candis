import React         from 'react'
import PropTypes     from 'prop-types'
import { connect }   from 'react-redux'
import classNames    from 'classnames'

import axios         from 'axios'

import ToolBar       from '../ToolBar'
import DocumentPanel from './DocumentPanel'
import { read }      from '../../../action/AsynchronousAction'
import { setActiveDocument } from '../../../action/DocumentProcessorAction'
import pipeline      from '../../../action/PipelineAction'
import Pipeline      from '../../../constant/Pipeline'

class DocumentProcessor extends React.Component {
  componentDidUpdate ( ) {
    const props = this.props
    
    if ( props.errors.length ) 
    {
      props.errors.forEach((err) => {
        toastr.clear()
        toastr.error(err.message, 'Error')
      })
    }

    if ( props.running ) 
    {
      const output = props.active.output
      const action = read(output)

      props.dispatch(action)
    }
  }

  render ( ) {
    const props = this.props
    const tools = 
    [
      {
           name: 'Run',
         faicon: 'play',
        tooltip: 'Run the currently active pipeline',
        onClick: ( ) => {
          if ( props.active )
          {
            const output = props.active.output
            const action = pipeline.run(output)
            props.dispatch(action)
          } else
          {
            toastr.error('No active Pipeline', 'Error')
          }
        }
      }
    ]

    return (
      <div>
        {
          props.status.length ?
            <ul className="list-group">
              {
                status.map((stage, index) => 
                {
                  return (
                    <li key={index} className={classNames("list-group-item", 
                        { "list-group-item-warning": stage.status == Pipeline.Status.READY },
                        { "list-group-item-success": stage.status == Pipeline.Status.COMPLETE }
                      )}>
                      {
                        stage.status == Pipeline.Status.RUNNING ?
                          <div className="progress progress-striped active">
                            <div className="progress-bar" style={{ width: "100%" }}/>
                          </div> : null
                      }
                    </li>
                  )
                })
              }
            </ul> : null
        }
        {
          props.running ?
            null 
            :
            <div>
                <div className="panel panel-default no-shadow">
                  <div className="panel-heading">
                    <div className="text-center">
                      <ToolBar
                             tools={tools}
                        classNames={{ root: "no-margin" }}
                           onClick={(tool) => {
                              tool.onClick()
                           }}/>
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
        }
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
  const errors                 = documentProcessor.errors
  const running                = documentProcessor.running
  const status                 = documentProcessor.status

  return { documents: documents, active: active, errors: errors, running: running, status: status }
}

export default connect(mapStateToProps)(DocumentProcessor)
