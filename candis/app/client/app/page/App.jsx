import React        from 'react'
import { connect }  from 'react-redux'

import MenuBar      from '../component/MenuBar'
import ToolBox      from '../component/widget/toolbox/ToolBox'
import Canvas       from '../component/widget/Canvas'
import Dialog       from '../component/dialog/Dialog'

import { refreshResource } from '../action/AsynchronousAction'

import Menus        from '../meta/Menus'
import Compartments from '../meta/Compartments'

class App extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount ( ) {
    this.props.dispatch(refreshResource)
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
              <Canvas/>
            </div>
          </div>
        </div>
        <Dialog/>
      </div>
    )
  }
}

export default connect()(App)
