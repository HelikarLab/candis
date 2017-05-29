import React       from 'react'
import shortid     from 'shortid'

import TypeAhead   from '../TypeAhead'
import Compartment from './Compartment'
import TipView     from '../TipView'

class ToolBox extends React.Component {
  constructor ( ) {
    super ( )

    this.id    = shortid.generate()
    this.state = ToolBox.defaultStates
  }

  render ( ) {
    let data   = [ ]
    this.props.compartments.forEach((compartment) => {
      compartment.tools.forEach((tool) => {
        data.push({
            title: tool.name,
             icon: tool.icon,
          content: tool.description
        })
      })
    })

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <a href={`#toolbox-${this.id}-collapse`} className="collapsed"
              data-toggle="collapse">
              <div className="col-xs-9">
                <div className="panel-title font-bold">
                  {this.props.title}
                </div>
              </div>
            </a>
            {
              this.props.draggable ?
                <div className="col-xs-3">
                  <div className="text-right">
                    <a href="#">
                      <i className="fa fa-fw fa-arrows"></i>
                    </a>
                  </div>
                </div> : false
            }
          </div>
        </div>
        <div id={`toolbox-${this.id}-collapse`} className="collapse panel-collapse in">
          <div className="panel-body">
            <div className="panel-group no-margin" id={`toolbox-${this.id}`}>
              <TypeAhead placeholder="Search tool" data={data}
                maximum={4}/>
              {
                this.props.compartments.map((compartment, index) => {
                  return (
                    <Compartment
                      key={index}
                      name={compartment.name}
                      tooltip={compartment.tooltip}
                      icon={compartment.icon}
                      tools={compartment.tools}
                      parent={`toolbox-${this.id}`}/>
                  )
                })
              }
            </div>
          </div>
          {
            this.state.tooltip ?
            <div className="panel-footer">
              <TipView
                tip={this.state.tooltip}/>
            </div> : false
          }
        </div>
      </div>
    )
  }
}

ToolBox.defaultStates =
{
    tooltip: null
}

ToolBox.defaultProps  =
{
      title: "",
  draggable: false
}

export default ToolBox
