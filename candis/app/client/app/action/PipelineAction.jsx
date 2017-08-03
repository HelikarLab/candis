import axios      from 'axios'

import config     from '../config'

import ActionType from '../constant/ActionType'

const pipeline     = 
{
	run: (output) => 
	{
		const dispatch = (dispatch) =>
		{
			const action = pipeline.runRequest(output)
			dispatch(action)

			axios.post(config.routes.api.pipeline.run, output).then(({ data }) => {
				const response = data

				if ( response.status == "success" ) {
					const action = pipeline.runSuccess(output, response.data)
					dispatch(action)
				} else 
				if ( response.status == "error" ) {
					const action = pipeline.runError(output, response.error)
					dispatch(action)
				}
			})
		}

		return dispatch
	},
	runRequest: (output) => 
	{
		const action = 
		{
			type: ActionType.Pipeline.RUN_REQUEST,
			payload: output
		}

		return action
	},
	runSuccess: (output, data) => 
	{
		const payload = { output: output, data: data }
		const action = 
		{
			type: ActionType.Pipeline.RUN_SUCCESS,
			payload: payload
		}

		return action
	},
	runError: (output, error) =>
	{
		const payload = { output: output, error: error }
		const action = 
		{
			type: ActionType.Pipeline.RUN_ERROR,
			payload: payload
		}

		return action
	}
}

export default pipeline