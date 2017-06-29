import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import shortid     from 'shortid'
import classNames  from 'classnames'

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
           icon: '//placehold.it/300x300',
        tooltip: ''
      }
    ]
    this.contextmenus  =
    [
      {
        
      }
    ]
  }

  onClose (doc) {
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
          const action = removeDocument(doc)

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
          <div className="panel-heading">
            <ToolBar tools={this.tools}/>
          </div>
          <div className="panel-heading">
            {
              props.documents.length ?
                <ul className="nav nav-pills">
                  {
                    props.documents.map((doc, index) => {
                      return (
                        <li key={index}>
                          <a href={`#document-${doc.ID}`}
                            data-toggle="tab">
                            <span
                              data-toggle="context"
                              data-target={`#contextmenu-${props.ID}`}>
                              {doc.title}
                            </span>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul> : false
            }
          </div>
          <div className="panel-body">
            {
              props.documents.length ?
                props.documents.map((doc, index) => {
                  return (
                    <div key={index} className={classNames("tab-pane")} id={`document-${doc.ID}`}>

                    </div>
                  )
                }) : false
            }
          </div>
        </div>
        <ContextMenu ID={`contextmenu-${props.ID}`} menus={this.contextmenus}/>
      </div>
    )
  }
}

DocumentPanel.propTypes    = { ID: PropTypes.string }
DocumentPanel.defaultProps = { ID: shortid.generate() }

const mapStateToProps      = (state) => {
  const documents          = state.documents

  return {
    documents: documents.documents
  }
}

export default connect(mapStateToProps)(DocumentPanel)
