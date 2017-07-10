import React     from 'react'
import PropTypes from 'prop-types'

import { getBSTTProps } from '../../util'

class ToolBar extends React.Component {
  render ( ) {
    const props = this.props

    return props.tools.length ?
      (
        <div className="btn-toolbar">
          {
            props.tools.map((tool, index) => {
              const ttprops = getBSTTProps(tool.tooltip)

              return (
                <a key={index} className="btn no-background no-border no-shadow" href="javascript:void(0);" {...ttprops}>
                  {
                    tool.icon ?
                      <img src={tool.icon} width="24"/> : false
                  }
                </a>
              )
            })
          }
        </div>
      ) : null
  }
}

ToolBar.propTypes    =
{
  tools: PropTypes.array
}
ToolBar.defaultProps =
{
  tools: [ ]
}

export default ToolBar
