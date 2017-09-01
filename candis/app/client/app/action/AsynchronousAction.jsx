import axios      from 'axios'

import config     from '../config'
import ActionType from '../constant/ActionType'

const write              = (output, buffer = null) => {
  const dispatch         = (dispatch) => {
    const action         = requestWrite(output, buffer)
    const parameters     = { output: output, buffer: buffer }

    dispatch(action)

    axios.post(config.routes.api.data.write, parameters).then(({ data }) => {
      data               = data.data
      const action       = successWrite(output, buffer, data)

      dispatch(action)
    }).catch(({ response }) => {
      const error        = response.data.error
      const action       = errorWrite(output, buffer, error)

      dispatch(action)
    })
  }

  return dispatch
}

const requestWrite       = (output, buffer) => {
  const file             = { output: output, buffer: buffer }
  const action           = {
       type: ActionType.Asynchronous.WRITE_REQUEST,
    payload: file
  }

  return action
}

const successWrite       = (output, buffer, data) => {
  const file             = { output: output, buffer: buffer }
  const payload          = { file: file, data: data }

  const action           = {
       type: ActionType.Asynchronous.WRITE_SUCCESS,
    payload: payload
  }

  return action
}

const errorWrite         = (output, buffer, error) => {
  const file             = { output: output, buffer: buffer }
  const payload          = { file: file, error: error }

  const action           = {
       type: ActionType.Asynchronous.WRITE_ERROR,
    payload: payload
  }

  return action
}

const getResource        = (path = null) => {
  const dispatch         = (dispatch) => {
    const action         = getResourceRequest(path)
    const parameters     = { path: path }

    dispatch(action)

    return axios.post(config.routes.api.data.resource, parameters).then(({ data }) => {
      data               = data.data
      const action       = getResourceSuccess(path, data)

      dispatch(action)

      return data
    }).catch(({ response }) => {
      const error        = response.data.error
      const action       = getResourceError(path, error)

      dispatch(action)
    })
  }

  return dispatch
}

const getResourceRequest = (path) => {
  const payload          = { path: path }
  const action           = {
       type: ActionType.Asynchronous.GET_RESOURCE_REQUEST,
    payload: payload
  }

  return action
}

const getResourceSuccess = (path, data) => {
  const payload          = { path: path, data: data }
  const action           = {
       type: ActionType.Asynchronous.GET_RESOURCE_SUCCESS,
    payload: payload
  }

  return action
}

const getResourceError   = (path, error) => {
  const payload          = { path: path, error: error }
  const action           = {
       type: ActionType.Asynchronous.GET_RESOURCE_ERROR,
    payload: payload
  }

  return action
}

const read               = (output) => {
  const dispatch         = (dispatch) => {
    const action         = requestRead(output)

    dispatch(action)

    return axios.post(config.routes.api.data.read, output).then(({ data }) => {
      data               = data.data
      const action       = successRead(output, data)

      dispatch(action)

      return data
    }).catch(({ response }) => {
      const error        = response.data.error
      const action       = errorRead(output, error)

      dispatch(action)
    })
  }

  return dispatch
}

const requestRead        = (output) => {
  const action           = {
       type: ActionType.Asynchronous.READ_REQUEST,
    payload: output
  }

  return action
}

const successRead        = (output, data) => {
  const payload          = { output: output, data: data }

  const action           = {
       type: ActionType.Asynchronous.READ_SUCCESS,
    payload: payload
  }

  return action
}

const errorRead          = (output, error) => {
  const payload          = { output: output, error: error }

  const action           = {
       type: ActionType.Asynchronous.READ_ERROR,
    payload: payload
  }

  return action
}

export { read, write, getResource }
