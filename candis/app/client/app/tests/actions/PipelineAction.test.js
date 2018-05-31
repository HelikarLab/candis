import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import pipeline from '../../action/PipelineAction'
import activePipe from '../fixtures/pipeline'

const createMockStore = configureMockStore([thunk])

// To be Implemented - maybe mock `axios` library. Currently getting stuck in Asynch calls
 test('should setup pipeline.delete action object ', (/*done*/) => {
//     const store = createMockStore({})
//     store.dispatch(pipeline.delete("testPipe.cpipe")).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'DELETE'
//         })
//         done()   
//     })
    
 })
