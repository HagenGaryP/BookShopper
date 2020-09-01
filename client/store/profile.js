import axios from 'axios'

//ACTION TYPES
const PROF_VIEW = 'PROF_VIEW'
const GET_ORDER = 'GET_ORDER'

//ACTION CREATORS
export const handleProfileClick = (index) => ({type: PROF_VIEW, index})
export const getOrder = (order) => ({type: GET_ORDER, order})

//THUNKS
export const profileViewThunk = (index) => (dispatch) => {
  dispatch(handleProfileClick(index))
}

export const getOrderThunk = (user) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/users/${user}/orders`)
    dispatch(getOrder(data))
  } catch (err) {
    console.error(err)
  }
}

//INITIAL STATE
const defaultState = {
  index: 0,
  order: [],
}

//REDUCER
export default function (state = defaultState, action) {
  switch (action.type) {
    case PROF_VIEW:
      return {...state, index: action.index}
    case GET_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
