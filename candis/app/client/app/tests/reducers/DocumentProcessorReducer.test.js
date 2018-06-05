import isEqual    from 'lodash.isequal'

import documentProcessor from '../../reducer/DocumentProcessorReducer'
import ActionType from '../../constant/ActionType'
import dokuments, { newDoc } from '../fixtures/documents'  
// to be implemented: replace dokuments name with a more apt name, as dokuments have
// structure of following "initial" state.

const initial             =
{
  documents: [ ],
     active: null,
      nodes: { },
    running: null,
     status: [ ],
     errors: [ ]
}

test('should setup initial state of DocumentProcessorReducer', () => {
    const state = documentProcessor(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        ...initial
    })
})

test('should return state with one object being active given ONE ducument matches the provided state', () => {
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Asynchronous.READ_SUCCESS,
            payload: dokuments.active
    })
     
    expect(state).toEqual({
        ...dokuments,
        active: {
            ...dokuments.active,
            data: expect.any(Array)
        }
    })
    state.active.data.forEach(node => {
        expect(Object.keys(node).sort()).toEqual(
            ['ID', 'code', 'name', 'label', 'value', 'status'].sort()
        )
    })

})

test('should return state with provided doc being active given NO state.document matches the provided doc', () => {
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Asynchronous.READ_SUCCESS,
            payload: newDoc
    })
    expect((dokuments.documents).length + 1).toBe(state.documents.length)  // with new doc, size should increase by 1
    // check if active doc is changed
    expect(state.active).toEqual({
        ...newDoc,
        ID: expect.any(String),
        data: expect.any(Array),
    })
    state.active.data.forEach(node => {
        expect(Object.keys(node).sort()).toEqual(
            ['ID', 'code', 'name', 'label', 'value', 'status'].sort()
        )
    })
})

// TO be implemented; test for ActionType.Asynchronous.WRITE_SUCCESS for this reducer

test('should set active document provided as payload', () => {
    const newActive = dokuments.documents[0]  // currently documents[1] is set to active
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.DocumentProcessor.SET_ACTIVE_DOCUMENT,
            payload: newActive
    })
    const documents = dokuments.documents.map((doc) => {
      return {...doc, active: isEqual(doc.output, newActive.output) }
    })

    expect(state).toEqual({
        ...dokuments,
        documents,
        active: newActive
    })
})

test('should set stage', () => {
    const node = newDoc.data[0]
    const state = documentProcessor(
        undefined,
        {
            type: ActionType.DocumentProcessor.SET_STAGE,
            payload: node
    })
    expect(state).toEqual({
        ...initial,
        nodes: expect.any(Object)
    })
    expect(state.nodes[node.code]).toEqual({
        onClick: node.onClick,
        icon: node.icon
    })
})

test('should remove node from state.documents and stata.active', () => {
    const code = dokuments.active.data[0].code
    const data = dokuments.active.data
    const state = documentProcessor(
        dokuments,    
        {
            type: 'REMOVE_NODE',
            payload: {
                data,
                code
            }
    })
    const reducedData = [ ]
    data.forEach((node) => {
        if(node.code !== code){
            reducedData.push(node)
        }
    })
    const active = {
        ...dokuments.active,
        data: reducedData
    }
    const documents = dokuments.documents.map((dokument) => {
        if(dokument.active){
            dokument.data = reducedData
        }
        return dokument
    })
    expect(state).toEqual({
        ...dokuments,
        documents,
        active
    })
})

test('should return state with "running" value', () => {
    const running = 'testPipe'
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Pipeline.RUN_REQUEST,
            payload: running
    })
    expect(state).toEqual({
        ...dokuments,
        running
    })
})

test('should return running as null for running pipeline successfully', () => {
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Pipeline.RUN_SUCCESS
    })
    expect(state).toEqual({
        ...dokuments,
        running: null
    })
})

test('should return errors when running failed', () => {
    const error = {
        errors: ['Incorrect order', 'dummy error']
    }
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Pipeline.RUN_ERROR,
            payload: {
                error
            }
    })
    expect(state).toEqual({
        ...dokuments,
        running: null,
        ...error
    })
})

test('should delete the pipeline and change state.active to some other pipeline given atleast 1 other pipeline is present', () => {
    const state = documentProcessor(
        dokuments,
        {
            type: ActionType.Pipeline.DELETE_PIPELINE
    })
    expect(state).toEqual({
        ...dokuments,
        documents: expect.any(Array),
        active: {
            ...dokuments.documents[0],
            active: true
        }  
    })
    expect(dokuments.documents[0]).toEqual({
        ...dokuments.documents[0],
        active: true
    })
})


