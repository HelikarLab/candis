import React       from 'react'
import { connect } from 'react-redux'
import classNames   from 'classnames'

class GraphEditor extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    jsPlumb.ready(() => {
      jsPlumb.draggable($('.node'))
    })
  }

  render ( ) {
    const graph = this.props.graph

    return (
      <div className={classNames("panel panel-default no-border no-shadow no-background")}>
        <div className="panel-body" style={{ height: "100vh" }}>
          {
            graph.nodes().map((ID, index) => {
              let meta = graph.node(ID)

              return (
                <a className="node" id={`node-${ID}`} key={index} href="javascript:void(0);" onClick={() => {
                    this.props.dispatch(meta.onClick)
                  }} style={{position: "absolute"}}>
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
  const graphEditor = state.graphEditor

  return {
    graph: graphEditor.graph
  }
}

export default connect(mapStateToProps)(GraphEditor)