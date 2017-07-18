import axios      from 'axios'

import config     from '../config'
import ActionType from '../constant/ActionType'

const getResource     = (dispatch) => {
  dispatch({
    type: ActionType.GET_RESOURCE_REQUEST
  })

  axios.post(config.routes.api.data.resource)
       .then((response) => {
          response = response.data

          if ( response.status == "success" ) {
            const data   = response.data
            const action = {
                 type: ActionType.GET_RESOURCE_SUCCESS,
              payload: data
            }

            dispatch(action)
          } else {
            const action = {
                 type: ActionType.GET_RESOURCE_ERROR
            }

            dispatch(action)
          }
       })
}

const write            = (output, format, buffer = { }) => {
  const dispatch       = (dispatch) => {
    const action       = requestWrite(output, format, buffer)
    const parameters   = { output: output, format: format, buffer: buffer }

    dispatch(action)

    return axios.post(config.routes.api.data.write, parameters).then((response) => {
      response         = response.data

      if ( response.status == "success" ) {
        const data     = response.data
        const action   = successWrite(output, format, buffer, data)

        dispatch(action)
      } else if ( response.status == "error" ) {
        const error    = response.error
        const action   = errorWrite(output, format, buffer, error)

        dispatch(action)
      }
    })
  }

  return dispatch
}

const requestWrite     = (output, format, buffer) => {
  const file           = { output: output, format: format, buffer: buffer }
  const action         = {
       type: ActionType.Asynchronous.WRITE_REQUEST,
    payload: file
  }

  return action
}

const successWrite     = (output, format, buffer, data) => {
  const file           = { output: output, format: format, buffer: buffer }
  const payload        = { file: file, data: data }

  const action         = {
       type: ActionType.Asynchronous.WRITE_SUCCESS,
    payload: payload
  }

  return action
}

const errorWrite       = (output, format, buffer, error) => {
  const file           = { output: output, format: format, buffer: buffer }
  const payload        = { file: file, error: error }

  const action         = {
       type: ActionType.Asynchronous.WRITE_ERROR,
    payload: payload
  }

  return action
}

export { getResource, write }
