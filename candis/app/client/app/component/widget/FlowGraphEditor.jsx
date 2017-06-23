import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

class FlowGraphEditor extends React.Component {
  componentDidMount ( ) {
    this.props.graph.nodes().map((ID) => {
      jsplumb.ready(() => {
        jsplumb.draggable(`node-${ID}`)
      })
    })
  }

  render ( ) {
    const graph = this.props.graph

    return (
      <div className={classNames("panel panel-default", this.props.classNames.root)}>
        <div className="panel-body">
          {
            graph.nodes().map((ID, index) => {
              let meta = graph.node(ID)
              meta     = JSON.parse(meta)

              return (
                <a id={`node-${ID}`} key={index} href="javascript:void(0);"
                  onClick={() => {
                    this.props.dispatch(meta.onClick)
                  }}>
                  <span>
                    <h2 className="no-margin">
                      <span className="label label-default">
                        {meta.label}
                      </span>
                    </h2>
                  </span>
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps   = (state) => {
  const flowGraphEditor = state.flowGraphEditor

  return {
    graph: flowGraphEditor.graph
  }
}

export default connect(mapStateToProps)(FlowGraphEditor)
