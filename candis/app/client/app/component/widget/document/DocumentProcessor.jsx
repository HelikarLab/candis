import React         from 'react'
import PropTypes     from 'prop-types'
import { connect }   from 'react-redux'
import classNames    from 'classnames'

import axios         from 'axios'

import ToolBar       from '../ToolBar'
import DocumentPanel from './DocumentPanel'
import { read }      from '../../../action/AsynchronousAction'
import { setActiveDocument } from '../../../action/DocumentProcessorAction'
import PipelineEditor from '../PipelineEditor'
import pipeline      from '../../../action/PipelineAction'
import Media from '../Media'
import Pipeline from '../../../constant/Pipeline'

class DocumentProcessor extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    
  }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props
    if ( props.errors.length ) 
    {
      props.errors.forEach((err) => {
        bootbox.alert({
          message: `<div class="font-bold">${err.message}</div>`,
             size: "small",
          animate: false,
          buttons: { ok: { label: "Ok", className: "btn-sm btn-primary" } }
        })
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
            bootbox.alert({
              message: '<div class="font-bold">No Active Pipeline</div>',
                 size: "small",
              animate: false,
              buttons: { ok: { label: "Ok", className: "btn-sm btn-primary" } }
            })
          }
        }
      },
      // {
      //      name: 'Pause',
      //    faicon: 'pause',
      //   tooltip: 'Pause the currently active pipeline',
      //   onClick: (dispatch) => {
      //     if ( props.active )
      //     {
      //       // const output = props.active.output
      //       // const action = pipeline.run(output)
      //       // props.dispatch(action)
      //     } else
      //     {
      //       bootbox.alert({
      //         message: '<div class="font-bold">No Active Pipeline</div>',
      //            size: "small",
      //         animate: false,
      //         buttons: { ok: { label: "Ok", className: "btn-sm btn-primary" } }
      //       })
      //     }
      //   }
      // },
      // {
      //      name: 'Stop',
      //    faicon: 'stop',
      //   tooltip: 'Stop the currently active pipeline',
      //   onClick: () => {
      //     if ( props.active )
      //     {
      //       // const output = props.active.output
      //       // const action = pipeline.run(output)
      //       // props.dispatch(action)
      //     } else
      //     {
      //       bootbox.alert({
      //         message: '<div class="font-bold">No Active Pipeline</div>',
      //            size: "small",
      //         animate: false,
      //         buttons: { ok: { label: "Ok", className: "btn-sm btn-primary" } }
      //       })
      //     }
      //   }
      // }
    ]

    return (
      <div>
        {
          props.runningLog ?
            <div className="panel panel-default no-border no-shadow no-background">
              <div className="panel-body">
                <ul className="list-group">
                  {
                    props.runningLog.map((node, index) => {
                      return (
                        <li key={index} className={classNames("list-group-item", 
                          {  "list-group-item-danger": node.status == Pipeline.Status.RESOURCE_REQUIRED },
                          { "list-group-item-warning": node.status == Pipeline.Status.RESOURCE_READY },
                          { "list-group-item-success": node.status == Pipeline.Status.COMPLETE }
                        )}>
                          <div>
                            <Media
                              title={node.name}
                               icon={node.icon}
                               body={node.label}/>
                            {
                              node.status == Pipeline.Status.RUNNING ?
                                <div className="progress progress-striped active no-padding">
                                  <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}>
                                  </div>
                                </div> : null
                            }
                            {
                              node.log ?
                                <small>
                                  {node.log}
                                </small> : null
                            }
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div> : null
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
  const runningLog             = documentProcessor.runningLog

  return { documents: documents, active: active, errors: errors, running: running, runningLog: runningLog }
}

export default connect(mapStateToProps)(DocumentProcessor)
