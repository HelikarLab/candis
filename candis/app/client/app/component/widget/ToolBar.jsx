import React     from 'react'
import PropTypes from 'prop-types'

class ToolBar extends React.Component {
  render ( ) {
    const tools = this.props.tools

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="btn-toolbar">
            {
              tools && tools.length ?
                tools.map((tool, index) => {
                  return (
                    <div key={index}>

                    </div>
                  )
                })
                :
                <div>
                  No tools found.
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

ToolBar.propTypes    =
{
  tools: PropTypes.array
}
ToolBar.defaultProps = { tools: [ ] }

export default ToolBar
