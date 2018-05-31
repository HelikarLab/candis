import documentProcessor from '../../reducer/DocumentProcessorReducer'

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