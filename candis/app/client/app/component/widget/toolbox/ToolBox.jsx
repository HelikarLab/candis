import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import shortid     from 'shortid'

import TypeAhead   from '../TypeAhead'
import Compartment from './Compartment'
import TipView     from './TipView'

import { insertTool, onHoverTool } from '../../../action/ToolBoxAction'

class ToolBox extends React.Component {
  constructor (props) {
    super (props)
  }

  componentWillMount ( ) {
    this.props.compartments.forEach((_, index) => {
      let compartment  = this.props.compartments[index]
      compartment.ID   = `compartment-${shortid.generate()}`

      if ( compartment.tools ) {
        compartment.tools.forEach((object) => {
          const tool   = {...object, compartmentID: compartment.ID,
            compartmentName: compartment.name }
          const action = insertTool(tool)

          this.props.dispatch(action)
        })
      }

      if ( compartment.fetcher ) {
        compartment.fetcher().then((tools) => {
          tools.forEach((object) => {
            const tool   = {...object, compartmentID: compartment.ID,
              compartmentName: compartment.name }
            const action = insertTool(tool)

            this.props.dispatch(action)
          })
        })
      }
    })
  }

  render ( ) {
    const activeTool = this.props.activeTool
    const tools      = this.props.tools

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-8">
              <div className="panel-title font-bold">
                {this.props.title}
              </div>
            </div>
            <div className="col-xs-4">
              <div className="text-right">
                <a href={`#toolbox-${this.props.ID}-collapse`} data-toggle="collapse">
                  <span className="fa fa-fw fa-minus" data-toggle="tooltip"
                    title="Minimize"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id={`toolbox-${this.props.ID}-collapse`} className="collapse panel-collapse in">
          <div className="panel-body">
            <div className="panel-group no-margin" id={`toolbox-${this.props.ID}`}>
              <TypeAhead
                    placeholder="Search tool"
                           data={this.props.tools}
                           keys={["name", "tooltip", "description", "compartmentName"]}
                        maximum={4}
                    onMouseOver={(tool) => {
                      this.props.dispatch(onHoverTool(tool))
                    }}
                    onMouseOut ={(tool) => {
                      this.props.dispatch(onHoverTool(null))
                    }}

                       onSelect={(tool) => {
                         this.props.dispatch(tool.onClick)
                       }}
                            map={{
                              title: "name",
                               body: "compartmentName",
                               icon: "icon"
                            }}/>
              {
                this.props.compartments.map((compartment, index) => {
                  return (
                    <Compartment
                          key={index}
                           ID={compartment.ID}
                         name={compartment.name}
                         icon={compartment.icon}
                      tooltip={compartment.tooltip}
                       parent={`toolbox-${this.props.ID}`}/>
                  )
                })
              }
            </div>
          </div>
          <div className="panel panel-default no-margin no-shadow no-border-left no-border-right no-border-bottom">
            <div id={`toolbox-${this.props.ID}-tipview-collapse`} className="collapse panel-collapse in">
              <div className="panel-body">
                {
                  activeTool ?
                    <TipView
                        title={activeTool.name}
                      content={activeTool.description ?
                                activeTool.description : activeTool.tooltip
                              }/> : false
                }
              </div>
            </div>
          </div>

          <div className="panel-footer">
            {/* Quick Tools ToolBar */}
            <div className="btn-group btn-group-sm">
              <div data-toggle="tooltip" data-placement="top" title="Toggle Help">
                <button className="btn btn-sm btn-primary" data-toggle="collapse"
                  data-target={`#toolbox-${this.props.ID}-tipview-collapse`}>
                  <i className="fa fa-fw fa-question-circle-o"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ToolBox.propTypes         =
{
            ID: PropTypes.string,
         title: PropTypes.string,
  compartments: PropTypes.array
}
ToolBox.defaultProps      =
{
            ID: shortid.generate(),
         title: "",
  compartments: [ ]
}

const mapStateToProps     = (state) => {
  const toolBox           = state.toolBox

  return {
         tools: toolBox.tools,
    activeTool: toolBox.activeTool
  }
}

export default connect(mapStateToProps)(ToolBox)
