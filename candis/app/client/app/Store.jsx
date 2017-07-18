import { createStore, applyMiddleware } from 'redux'
import thunk    from 'redux-thunk'
import logger   from 'redux-logger'

import config   from './config'

import Reducers from './reducer'

const middlewares = [thunk]

if ( config.debug ) { middlewares.push(logger) }

const Store       = createStore(Reducers, applyMiddleware(...middlewares))

export default Store
