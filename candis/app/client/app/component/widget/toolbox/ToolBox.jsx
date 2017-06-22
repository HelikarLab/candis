import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import shortid     from 'shortid'

import TypeAhead   from '../TypeAhead'
import Compartment from './Compartment'
import TipView     from './TipView'

class ToolBox extends React.Component {
  constructor (props) {
    super (props)

    this.ID         = props.ID ? props.ID : shortid.generate()

    this.onSelect   = this.onSelect.bind(this)
  }

  onSelect (data) {

  }

  render ( ) {
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
                <a href={`#toolbox-${this.ID}-collapse`} data-toggle="collapse">
                  <span className="fa fa-fw fa-minus" data-toggle="tooltip"
                    title="Minimize"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id={`toolbox-${this.ID}-collapse`} className="collapse panel-collapse in">
          <div className="panel-body">
            <div className="panel-group no-margin" id={`toolbox-${this.ID}`}>
              <TypeAhead placeholder="Search tool" data={[ ]}
                maximum={4} onSelect={this.onSelect}/>
              {
                this.props.compartments.map((compartment, index) => {
                  return (
                    <Compartment key={index} parent={`toolbox-${this.ID}`}
                       {...compartment}/>
                  )
                })
              }
            </div>
          </div>

          <div className="panel panel-default no-margin no-shadow no-border-left no-border-right no-border-bottom">
            <div id={`toolbox-${this.ID}-tipview-collapse`} className="collapse panel-collapse in">
              <div className="panel-body">
                {
                  this.props.activeTool ?
                    <TipView
                        title={this.props.activeTool.name}
                      content={this.props.activeTool.description ?
                                this.props.activeTool.description : this.props.activeTool.tooltip
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
                  data-target={`#toolbox-${this.ID}-tipview-collapse`}>
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

ToolBox.propTypes         = { title: PropTypes.string }
ToolBox.defaultProps      = { title: "" }

const mapStateToProps     = (state) => {
  const toolBox           = state.toolBox

  return {
    activeTool: toolBox.activeTool
  }
}

export default connect(mapStateToProps)(ToolBox)
