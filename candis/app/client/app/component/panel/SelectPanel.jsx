import React           from 'react'
import Select          from 'react-select'
import ReactDataGrid   from 'react-data-grid'
import { connect }     from 'react-redux'
import classNames      from 'classnames'

import axios           from 'axios'

import config          from '../../config'
import FileFormat      from '../../constant/FileFormat'
import { filterFiles } from '../../util'
import { getResource } from '../../action/AsynchronousAction'

class SelectPanel extends React.Component {
  constructor (props) {
    super (props)

    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.state    = SelectPanel.defaultStates
  }

  onChange (value) {
    this.setState({
      select: value
    })

    const data = JSON.parse(value.value)

    this.setState({
      description: data.description
    })

    setTimeout(function ( ) {
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJax"]);
    }, 1000)

    
  }

  onSelect ( ) {
    this.props.dispatch(this.props.onSelect)
  }

  onCancel ( ) {
    this.props.dispatch(this.props.onCancel)
  }

  render ( ) {
    const that    = this
    const options = that.props.options.map((option) => {
      return { label: option.name,
        value: `{"description": "${option.description}"}` }
    })

    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          <div className="form-group">
            <Select
                options={options}
                   name="select"
                  value={this.state.select}
               onChange={this.onChange}
              clearable={false}/>
          </div>{/* minimal padding */}
          <div id="MathJax" className="text-justify">
            {
              this.state.description
            }
          </div>
        </div>
        <div className={classNames("panel-footer", this.props.classNames.footer)}>
          <div className="text-right">
            <div className="btn-group">
              <button className="btn btn-primary" onClick={this.onSelect}>
                <div className="text-uppercase font-bold">
                  Select
                </div>
              </button>
              <button className="btn btn-default" onClick={this.onCancel}>
                <div className="text-uppercase font-bold">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SelectPanel.defaultStates =
{
  select: { },
  description: ""
}

export default connect()(SelectPanel)