import axios      from 'axios'

import config     from '../Config'
import ActionType from '../constant/ActionType'

const refreshResource = (dispatch) => {
  dispatch({
    type: ActionType.REFRESH_RESOURCE_REQUEST
  })
  axios.post(config.routes.resource)
       .then((response) => {
         response = response.data

         if ( response.status == "success" ) {
           const data   = response.data
           const action = {
                type: ActionType.REFRESH_RESOURCE_SUCCESS,
             payload: data
           }

           dispatch(action)
         } else {
           // TODO: handle fail, error
         }
       })
}

export { refreshResource }
