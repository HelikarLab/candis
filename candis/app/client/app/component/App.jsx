import React           from 'react'
import { connect }     from 'react-redux'

import config          from '../config'

import AppBar          from './AppBar'
import MenuBar         from './MenuBar'
import ToolBox         from './widget/toolbox/ToolBox'
import DocumentEditor  from './widget/document/DocumentEditor'
import Dialog          from './dialog/Dialog'

import Menus           from '../meta/Menus'
import Compartments    from '../meta/Compartments'

class App extends React.Component {
  constructor (props) {
    super (props)
  }

  render ( ) {
    return (
      <div>
        <AppBar image={`${config.routes.images}/logo.png`} classNames={{
          root: ["navbar-static-top", "no-margin"]
        }}/>
        <MenuBar classNames={{ root: "navbar-static-top" }} menus={Menus}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <ToolBox title="Tool Box" compartments={Compartments}/>
            </div>
            <div className="col-sm-9">
              <DocumentEditor/>
            </div>
          </div>
        </div>
        <Dialog/>
      </div>
    )
  }
}

export default App
