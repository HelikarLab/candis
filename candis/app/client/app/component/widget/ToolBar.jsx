import React      from 'react'
import PropTypes  from 'prop-types'
import classNames from 'classnames'

import { getBSTTProps } from '../../util'

class ToolBar extends React.Component {
  render ( ) {
    const props = this.props

    return props.tools.length ?
      (
        <ul className={classNames("list-inline", props.classNames.root)}>
          {
            props.tools.map((tool, index) => {
              const ttattrs = getBSTTProps(tool.tooltip)

              return (
                <li key={index} {...ttattrs}>
                  <a href="javascript:void(0);">
                    <img src={tool.icon} width="24"/>
                  </a>
                </li>
              )
            })
          }
        </ul>
      ) : null
  }
}

ToolBar.propTypes    = { tools: PropTypes.array, classNames: PropTypes.object }
ToolBar.defaultProps = { tools: [ ], classNames: { } }

export default ToolBar
