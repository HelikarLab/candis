import shortid    from 'shortid'

import ActionType from '../constant/ActionType'

const initialState  =
{
  documents: [ ]
}

const documents     = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Asynchronous.WRITE_SUCCESS: {
      const file      = action.payload.file
      const data      = action.payload.data

      const document_ =
      {
            ID: shortid.generate(),
         title: file.name,
        active: true
      }
      const documents = state.documents.slice()

      documents.push(document_)

      return {...state, documents: documents }
    }

    case ActionType.Documents.REMOVE_DOCUMENT: {
      const documents = state.documents.slice().filter((doc) => {
        doc.ID !== action.payload.ID
      })

      return {...state, documents: documents }
    }
  }

  return state
}

export default documents
