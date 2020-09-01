import React, {useState} from 'react'
import {newProduct} from '../store'
import {connect} from 'react-redux'
import {AddProductForm} from './index'

const AddProduct = ({addToProductList}) => {
  // state variables
  const [author, setAuthor] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [genre, setGenre] = useState('')
  const [price, setPrice] = useState(0.0)
  const [synopsis, setSynopsis] = useState('')
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    if (event.target.name === 'author') {
      setAuthor(event.target.value)
    } else if (event.target.name === 'coverImg') {
      setCoverImg(event.target.value)
    } else if (event.target.name === 'genre') {
      setGenre(event.target.value)
    } else if (event.target.name === 'price') {
      setPrice(event.target.value)
    } else if (event.target.name === 'synopsis') {
      setSynopsis(event.target.value)
    } else if (event.target.name === 'title') {
      setTitle(event.target.value)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const info = {
      productInfo: {
        title: event.target.title.value,
        author: event.target.author.value,
        price: event.target.price.value,
        genre: event.target.genre.value,
        synopsis: event.target.synopsis.value,
      },
      coverImg: event.target.coverImg.value,
    }
    // adding form submission's info to product list
    addToProductList(info)

    // clearing form's state
    setAuthor('')
    setCoverImg('')
    setGenre('')
    setPrice(0.0)
    setSynopsis('')
    setTitle('')
  }

  return (
    <div className="content">
      <AddProductForm
        handleSubmit={handleSubmit}
        title={title}
        author={author}
        price={price}
        coverImg={coverImg}
        genre={genre}
        synopsis={synopsis}
        handleChange={handleChange}
      />
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  addToProductList: (event) => dispatch(newProduct(event)),
})

export default connect(null, mapDispatch)(AddProduct)
