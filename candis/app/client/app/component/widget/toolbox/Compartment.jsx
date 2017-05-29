import React   from 'react'
import shortid from 'shortid'

import Tool    from './Tool'

class Compartment extends React.Component {
  constructor ( ) {
    super ( )

    this.id = shortid.generate()
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
      <div className="panel panel-default" {...ttattrs}>
          <div className="panel-heading">
            <a className="collapsed" data-toggle="collapse"
              data-parent={`#${this.props.parent}`}
              href={`#compartment-${this.id}`}>
              <div className="media">
                <div className="media-left">
                  <img className="media-object"width="20px" height="20px"
                    src={this.props.icon}/>
                </div>
                <div className="media-body">
                  <div className="media-heading no-margin">
                    {this.props.name}
                  </div>
                </div>
              </div>
            </a>
          </div>
        <div className="collapse panel-collapse"
          id={`compartment-${this.id}`}>
          <div className="list-group">
            {
              this.props.tools.map((tool, index) => {
                return (
                  <div className="list-group-item" key={index}>
                    <Tool
                      name={tool.name}
                      icon={tool.icon}
                      tooltip={tool.description}>
                    </Tool>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Compartment
