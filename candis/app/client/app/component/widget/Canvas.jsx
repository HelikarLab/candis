import React from 'react'

class Canvas extends React.Component {
  constructor (props) {
    super (props)

    this.state    = Canvas.defaultStates
  }

  render ( ) {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <a href="#">
              {this.state.title}
            </a>
          </div>
        </div>
        <div className="panel-body">
          <svg className="canvas"></svg>
        </div>
      </div>
    )
  }
}

Canvas.defaultStates =
{
  title: "Untitled document"
}

export default Canvas
