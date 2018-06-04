import documentProcessor from '../../reducer/DocumentProcessorReducer'
import ActionType from '../../constant/ActionType'
import dokuments, { newDoc } from '../fixtures/documents'

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
