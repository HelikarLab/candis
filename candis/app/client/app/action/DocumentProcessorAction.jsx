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
      const buffer      = { nodes: [ ], links: [ ] }
      dokument.data.nodes().forEach((ID) => 
      {
        const graphNode = dokument.data.node(ID)
        const previous  = 
        {
             ID: ID,
          label: graphNode.label,
           code: graphNode.code
        }

        buffer.nodes.push(previous)
      })

      buffer.nodes.push({
           ID: shortid.generate(),
        label: node.label,
         code: node.code
      })

      // TODO: links

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

export { setActiveDocument, setNode }
