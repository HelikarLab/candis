import React             from 'react'
import { connect }       from 'react-redux'

import config            from '../config'

import AppBar            from './AppBar'
import MenuBar           from './MenuBar'
import ToolBox           from './widget/toolbox/ToolBox'
import DocumentProcessor from './widget/document/DocumentProcessor'
import { getResource }   from '../action/AsynchronousAction'
import Dialog            from './dialog/Dialog'

import Menus             from '../meta/Menus'
import Compartments      from '../meta/Compartments'

class App extends React.Component {
  componentWillMount ( ) {
    this.props.dispatch(getResource)
  }

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
              <DocumentProcessor/>
            </div>
          </div>
        </div>
        <Dialog/>
      </div>
    )
  }
}

export default connect()(App)
