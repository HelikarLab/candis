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

const write            = (name, format, buffer = { }) => {
  const dispatch       = (dispatch) => {
    const action       = requestWrite(name, format, buffer)
    const parameters   = { name: name, format: format, buffer: buffer }

    dispatch(action)

    return axios.post(config.routes.api.data.write, parameters).then((response) => {
      response         = response.data

      if ( response.status == "success" ) {
        const data     = response.data
        const action   = successWrite(data.name, format, buffer, data)

        dispatch(action)
      } else if ( response.status == "error" ) {
        const error    = response.error
        const action   = errorWrite(name, format, buffer, error)

        dispatch(action)
      }
    })
  }

  return dispatch
}

const requestWrite     = (name, format, buffer) => {
  const file           = { name: name, format: format, buffer: buffer }
  const action         = {
       type: ActionType.Asynchronous.WRITE_REQUEST,
    payload: file
  }

  return action
}

const successWrite     = (name, format, buffer, data) => {
  const file           = { name: name, format: format, buffer: buffer }
  const payload        = { file: file, data: data }

  const action         = {
       type: ActionType.Asynchronous.WRITE_SUCCESS,
    payload: payload
  }

  return action
}

const errorWrite       = (name, format, buffer, error) => {
  const file           = { name: name, format: format, buffer: buffer }
  const payload        = { file: file, error: error }

  const action         = {
       type: ActionType.Asynchronous.WRITE_ERROR,
    payload: payload
  }

  return action
}

const writeFile       = (dispatch, params) => {
  dispatch({
    type: ActionType.WRITE_FILE_REQUEST
  })

  axios.post(config.routes.write, params)
       .then((response) => {
          response = response.data

          if ( response.status == "success" ) {
            const data   = response.data
            const action = {
                 type: ActionType.WRITE_FILE_SUCCESS
            }

            dispatch(action)
          } else {
            const action = {
                 type: ActionType.WRITE_FILE_ERROR
            }

            dispatch(action)
          }
       })
}

export { getResource, write, writeFile }
