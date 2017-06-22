import React           from 'react'

import AppBar          from '../component/AppBar'
import MenuBar         from '../component/MenuBar'
import ToolBox         from '../component/widget/toolbox/ToolBox'
import FlowGraphEditor from '../component/widget/FlowGraphEditor'
import Dialog          from '../component/dialog/Dialog'

import Menus           from '../meta/Menus'

class App extends React.Component {
  constructor (props) {
    super (props)
  }

  render ( ) {
    return (
      <div>
        <AppBar className="no-margin no-border"/>
        <MenuBar menus={Menus}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ToolBox title="Tool Box" draggable={true}/>
            </div>
            <div className="col-md-9">
              <FlowGraphEditor/>
            </div>
          </div>
        </div>
        <Dialog/>
      </div>
    )
  }
}

export default App
