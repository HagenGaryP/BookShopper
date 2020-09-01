/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREMENT_OR_DECREMENT = 'INCREMENT_OR_DECREMENT'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'

let defaultCart = []

//////////////////////////////////
// ***** ACTION CREATORS ***** //
////////////////////////////////

export const getCart = cart => ({type: GET_CART, cart})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})
export const incrementOrDecrement = (productId, method) => ({
  type: INCREMENT_OR_DECREMENT,
  productId,
  method
})
export const completePurchase = () => ({
  type: COMPLETE_PURCHASE
})

////////////////////////////////////
// ***** UTILITY FUNCTIONS ***** //
//////////////////////////////////

//This formats the api data response so we can access the information easier
function returnFormatedProducts(obj) {
  if (obj === null) return obj
  const reformatted = obj.products.map(product => {
    return {
      ...product,
      quantity: product.ProductOrder.quantity,
      price: product.ProductOrder.price
    }
  })
  return reformatted
}

//loops through the local storage cart and makes a post request for each product
async function asyncForEachPost(books, userId) {
  for (let i = 0; i < books.length; i++) {
    let product = books[i]
    await axios.post(`/api/users/${userId}/orders/active`, {
      price: product.price,
      quantity: product.quantity,
      productId: product.id
    })
  }
}

function addToLocalStorage(product) {
  let localCart = JSON.parse(localStorage.getItem('cart'))
  let inCart = false
  if (localCart) {
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === product.id) {
        localCart[i].quantity++
        inCart = true
        break
      }
    }
  }
  if (!inCart && localCart) {
    product.quantity = 1
    localCart.push(product)
  }
  localStorage.setItem('cart', JSON.stringify(localCart))
}

function updateQuantityLocal(productId, method) {
  let localCart = JSON.parse(localStorage.getItem('cart'))
  for (let i = 0; i < localCart.length; i++) {
    if (localCart[i].id === productId && method === '+') {
      localCart[i].quantity++
      break
    }
    if (localCart[i].id === productId && method === '-') {
      localCart[i].quantity--
      break
    }
  }
  localStorage.setItem('cart', JSON.stringify(localCart))
  return [...localCart]
}

//loops through local storage cart and removes the corresponding product, returns the updated cart
function deleteFromLocalStorage(productId) {
  let localCart = JSON.parse(localStorage.getItem('cart'))
  let index
  for (let i = 0; i < localCart.length; i++) {
    if (localCart[i].id === productId) {
      index = i
      break
    }
  }
  localCart.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(localCart))
  return localCart
}

/////////////////////////
// ***** THUNKS ***** //
///////////////////////

export const getCartThunk = info => async dispatch => {
  const {isLoggedIn, userId} = info
  try {
    if (!isLoggedIn) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart === null) {
        cart = []
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      dispatch(getCart(cart))
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart'))
      if (localCart) {
        await asyncForEachPost(localCart, userId)
      }
      const {data} = await axios.get(`/api/users/${userId}/orders/active`)
      let cart = returnFormatedProducts(data)
      localStorage.removeItem('cart')
      dispatch(getCart(cart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = info => async dispatch => {
  let {userId, productId, quantity, price, product, isLoggedIn} = info
  if (quantity === null) quantity = 1
  try {
    if (!isLoggedIn) {
      addToLocalStorage(product)
      dispatch(addToCart(product))
    } else {
      const {data} = await axios.post(`/api/users/${userId}/orders/active`, {
        productId: productId,
        quantity: quantity,
        price: price
      })
      const productInfo = returnFormatedProducts(data)
      dispatch(addToCart(productInfo))
    }
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCartThunk = info => async dispatch => {
  const {isLoggedIn, userId, productId} = info
  try {
    if (!isLoggedIn) {
      deleteFromLocalStorage(productId)
      dispatch(removeFromCart(productId))
    } else {
      await axios.delete(`/api/users/${userId}/orders/active/${productId}`)
      dispatch(removeFromCart(productId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const incrementOrDecrementThunk = info => async dispatch => {
  let {isLoggedIn, userId, productId, quantity, method} = info
  if (method === '+') quantity++
  if (method === '-') quantity--
  try {
    if (!isLoggedIn) {
      updateQuantityLocal(productId, method)
      dispatch(incrementOrDecrement(productId, method))
    } else {
      await axios.put(`/api/users/${userId}/orders/active`, {
        productId: productId,
        quantity: quantity
      })
      dispatch(incrementOrDecrement(productId, method))
    }
  } catch (error) {
    console.error(error)
  }
}

export const checkoutThunk = userId => async dispatch => {
  try {
    //clears out the cart and creates a new empty order
    await axios.post(`/api/users/${userId}/orders/completed`)
    dispatch(completePurchase())
  } catch (error) {
    console.error(error)
  }
}

/////////////////////////
// ***** REDUCER ***** //
///////////////////////

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    case ADD_TO_CART:
      return [...state, action.product]
    case REMOVE_FROM_CART:
      const filteredCart = state.filter(product => {
        return product.id !== action.productId
      })
      return [...filteredCart]
    case INCREMENT_OR_DECREMENT:
      const updatedQuantityCart = state.map(product => {
        if (product.id === action.productId && action.method === '+') {
          product.quantity++
        }
        if (product.id === action.productId && action.method === '-') {
          product.quantity--
        }
        return product
      })
      return [...updatedQuantityCart]
    case COMPLETE_PURCHASE:
      return []
    default:
      return state
  }
}
