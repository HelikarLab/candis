import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import pipeline from '../../action/PipelineAction'
import activePipe from '../fixtures/pipeline'

const createMockStore = configureMockStore([thunk])

test('should setup pipeline.delete action object ', () => {
    const store = createMockStore({})
    store.dispatch(pipeline.delete('PIPE20180525092754.cpipe')).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: ''
        })
        done()    
    })
    
})
