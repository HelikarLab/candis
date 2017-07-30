import shortid    from 'shortid'
import graphlib   from 'graphlib'
import isEqual    from 'lodash.isequal'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'
import FileFormat from '../constant/FileFormat'

const initial             =
{
  documents: [ ],
     active: null,
      nodes: { },
    running: false,
}

const documentProcessor   = (state = initial, action) => {
  switch (action.type) {
    case ActionType.Asynchronous.WRITE_SUCCESS: {
      const meta          = action.payload.data
      var   active        = null

      if ( meta.output.format == FileFormat.PIPELINE )
      {
        const documents   = state.documents.slice().map((dokument) => 
        {
          const exists    = isEqual(dokument.output, meta.output)
          if ( exists ) 
          {
            const pipe    = [ ]
            meta.data.forEach((stage) =>
            {
              const node = 
              {
                     ID: stage.ID,
                   code: stage.code,
                   name: stage.name,
                  label: stage.label,
                onClick: state.nodes[stage.code].onClick,
                  value: stage.value,
                 status: stage.status
              }

              pipe.push(node)
            })

            dokument.data = pipe
            active        = dokument
          }

          return {...dokument, active: exists }
        })

        if ( !active ) {
          const pipe   = [ ]
          meta.data.forEach((stage) =>
          {
            const node = 
            {
                   ID: stage.ID,
                 code: stage.code,
                 name: stage.name,
                label: stage.label,
              onClick: state.nodes[stage.code].onClick,
                value: stage.value,
               status: stage.status
            }

            pipe.push(node)
          })

          active       =
          {
                ID: shortid.generate(),
            output: meta.output,
              data: pipe,
            active: true
          }

          documents.push(active)
        }

        return {...state, documents: documents, active: active }
      }

      break
    }

    case ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT:
    {
      const active       = action.payload
      const documents    = state.documents.slice().map((dokument) =>
      {
        return {...dokument, active: isEqual(dokument.output, active.output) }
      })

      return {...state, documents: documents, active: active }
    }

    case ActionType.DocumentProcessor.SET_NODE:
    {
      const node         = action.payload
      var   nodes        = state.nodes

      if ( !state.nodes[node.code] ) 
      {
        nodes            = cloneDeep(state.nodes)
        nodes[node.code] = 
        {
          onClick: node.onClick
        }
      }

      return {...state, nodes: nodes }
    }

    case ActionType.App.RUN_PIPELINE_REQUEST:
      return {...state, running: true }

    case ActionType.App.RUN_PIPELINE_SUCCESS:
      return {...state, running: false }
  }

  return state
}

export default documentProcessor
