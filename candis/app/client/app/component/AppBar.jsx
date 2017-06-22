import React      from 'react'
import shortid    from 'shortid'
import classNames from 'classnames'

import config     from '../config'

class AppBar extends React.Component {
  constructor (props) {
    super (props)

    this.ID = props.ID ? props.ID : shortid.generate()
  }

  render ( ) {
    return (
      <nav className={classNames("navbar navbar-default", this.props.className)}
        id={`appbar-${this.ID}`}>
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="javascript:void(0);">
              <img src={`${config.routes.images}/logo.png`} height="20"/>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default AppBar
