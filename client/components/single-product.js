import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addToCartThunk} from '../store'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Rating} from '@material-ui/lab'
import {Button} from '@material-ui/core'

toast.configure()

const SingleProduct = ({
  book,
  addToCart,
  isLoggedIn,
  userId,
  addToCartSuccess,
  fetchBook,
  match,
}) => {
  useEffect(() => {
    fetchBook(match.params.id)
  }, [])

  return (
    <div className="single-product-container">
      <div className="single-product-img-container">
        <img className="single-product-img" src={book.coverImg} />
      </div>
      <div className="single-product-info-container">
        <p className="single-product-view-title">{book.title}</p>
        <p className="single-product-view-author">
          by <span className="book-author-link">{book.author}</span>
        </p>
        <div className="single-product-rating-container">
          <Rating name="read-only" value={book.rating || 0} readOnly />
          <p className="rating-count-text">{book.ratingCount} reviews</p>
        </div>
        <p className="single-product-genre">{book.genre}</p>
        <p className="single-book-synopsis">Synopsis</p>
        <p className="single-product-synopsis">{book.synopsis}</p>
      </div>
      <div className="single-product-price-container">
        <div>
          Price: <span className="book-price-text">${book.price}</span>
        </div>
        <span className="wishlist-button" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            addToCart({
              isLoggedIn: isLoggedIn,
              userId: userId,
              productId: book.id,
              product: book,
              price: book.price,
            })
            addToCartSuccess()
          }}
          type="button"
        >
          Add To Cart
        </Button>
        <span className="wishlist-button" />
        <Button variant="contained">Add To Wishlist</Button>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    book: state.singleProduct,
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchBook: (bookId) => dispatch(fetchSingleProduct(bookId)),
    addToCart: (info) => dispatch(addToCartThunk(info)),
    addToCartSuccess: () =>
      toast('Added Book To Cart!', {position: toast.POSITION.TOP_CENTER}),
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
