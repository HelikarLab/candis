import axios      from 'axios'
import shortid    from 'shortid'

import ActionType from '../constant/ActionType'
import store      from '../store'

import { write }  from './AsynchronousAction'

const setActiveDocument = (dokument) => {
  const action          = { type: ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT, payload: dokument }

  return action
}

const setNode           = (node) => {
  const dispatcher      = (dispatch) => {
    const dokument      = store.getState().documentProcessor.active

    if ( dokument !== null ) 
    {
      const buffer      = [ ]
      dokument.data.forEach((node) => 
      {
        const stage     = 
        {
              ID: node.ID,
            code: node.code,
            name: node.name,
           label: node.label,
           value: node.value,
          status: node.status
        }

        buffer.push(stage)
      })

      buffer.push({
            ID: node.ID     || shortid.generate(),
          code: node.code,
          name: node.name,
         label: node.label,
         value: node.value,
        status: node.status || "RESOURCE_REQUIRED"
      })

      var action        = 
      {
           type: ActionType.DocumentProcessor.SET_NODE,
        payload: node
      }

      dispatch(action)

      action            = write(dokument.output, buffer)

      dispatch(action)
    }
  }

  return dispatcher
}

const updateNode        = (ID, update) => {
  const dispatcher      = (dispatch) => {
    const dokument      = store.getState().documentProcessor.active

    if ( dokument !== null ) 
    {
      const buffer      = [ ]
      var   child       = null
      dokument.data.forEach((node) => 
      {
        var stage       = 
        {
              ID: node.ID,
            code: node.code,
            name: node.name,
           label: node.label,
           value: node.value,
          status: node.status
        }

        if ( ID == stage.ID ) {
          stage = { ...stage, ...update }
          child = { ...node, code: stage.code }
        }

        buffer.push(stage)
      })

      var action        = null

      action            = setNode(child)

      dispatch(action)

      action            = write(dokument.output, buffer)

      dispatch(action)
    }
  }

  return dispatcher
}

const run               = (output) => 
{
  const dispatcher      = (dispatch) =>
  {
    var action          = { type: ActionType.App.RUN_PIPELINE_REQUEST }

    dispatch(action)
    console.log(output)

    axios.post('/api/run', output).then(({ data }) => {
      const response = data

      if ( response.success == "success" )
      {
        dispatch({ type: ActionType.App.RUN_PIPELINE_SUCCESS })
      }
    })
  }

  return dispatcher
}

export { setActiveDocument, setNode, updateNode, run }
