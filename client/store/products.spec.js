/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts, getProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import reducer from './index'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  const fakeBooks = [
    {
      id: 2,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 18,
      genre: 'Fantasy Fiction, Quest'
    },
    {
      id: 1,
      title: 'As I Lay Dying',
      author: 'William Faulkner',
      price: 22,
      genre: 'Fiction'
    }
  ]

  function getRandomBook(books) {
    return books[Math.floor(Math.random() * books.length)]
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    it('returns properly formatted action', () => {
      const book = getRandomBook(fakeBooks)

      expect(getProducts(book)).to.be.deep.equal({
        type: 'GET_PRODUCTS',
        products: book
      })
    })
  })

  describe('Reducer', () => {
    it('returns the initial state by default', () => {
      // creates a store (for testing) using your (real) reducer
      const store = createStore(
        reducer,
        applyMiddleware(enforceImmutableState())
      )

      expect(store.getState().products).to.be.an('array')
    })

    describe('reduces on GET_PRODUCTS action', () => {
      it("sets the action's products from getProducts on state (without mutating the previous state)", () => {
        const store = createStore(
          reducer,
          applyMiddleware(enforceImmutableState())
        )
        const prevState = store.getState()

        const book = getRandomBook(fakeBooks)
        const action = {type: GET_PRODUCTS, products: book}
        store.dispatch(action)

        const newState = store.getState()

        // ensures the state is updated properly - deep equality compares the values of two objects' key-value pairs
        expect(store.getState().getProducts).to.be.deep.equal(book)
        // ensures we didn't mutate anything - regular equality compares the location of the object in memory
        expect(newState.getProducts).to.not.be.equal(prevState.getProducts)
      })
    })
  })

  //   describe('products', () => {
  //     it('eventually dispatches the GET USER action', async () => {

  //       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
  //       await store.dispatch(me())
  //       const actions = store.getActions()
  //       expect(actions[0].type).to.be.equal('GET_USER')
  //       expect(actions[0].user).to.be.deep.equal(fakeUser)
  //     })
  //   })

  //   describe('logout', () => {
  //     it('logout: eventually dispatches the REMOVE_USER action', async () => {
  //       mockAxios.onPost('/auth/logout').replyOnce(204)
  //       await store.dispatch(logout())
  //       const actions = store.getActions()
  //       expect(actions[0].type).to.be.equal('REMOVE_USER')
  //       expect(history.location.pathname).to.be.equal('/login')
  //     })
  //   })
  // })
})
