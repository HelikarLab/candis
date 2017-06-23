import React           from 'react'

import config          from '../../../config'

import XEditable       from '../XEditable'
import ToolBar         from '../ToolBar'
import FlowGraphEditor from '../FlowGraphEditor'

class DocumentEditor extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)

    this.tools    = [
      {
           name: 'Capture',
           icon: `${config.routes.icons}/photo-camera.png`,
        tooltip: 'Capture Flow Graph'
      }
    ]

    this.state    = DocumentEditor.defaultStates
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render ( ) {
    const that = this

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <XEditable
              value={this.state.title}
              onChange={(value) => {
                that.setState({
                  title: value
                })
              }}/>
          </div>
        </div>
        <div className="panel-body">
          <ToolBar/>
          <FlowGraphEditor
            classNames={{
              root: ["no-margin"]
            }}
            tools={this.tools}/>
        </div>
      </div>
    )
  }
}

DocumentEditor.defaultStates = { title: "Untitled document" }

export default DocumentEditor
