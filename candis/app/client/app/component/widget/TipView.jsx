import React from 'react'

class TipView extends React.Component {
  render ( ) {
    return (
      <div className="panel panel-default no-margin">
        <div className="panel-body">
          <h5 className="font-bold">
            {this.props.title}
          </h5>
          <p className="text-justify">
            {this.props.content}
          </p>
        </div>
      </div>
    )
  }
}

export default TipView
