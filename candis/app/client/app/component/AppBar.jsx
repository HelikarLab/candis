import React      from 'react'
import PropTypes  from 'prop-types'

import shortid    from 'shortid'
import classNames from 'classnames'

class AppBar extends React.Component {
  render ( ) {
    const props = this.props
    let   brand = null

    if ( props.image ) {
      brand = (
        <img src={props.image} width="20"/>
      )
    } else if ( props.title ) {
      brand = props.title
    }

    return (
      <nav className={classNames("navbar navbar-default", props.classNames.root)}
        id={`appbar-${props.ID}`}>
        <div className={props.fluid ? "container-fluid" : "container"}>
          <div className="navbar-header">
            {
              brand ?
                <a className="navbar-brand" href="javascript:void(0);">
                  {brand}
                </a> : false
            }
          </div>
        </div>
      </nav>
    )
  }
}

AppBar.propTypes    =
{
         ID: PropTypes.string,
  clasNames: PropTypes.string,
      fluid: PropTypes.bool,
      image: PropTypes.string,
      title: PropTypes.string,
}
AppBar.defaultProps =
{
          ID: shortid.generate(),
  classNames: { },
       fluid: false,
       image: null,
       title: null,
}

export default AppBar
