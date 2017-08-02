import React      from 'react'
import {connect}  from 'react-redux'
import {SortableContainer} from 'react-sortable-hoc'
import classNames from 'classnames'

import Pipeline   from '../../constant/Pipeline'

class PipelineEditor extends SortableContainer
{
	render ( ) 
	{
		const props = this.props

		return (
			<ul className="list-group">
				{
					props.stages.map((stage, index) => {
						return (
							<li key={index} className={classNames("list-group-item", 
								{  "list-group-item-danger": stage.status == Pipeline.Status.RESOURCE_REQUIRED },
								{ "list-group-item-warning": stage.status == Pipeline.Status.RESOURCE_READY }
							)}>
								<a href="javascript:void(0);" onClick={() => {
									props.dispatch(stage.onClick)
								}}>
									<div style={{ color: '#FFF' }}>
										<h4 className="font-bold">
											{stage.name}
										</h4>
										{
											stage.label ?
												<small>
													{stage.label}
												</small> : null
										}
									</div>
								</a>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default connect()(PipelineEditor)