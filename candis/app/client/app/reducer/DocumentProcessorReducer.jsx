import shortid    from 'shortid'

import ActionType from '../constant/ActionType'

const initialState      =
{
  documents: [ ],
     active: null
}

const documentProcessor = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Asynchronous.WRITE_SUCCESS: {
      const file        = action.payload.file
      const data        = action.payload.data

      const dokument    =
      {
            ID: shortid.generate(),
          path: file.path,
          name: file.name
      }
      const documents   = state.documents.slice()

      documents.push(dokument)

      return {...state, documents: documents, active: dokument.ID }
    }

    case ActionType.Asynchronous.WRITE_ERROR: {
      // TODO: Handle error, display something.
      // bootbox.alert('');
    }

    case ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT: {
      const dokument = action.payload

      return {...state, active: dokument.ID }
    }

    case ActionType.DocumentProcessor.REMOVE_DOCUMENT: {
      const documents = state.documents.slice().filter((dokument) => {
        dokument.ID !== action.payload.ID
      })

      return {...state, documents: documents }
    }
  }

  return state
}

export default documentProcessor
