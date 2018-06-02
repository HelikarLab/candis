import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import config from '../../config'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import pipeline from '../../action/PipelineAction'
import activePipe from '../fixtures/pipeline'
import ActionType from '../../constant/ActionType'

const createMockStore = configureMockStore([thunk])

// To be Implemented - maybe mock `axios` library. Currently getting stuck in Asynch calls
 test('should setup pipeline.delete action object ', (done) => {
    const mock = new MockAdapter(axios)
    mock.onPost(config.routes.API.data.delete, { name: activePipe }).reply(200, { data: 'true' })
    const store = createMockStore({})
    store.dispatch(pipeline.delete(activePipe)).then(() => {
        const actions = store.getActions()
        expect(actions[1]).toEqual({
            type: ActionType.Pipeline.DELETE_PIPELINE
        })
        done()   
    })
    
 })
