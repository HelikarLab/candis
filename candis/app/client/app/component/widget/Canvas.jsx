import React     from 'react'
import XEditable from './XEditable'

class Canvas extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)

    this.state    = Canvas.defaultStates
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render ( ) {
    const that = this

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <XEditable
              value={this.state.title}
              onChange={(value) => {
                that.setState({
                  title: value
                })
              }}/>
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
