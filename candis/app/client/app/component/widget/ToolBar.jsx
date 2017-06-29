import React     from 'react'
import PropTypes from 'prop-types'

class ToolBar extends React.Component {
  render ( ) {
    const tools = this.props.tools

    return tools && tools.length ?
      (
        <div className="btn-toolbar">
          {
            tools.map((tool, index) => {
              return (
                <button key={index} className="btn no-background no-border no-shadow">
                  {
                    tool.icon ?
                      <img src={tool.icon} width="20"/> : false
                  }
                </button>
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
