import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import classNames  from 'classnames'

class DocumentEditor extends React.Component 
{
	render ( )
	{
		const props = this.props

		return (
			<ul className="list-group">
				{
					props.data.map((stage, index) => {
						console.log(stage.status)
						return (
							<li key={index} className={classNames("list-group-item",
									{ "list-group-item-danger": stage.status == "RESOURCE_REQUIRED" },
									{ "list-group-item-warning": stage.status == "READY" })}>
								<a href="javascript:void(0);" onClick={() => {
									props.dispatch(stage.onClick)
								}} style={{ color: '#FFF' }}>
									<h4 className="font-bold">
										{stage.name}
									</h4>
									{
										stage.value ?
											<small>
												{stage.value}
											</small> : null
									}
								</a>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default connect()(DocumentEditor)