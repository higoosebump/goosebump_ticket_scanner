import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './modules/reducers'

export default function configureStore() {
  const enhancers = [applyMiddleware(thunk)]

  const store = createStore(reducers, {}, composeWithDevTools(...enhancers))

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./modules/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
