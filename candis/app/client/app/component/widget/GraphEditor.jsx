import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import { Graph }    from 'graphlib'

class GraphEditor extends React.Component {
  render ( ) {
    const props = this.props

    return null
  }
}

GraphEditor.propTypes    = { graph: PropTypes.object }
GraphEditor.defaultProps = { graph: new Graph({ multigraph: true }) }

const mapStateToProps    = (state, props) => {
	const graphEditor    = state.graphEditor

	return {
		graph: graphEditor.graph
	}
}

export default connect(mapStateToProps)(GraphEditor)