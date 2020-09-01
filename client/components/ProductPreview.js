import React from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import {Rating} from '@material-ui/lab'
import history from '../history'

function ProductPreview({book, isAdmin, handleOnClick, view}) {
  if (view === 'all-products-container') {
    return (
      <div className="book-card">
        <div className="img-preview-container">
          <img
            src={book.coverImg}
            className="product-img-preview"
            onClick={() => history.push(`/books/${book.id}`)}
          />
          <p className="book-genre-preview">{book.genre}</p>
          <button className="quick-add" type="button">
            <MdAddShoppingCart />
          </button>
          {isAdmin && (
            <button
              type="button"
              className="quick-delete-book"
              onClick={() => handleOnClick(book.id)}
            >
              <AiFillDelete />
            </button>
          )}
        </div>

        <div className="book-card-textarea">
          <p
            onClick={() => history.push(`/books/${book.id}`)}
            className="book-card-title hover-links"
          >
            {book.title}
          </p>
          <div className="author-price-container">
            <p
              onClick={() => history.push(`/books/${book.id}`)}
              className="book-card-author hover-links"
            >
              {book.author}
            </p>
            <p className="price-preview">${book.price}</p>
          </div>
          <div className="rating-preview-container">
            <Rating name="read-only" value={book.rating} readOnly />
            <p className="rating-count">({book.ratingCount})</p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="book-card-list">
        <div className="img-preview-container-list">
          <img
            src={book.coverImg}
            className="product-img-preview"
            onClick={() => history.push(`/books/${book.id}`)}
          />
          <p className="book-genre-preview-list">{book.genre}</p>
          <button className="quick-add" type="button">
            <MdAddShoppingCart />
          </button>
          {isAdmin && (
            <button
              type="button"
              className="quick-delete-book"
              onClick={() => handleOnClick(book.id)}
            >
              <AiFillDelete />
            </button>
          )}
        </div>

        <div className="book-card-textarea">
          <p
            onClick={() => history.push(`/books/${book.id}`)}
            className="book-card-title-list hover-links"
          >
            {book.title}
          </p>
          <div className="author-price-container-list">
            <div className="author-card-list">
              <p className="by-text">by</p>
              <p
                onClick={() => history.push(`/books/${book.id}`)}
                className="book-card-author-list hover-links"
              >
                {book.author}
              </p>
            </div>
            <p className="price-preview-list">${book.price}</p>
          </div>
          <div className="rating-preview-container">
            <Rating name="read-only" value={book.rating} readOnly />
            <p className="rating-count">({book.ratingCount})</p>
          </div>
          <p className="synopsis-list">Synopsis</p>
          <p className="synopsis-text-list">{book.synopsis}</p>
        </div>
      </div>
    )
  }
}

export default ProductPreview
