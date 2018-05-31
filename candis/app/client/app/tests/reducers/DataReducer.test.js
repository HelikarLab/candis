import ActionType from '../../constant/ActionType'
import data from '../../reducer/DataReducer'

const dummyState = {
    resource: 'abc'
}

const ActionTypeList = [ActionType.Asynchronous.WRITE_REQUEST,
                        ActionType.Asynchronous.WRITE_SUCCESS,
                        ActionType.Asynchronous.GET_RESOURCE_REQUEST,
                        ActionType.Asynchronous.DELETE_SUCCESS,
                        ActionType.Asynchronous.DELETE_ERROR,
                        ActionType.Asynchronous.WRITE_ERROR]


test("should setup dataReducer with default values", () => {
    const state = data(undefined, {type: '@@INIT'})
    expect(state).toEqual({
        resource: null
    })
})

test("should set state to provided value", () => {
    ActionTypeList.forEach(ActionTypeItem => {
        const state = data(dummyState, ActionTypeItem)
        expect(state).toEqual({
            ...dummyState
        })
    });
})

test("should modify resource value by action.payload.data", () => {
    const state = data(undefined, {
            type: ActionType.Asynchronous.GET_RESOURCE_SUCCESS,
            payload: {
                data: 'ABC'
            } 
        })
    expect(state).toEqual({
        resource: 'ABC'
    })
})

