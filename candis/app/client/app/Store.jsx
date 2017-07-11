import { createStore, applyMiddleware } from 'redux'
import thunk    from 'redux-thunk'
import logger   from 'redux-logger'

import config   from './config'

import Reducers from './reducer'

const middleware = applyMiddleware(thunk, logger)
const Store      = createStore(Reducers, middleware)

export default Store
