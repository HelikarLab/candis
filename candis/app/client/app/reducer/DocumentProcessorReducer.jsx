import shortid    from 'shortid'
import graphlib   from 'graphlib'
import isEqual    from 'lodash.isequal'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'
import FileFormat from '../constant/FileFormat'

const initialState        =
{
  documents: [ ],
     active: null,
      nodes: { }
}

const documentProcessor   = (state = initialState, action) => {
  switch (action.type) {
    // TODO: Can be written better?
    case ActionType.Asynchronous.WRITE_SUCCESS: 
    {
      const meta          = action.payload.data
      var   active        = null

      if ( meta.output.format == FileFormat.PIPELINE ) 
      {
        const documents   = state.documents.slice().map((dokument) => 
        {
          const exists    = isEqual(dokument.output, meta.output)
          if ( exists ) 
          {
            const graph   = new graphlib.Graph()
            meta.data.nodes.forEach((node) =>
            {
              const repr  = 
              {
                   code: node.code,
                  label: node.label,
                onClick: state.nodes[node.code].onClick
              }
              graph.setNode(node.ID, repr)
            })

            dokument.data = graph
            active        = dokument

            // TODO: links
          }

          return {...dokument, active: exists }
        })

        if ( !active ) {
          const graph  = new graphlib.Graph()
          meta.data.nodes.forEach((node) =>
          {
            const repr = 
            {
                 code: node.code,
                label: node.label,
              onClick: state.nodes[node.code].onClick
            }

            graph.setNode(node.ID, repr)
          })

          // TODO: links

          active       =
          {
                ID: shortid.generate(),
            output: meta.output,
              data: graph,
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
  }

  return state
}

export default documentProcessor
