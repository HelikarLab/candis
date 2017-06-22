import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'
import shortid     from 'shortid'

import Tool        from './Tool'

class Compartment extends React.Component {
  constructor (props) {
    super (props)

    this.id    = shortid.generate()
    this.state = {
      tools: props.tools
    }
  }

  render ( ) {
    const that    = this

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
          <div className="row">
            <div className="col-xs-8">
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
            </div>
            <div className="col-xs-4">
              <div className="text-right">
                {
                  this.props.fetcher ?
                    <a href="javascript:void(0);" onClick={() => {
                        that.props.fetcher().then((tools) => {
                          that.setState({
                            tools: tools
                          })
                        })
                      }}>
                      <span className="fa fa-fw fa-refresh" data-toggle="tooltip"
                        title="Refresh"></span>
                    </a> : false
                }
                <a data-toggle="collapse"
                  data-parent={`#${this.props.parent}`}
                  href={`#compartment-${this.id}`}>
                  <span className="fa fa-fw fa-chevron-down" data-toggle="tooltip"
                    title="Expand"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames("collapse panel-collapse", {"in": this.props.active})}
          id={`compartment-${this.id}`}>
          {
            this.state.tools.length ?
              <div className="list-group"
                style={{
                  maxHeight: '150px',
                  overflowY: 'scroll'
                }}>
                {

                  this.state.tools.map((tool, index) => {
                    return (
                      <div className="list-group-item" key={index}>
                        <Tool
                          name={tool.name}
                          icon={tool.icon}
                          tooltip={tool.description}
                          onClick={tool.onClick}
                          onMouseOver={() => {
                            const action = onHoverTool(tool)

                            this.props.dispatch(action)
                          }}>
                        </Tool>
                      </div>
                    )
                  })
                }
              </div> :
              <div className="panel-body">
                No tools found.
              </div>
            }
        </div>
      </div>
    )
  }
}

export default connect()(Compartment)
