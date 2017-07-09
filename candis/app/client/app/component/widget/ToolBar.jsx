import React     from 'react'
import PropTypes from 'prop-types'

class ToolBar extends React.Component {
  render ( ) {
    const tools = this.props.tools

    return tools && tools.length ?
      (
        <div>
          {
            tools.map((tool, index) => {
              return (
                <a key={index} className="cursor-pointer">
                  {
                    tool.icon ?
                      <img src={tool.icon} width="20"/> : false
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
ToolBar.defaultProps = { tools: [ ] }

export default ToolBar
