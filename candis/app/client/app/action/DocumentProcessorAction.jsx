import axios      from 'axios'
import shortid    from 'shortid'

import ActionType from '../constant/ActionType'
import store      from '../store'

import { write }  from './AsynchronousAction'

const setActiveDocument = (dokument) => {
  const action          = {
       type: ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT,
    payload: dokument
  }

  return action
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

const stage = 
{
     set: (stage) =>
     {
        const dispatch = (dispatch) =>
        {
          const dokument      = store.getState().documentProcessor.active

          if ( dokument !== null ) 
          {
            var buffer        = dokument.data.map((node) => {
              const step      = 
              {
                    ID: node.ID,
                  code: node.code,
                  name: node.name,
                 value: node.value,
                 label: node.label,
                status: node.status
              }

              return step
            })

            buffer.push({
                  ID: stage.ID     || shortid.generate(),
                code: stage.code,
                name: stage.name,
               label: stage.label,
               value: stage.value,
              status: stage.status || Pipeline.Status.RESOURCE_REQUIRED
            })

            var action        = 
            {
                 type: ActionType.DocumentProcessor.SET_STAGE,
              payload: stage
            }

            dispatch(action)

            action            = write(dokument.output, buffer)

            dispatch(action)
          }
        }

        return dispatch
     },
  update: updateNode
}

export { setActiveDocument, stage, updateNode }
