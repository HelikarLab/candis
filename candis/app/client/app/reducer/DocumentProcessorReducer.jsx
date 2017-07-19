import shortid    from 'shortid'
import graphlib   from 'graphlib'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'
import FileFormat from '../constant/FileFormat'

const initialState      =
{
  documents: [ ],
     active: null
}

const documentProcessor = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Asynchronous.WRITE_SUCCESS: {
      const file        = action.payload.file

      if ( file.format == FileFormat.PIPELINE ) {
        const data      = action.payload.data
        const graph     = new graphlib.Graph()

        const dokument  =
        {
              ID: shortid.generate(),
          output: data.output,
            data: graph
        }

        const documents = state.documents.slice()

        documents.push(dokument)

        return {...state, documents: documents, active: dokument }
      }
    }

    case ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT: {
      const dokument = action.payload

      return {...state, active: dokument }
    }

    case ActionType.DocumentProcessor.REMOVE_DOCUMENT: {
      const ID        = action.payload.ID
      const documents = state.documents.slice().filter((dokument) => {
        dokument.ID !== action.payload.ID
      })

      return {...state, documents: documents }
    }

    case ActionType.DocumentProcessor.SET_STAGE: {
      const dokument   = cloneDeep(state.active)

      if ( dokument !== null ) {
        const ID       = shortid.generate()
        const stage    = action.payload

        dokument.data.setNode(ID, stage)

        return {...state, active: dokument }
      }
    }
  }

  return state
}

export default documentProcessor
