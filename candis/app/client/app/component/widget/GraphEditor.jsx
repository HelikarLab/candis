import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import classNames  from 'classnames'
import randomColor from 'randomcolor'

class GraphEditor extends React.Component {
  render ( ) {
    const props = this.props
    const graph = props.graph

    return graph ?
      (
        <div className={classNames("panel panel-default", props.classNames.root)}>
          <div className="panel-body" style={{ minHeight: '100vh' }}>
            {
              graph.nodes().map((ID) => {
                var node = graph.node(ID)

                return (
                  <a href="javascript:void(0);" onDoubleClick={() => {
                    props.dispatch(node.onClick)
                  }}>
                    <h4 className="no-margin">
                      <span className="label label-default">
                        {node.label}
                      </span>
                    </h4>
                  </a>
                )
              })
            }
          </div>
        </div>
      ) : null
  }
}

GraphEditor.propTypes    =
{
       graph: PropTypes.object,
  classNames: PropTypes.object
}
GraphEditor.defaultProps = 
{
       graph: null,
  classNames: { }
}

export default connect()(GraphEditor)