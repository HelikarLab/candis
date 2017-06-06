import React       from 'react'
import { connect } from 'react-redux'
import shortid     from 'shortid'

import TypeAhead   from '../TypeAhead'
import Compartment from './Compartment'
import TipView     from '../TipView'

class ToolBox extends React.Component {
  constructor ( ) {
    super ( )

    this.onSelect   = this.onSelect.bind(this)

    this.id         = shortid.generate()
    this.tools      = [ ]
    this.state      = ToolBox.defaultStates
  }

  onSelect (data) {
    const tool      = this.tools.find(({ ID }) => {
         return ID == data.ID
    })

    this.props.dispatch(tool.onClick())
  }

  render ( ) {
    let data        = [ ]
    this.props.compartments.forEach((compartment) => {
      compartment.tools.forEach((tool) => {
        const ltool = Object.assign(tool, { ID: shortid.generate() })
        this.tools.push(ltool)

        data.push({
               ID: ltool.ID,
            title: ltool.name,
             icon: ltool.icon,
          content: ltool.description
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
                maximum={4} onSelect={this.onSelect}/>
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

export default connect()(ToolBox)
