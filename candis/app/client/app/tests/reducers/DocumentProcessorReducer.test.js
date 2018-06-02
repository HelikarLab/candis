import documentProcessor from '../../reducer/DocumentProcessorReducer'
import ActionType from '../../constant/ActionType'
import dokuments from '../fixtures/documents'

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

test('should setup ', () => {
    // const state = documentProcessor(
    //     undefined,
    //     {
    //         type: ActionType.Asynchronous.READ_SUCCESS,
    //         payload: dokuments.active
    // })
    // expect(state).toEqual({
    //     ...dokuments,
    //     "active": {
    //         ...dokuments.active,
    //         "ID": expect.any(String),
    //     },
    // })
})
