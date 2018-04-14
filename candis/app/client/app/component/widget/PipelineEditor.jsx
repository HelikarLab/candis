import React      from 'react'
import {connect}  from 'react-redux'
import {SortableContainer} from 'react-sortable-hoc'
import classNames from 'classnames'

import Media      from './Media'

import store from '../../Store'
import Pipeline   from '../../constant/Pipeline'
import { stage }  from '../../action/DocumentProcessorAction'

class PipelineEditor extends React.Component
{
	constructor(props){
		super(props)
		this.onClick = this.onClick.bind(this)
	}

	onClick (stages) {
		console.log("stages", stages)
		const action = {
			payload: {
				data: stages,
				removeID: 'SkyMQc13M'
			},
			type: 'REMOVE_NODE'
		}
		store.dispatch(action)
		console.log('Close this button!')
		console.log(store.getState())
	}
	
	render ( )
	{
		const props = this.props

		return (
			<ul className="list-group">
				{
					props.stages.map((node, index) => {
						return (
							<li key={index} className={classNames("list-group-item",
								{  "list-group-item-danger": node.status == Pipeline.Status.PENDING },
								{ "list-group-item-warning": node.status == Pipeline.Status.READY }
							)}>
								<div>
									<div className="row">
										<div className="col-xs-9">
											<a style={{ color: '#FFF' }} href="javascript:void(0);" onClick={() => {
												console.log({...node})
												if ( node.onClick ) {
													props.dispatch(node.onClick)
												}
											}}>
												<Media
													title={node.name}
													 icon={node.icon}
													 body={node.label}/>
											</a>
										</div>
										<div className="col-xs-3" >
											<button onClick={this.onClick(props.stages)}>&times;</button>
										</div>
									</div>
								</div>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default connect()(PipelineEditor)
