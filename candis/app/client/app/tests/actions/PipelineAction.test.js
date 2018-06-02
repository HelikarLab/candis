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
    const data = { data: 'true' }  // dummy data object for DELETE_SUCCESS action.
    mock.onPost(config.routes.API.data.delete, { name: activePipe }).reply(200, data)
    const store = createMockStore({})
    store.dispatch(pipeline.delete(activePipe)).then(() => {
        
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: ActionType.Asynchronous.DELETE_SUCCESS,
            payload: {
                ...data,
                name: activePipe
            }
        })
        expect(actions[1]).toEqual({
            type: ActionType.Pipeline.DELETE_PIPELINE
        })
        done()
    })
    
 })

 test('should catch error while trying to delete pipeline using axios', (done) => {
    const mock = new MockAdapter(axios)
    const code = 404  // should be greater than or equal to 400
    const error = new Error(`Request failed with status code ${code}`)  // dummy error
    
    mock.onPost(config.routes.API.data.delete, { name: activePipe }).reply(404, error)
    const store = createMockStore({})
    store.dispatch(pipeline.delete(activePipe)).then(() => {
        
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: ActionType.Asynchronous.DELETE_ERROR,
            payload: {
                name: activePipe,
                error
            }
        })
        done()

    })
 })
