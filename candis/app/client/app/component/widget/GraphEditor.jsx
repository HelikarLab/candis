import React       from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames'

class GraphEditor extends React.Component {
  render ( ) {
    const graph = this.props.graph

    return (
      <div className={classNames("panel panel-default")}>
        <div className="panel-body">
          {
            graph.nodes().map((ID, index) => {
              let meta = graph.node(ID)
              meta     = JSON.parse(meta)
              return (
                <a key={index} href="javascript:void(0);" onClick={() => {
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
  const graphEditor = state.graphEditor

  return {
    graph: graphEditor.graph
  }
}

export default connect(mapStateToProps)(GraphEditor)