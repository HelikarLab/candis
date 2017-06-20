import React           from 'react'
import { connect }     from 'react-redux'

import MenuBar         from '../component/MenuBar'
import ToolBox         from '../component/widget/toolbox/ToolBox'
import FlowGraphEditor from '../component/widget/FlowGraphEditor'
import Dialog          from '../component/dialog/Dialog'

import { getResource } from '../action/AsynchronousAction'

import Menus           from '../meta/Menus'
import Compartments    from '../meta/Compartments'

class App extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount ( ) {
    this.props.dispatch(getResource)
  }

  render ( ) {
    return (
      <div>
        <MenuBar
          menus={Menus}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ToolBox title="Tool Box" compartments={Compartments}/>
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

export default connect()(App)
