import React     from 'react'
import PropTypes from 'prop-types'
import shortid   from 'shortid'

class ContextMenu extends React.Component {
  render ( ) {
    const props = this.props

    return props.menus.length ?
      (
        <div id={props.ID}>
          
        </div>
      ) : null
  }
}

ContextMenu.propTypes    = { ID: PropTypes.string,   menus: PropTypes.array  }
ContextMenu.defaultProps = { ID: shortid.generate(), menus: [ ] }

export default ContextMenu
