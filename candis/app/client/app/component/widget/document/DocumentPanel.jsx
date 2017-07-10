import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import shortid     from 'shortid'
import classNames  from 'classnames'

import config      from '../../../config'

import ToolBar     from '../ToolBar'
import ContextMenu from '../ContextMenu'

import { removeDocument } from '../../../action/DocumentsAction'

class DocumentPanel extends React.Component {
  constructor (props) {
    super (props)

    this.onClose       = this.onClose.bind(this)
    this.tools         =
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

    this.contextmenus  =
    [

    ]
  }

  onClose (dokument) {
    const dispatch     = this.props.dispatch

    bootbox.confirm({
       message: "Are you sure you want to close this document?",
       buttons:
       {
          cancel: { label: "Cancel", className: "btn-sm btn-primary" },
         confirm: { label: "Close",  className: "btn-sm btn-success" }
       },
          size: "small",
       animate: false,
      callback: (confirm) => {
        if ( confirm ) {
          const action = removeDocument(dokument)

          dispatch(action)
        }
      }
    })
  }

  render ( ) {
    const props        = this.props

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading no-padding">
            <ToolBar tools={this.tools}/>
          </div>
          {
            props.documents.length ?
              <div className="panel-heading">
                <ul className="nav nav-pills">
                  {
                    props.documents.map((dokument, index) => {
                      return (
                        <li key={index}>
                          <a href={`#document-${dokument.ID}`}
                            data-toggle="tab">
                            <span
                              data-toggle="context"
                              data-target={`#contextmenu-${props.ID}`}>
                              {
                                dokument.name.split('.')[0]
                              }
                            </span>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              </div> : false
          }
          {
            props.documents.length ?
              <div className="panel-body">
                {
                  props.documents.map((dokument, index) => {
                    return (
                      <div key={index} className={classNames("tab-pane")} id={`document-${dokument.ID}`}>

                      </div>
                    )
                  })
                }
              </div> : false
          }
        </div>
      </div>
    )
  }
}

DocumentPanel.propTypes    =
{
  ID: PropTypes.string
}
DocumentPanel.defaultProps =
{
  ID: shortid.generate()
}

const mapStateToProps      = (state) => {
  const documents          = state.documents

  return {
    documents: documents.documents
  }
}

export default connect(mapStateToProps)(DocumentPanel)
