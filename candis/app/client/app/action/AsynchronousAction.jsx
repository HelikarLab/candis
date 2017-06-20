import axios      from 'axios'

import config     from '../config'
import ActionType from '../constant/ActionType'

const getResource = (dispatch) => {
  dispatch({
    type: ActionType.GET_RESOURCE_REQUEST
  })

  axios.post(config.routes.resource)
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

export { getResource, writeFile }
