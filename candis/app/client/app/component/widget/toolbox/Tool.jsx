import React from 'react'
import { connect } from 'react-redux'

class Tool extends React.Component {
  constructor (props) {
    super (props)

    this.onClick  = this.onClick.bind(this)
  }

  onClick (event) {
    this.props.dispatch(this.props.onClick)
  }

  render ( ) {
    const tooltip = this.props.tooltip
    const ttattrs = tooltip ?
      {
           "data-toggle": "tooltip",
        "data-placement": "top",
                   title: tooltip
      } : { }

    return (
      <a href="javascript:void(0);" onClick={this.onClick}>
        <div className="media" {...ttattrs}>
          {
            this.props.icon ?
              <div className="media-left">
                <img className="media-object" width="20px" height="20px"
                  src={this.props.icon}/>
              </div> : false
          }
          <div className="media-body">
            <div className="media-heading no-margin">
              {this.props.name}
            </div>
          </div>
        </div>
      </a>
    )
  }
}

export default connect()(Tool)
