import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './usersReducer'
import products from './products'
import singleProduct from './single-product'
import cart from './cart'
import profile from './profile'

const reducer = combineReducers({
  user,
  users,
  products,
  singleProduct,
  cart,
  profile,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './single-product'
export * from './cart'
export * from './usersReducer'
export * from './profile'
