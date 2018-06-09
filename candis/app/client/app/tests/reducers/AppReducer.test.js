import AppReducer from '../../reducer/AppReducer'
import ActionType from '../../constant/ActionType'

const initial = {
    user: null
}

test('should setup AppReducer with default state', () => {
    const state = AppReducer(
        undefined,
            {
                type: '@@INIT'
        }
    )
    expect(state).toEqual({
        ...initial
    })
})

test('should return provided state and set nprogress to 0 for action Type: SIGNIN_REQUEST', () => {
    const state = AppReducer(
        initial,
            {
            payload: null,
            type: ActionType.App.SIGNIN_REQUEST
        }
    )
    expect(nprogress.set).toHaveBeenCalledWith(0.0)
    expect(state).toEqual({
        ...initial
    })
})

test('should return provided state and set nprogress to 0 for action Type: SIGNOUT_REQUEST', () => {
    const state = AppReducer(
        initial,
            {
            payload: null,
            type: ActionType.App.SIGNOUT_REQUEST
        }
    )
    expect(nprogress.set).toHaveBeenCalledWith(0.0)
    expect(state).toEqual({
        ...initial
    })
})

test('should modify provided state and nprogress to 0 for action Type: SIGNOUT_REQUEST', () => {
    const fakeUser = 'RJ'
    const state = AppReducer(
        undefined,
            {
            payload: fakeUser,
            type: ActionType.App.SET_USER
        }
    )
    expect(state).toEqual({
        ...initial,
        user: fakeUser
    })
})