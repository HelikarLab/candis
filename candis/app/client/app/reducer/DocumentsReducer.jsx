import shortid    from 'shortid'

import ActionType from '../constant/ActionType'

const initialState  =
{
  documents: [ ]
}

const documents     = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Asynchronous.WRITE_SUCCESS: {
      const payload   = action.payload
      const file      = payload.file
      const data      = payload.data

      const documnt   = { ID: shortid.generate(), title: file.name }
      const documents = state.documents.slice()

      documents.push(documnt)

      return {...state, documents: documents }
    }
  }

  return state
}

export default documents
