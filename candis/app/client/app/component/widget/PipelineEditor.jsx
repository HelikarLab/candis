import React      from 'react'
import {connect}  from 'react-redux'
import {SortableContainer} from 'react-sortable-hoc'
import classNames from 'classnames'

import Media      from './Media'

import Pipeline   from '../../constant/Pipeline'
import { stage }  from '../../action/DocumentProcessorAction'

class PipelineEditor extends React.Component
{
	render ( ) 
	{
		const props = this.props

		const dummy = (
			<a href="javascript:void(0);" onClick={() => {
				const action = stage.remove(node.ID)
				props.dispatch(action)
			}}>
				<div style={{ color: '#FFF' }} className="text-right">
					&times;
				</div>
			</a>
		)

		return (
			<ul className="list-group">
				{
					props.stages.map((node, index) => {
						return (
							<li key={index} className={classNames("list-group-item", 
								{  "list-group-item-danger": node.status == Pipeline.Status.RESOURCE_REQUIRED },
								{ "list-group-item-warning": node.status == Pipeline.Status.RESOURCE_READY },
								{ "list-group-item-success": node.status == Pipeline.Status.COMPLETE }
							)}>
								<div>
									<div className="row">
										<div className="col-xs-9">
											<a style={{ color: '#FFF' }} href="javascript:void(0);" onClick={() => {
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
											
										</div>
									</div>
									{
										node.status == Pipeline.Status.RUNNING ?
											<div className="progress progress-striped active no-padding">
			                  <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}>
			                  </div>
			                </div> : null
									}
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