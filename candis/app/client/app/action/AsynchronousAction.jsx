import axios      from 'axios'

import config     from '../config'
import ActionType from '../constant/ActionType'

const write            = (output, buffer = null) => {
  const dispatch       = (dispatch) => {
    const action       = requestWrite(output, buffer)
    const parameters   = { output: output, buffer: buffer }

    dispatch(action)

    return axios.post(config.routes.api.data.write, parameters).then((response) => {
      response         = response.data

      if ( response.status == "success" ) {
        const data     = response.data
        const action   = successWrite(output, buffer, data)

        dispatch(action)
      } else
      if ( response.status == "error" ) {
        const error    = response.error
        const action   = errorWrite(output, buffer, error)

        dispatch(action)
      }
    })
  }

  return dispatch
}

const requestWrite     = (output, buffer) => {
  const file           = { output: output, buffer: buffer }
  const action         = {
       type: ActionType.Asynchronous.WRITE_REQUEST,
    payload: file
  }

  return action
}

const successWrite     = (output, buffer, data) => {
  const file           = { output: output, buffer: buffer }
  const payload        = { file: file, data: data }

  const action         = {
       type: ActionType.Asynchronous.WRITE_SUCCESS,
    payload: payload
  }

  return action
}

const errorWrite       = (output, buffer, error) => {
  const file           = { output: output, buffer: buffer }
  const payload        = { file: file, error: error }

  const action         = {
       type: ActionType.Asynchronous.WRITE_ERROR,
    payload: payload
  }

  return action
}

// RAW
const getResource      = (dispatch) => {
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
// end

export { write, getResource }
