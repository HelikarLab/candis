import React       from 'react'
import { connect } from 'react-redux'
import shortid     from 'shortid'

import Media   from './widget/Media'

class MenuBar extends React.Component {
  constructor ( ) {
    super ( )

    this.ID = shortid.generate()
  }

  render ( ) {
    this.ID = this.props.ID ? this.props.ID : this.ID
    return (
      <div className="navbar navbar-default navbar-fixed-top" id={`menubar-${this.ID}`}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="collpased navbar-toggle"
              data-toggle="collapse"
              data-target={`#menubar-${this.ID}-collapse`}>
              {
                Array(3).fill()
                        .map((_, index) => {
                  return (
                    <span key={index} className="icon-bar"></span>
                  )
                })
              }
            </button>
          </div>
          <div id={`menubar-${this.ID}-collapse`} className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {
                this.props.menus.map((menu, index) => {
                  return (
                    <MenuBar.Menu
                          key={index}
                        title={menu.title}
                      actions={menu.actions}/>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

MenuBar.Menu = class extends React.Component {
  render ( ) {
    return (
      <li className="dropdown">
        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown"
          onClick={this.onClick}>
          {this.props.title}
        </a>
        <ul className="dropdown-menu">
          {
            this.props.actions.map((action, index) => {
              const ttattrs = action.tooltip ?
                {
                     "data-toggle": "tooltip",
                  "data-placement": "top",
                             title: action.tooltip
                } : { }

              return (
                <li key={index} {...ttattrs}>
                  <a href="javascript:void(0);" onClick={() => {
                      this.props.dispatch(action.onClick)
                    }}>
                    <Media
                      heading={action.text}
                         icon={action.icon}/>
                  </a>
                </li>
              )
            })
          }
        </ul>
      </li>
    )
  }
}

MenuBar.Menu = connect()(MenuBar.Menu)

export default MenuBar
