import React from 'react'
import {Form, Button} from 'react-bootstrap'

const AddProductForm = ({
  handleSubmit,
  handleChange,
  title,
  author,
  price,
  coverImg,
  genre,
  synopsis
}) => {
  return (
    <div>
      <Form key="submit-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label> Title:</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAuthor">
          <Form.Label> Author: </Form.Label>
          <Form.Control
            name="author"
            type="text"
            value={author}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label> Price: $</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCoverImg">
          <Form.Label> Cover Image URL: </Form.Label>
          <Form.Control
            name="coverImg"
            type="text"
            value={coverImg}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGenre">
          <Form.Label> Genre: </Form.Label>
          <Form.Control
            name="genre"
            type="text"
            value={genre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formSynopsis">
          <Form.Label> Synopsis: </Form.Label>
          <Form.Control
            name="synopsis"
            type="text"
            value={synopsis}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddProductForm
