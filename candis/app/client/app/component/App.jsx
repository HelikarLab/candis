import React           from 'react'

import config          from '../config'

import AppBar          from './AppBar'
import MenuBar         from './MenuBar'
import ToolBox         from './widget/toolbox/ToolBox'
import DocumentPanel   from './widget/document/DocumentPanel'

import Menus           from '../meta/Menus'
import Compartments    from '../meta/Compartments'

class App extends React.Component {
  render ( ) {
    return (
      <div>
        <AppBar image={`${config.routes.images}/logo.png`} classNames={{ root: ["no-border-bottom", "no-margin"] }}/>
        <MenuBar menus={Menus}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <ToolBox title="Tool Box" compartments={Compartments}/>
            </div>
            <div className="col-sm-9">
              <DocumentPanel/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
