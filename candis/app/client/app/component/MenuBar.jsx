import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import shortid     from 'shortid'

import Media       from './widget/Media'
import { getBSTTProps } from '../util'

class MenuBar extends React.Component {
  constructor (props) {
    super (props)

    this.ID = props.ID ? props.ID : shortid.generate()
  }

  render ( ) {
    return (
      <div className="navbar navbar-default" id={`menubar-${this.ID}`}>
        <div className="container">
          <div className="navbar-header">
            <button className="collpased navbar-toggle"
              data-toggle="collapse"
              data-target={`#menubar-${this.ID}-collapse`}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div id={`menubar-${this.ID}-collapse`} className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {
                this.props.menus.map((menu, index) => {
                  return (
                    <MenuBar.Menu key={index} {...menu}/>
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
        <a href="javascript:void(0);" className="dropdown-toggle"
          data-toggle="dropdown">
          {this.props.title}
        </a>
        <ul className="dropdown-menu">
          {
            this.props.actions.map((action, index) => {
              const ttprops = getBSTTProps(action.tooltip)

              return (
                <li key={index} {...ttprops}>
                  <a href="javascript:void(0);" onClick={() => {
                      this.props.dispatch(action.onClick)
                    }}>
                    <Media title={action.text} icon={action.icon}/>
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

MenuBar.Menu.propTypes =
{
    title: PropTypes.string.isRequired,
  actions:  PropTypes.array.isRequired
}

MenuBar.Menu           = connect()(MenuBar.Menu)

MenuBar.propTypes      = { menus: PropTypes.array }
MenuBar.defaultPRops   = { menus: [ ] }

export default MenuBar
