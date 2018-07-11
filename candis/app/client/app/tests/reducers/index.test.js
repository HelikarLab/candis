import { createStore } from 'redux'

import reducer from '../../reducer/index'

// reference: https://github.com/reduxjs/redux/issues/1412
test('smoke test: expect store created using combineReducers should contain given reducers', () => {
    const store = createStore(reducer)
    expect(Object.keys(store.getState()).sort()).toEqual(
        ['app', 'toolBox', 'documentProcessor', 'modal', 'dataEditor', 'data', 'entrez'].sort()
    )
})
