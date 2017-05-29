import React from 'react'

class Canvas extends React.Component {
  render ( ) {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <svg className="canvas"></svg>
        </div>
      </div>
    )
  }
}

export default Canvas
