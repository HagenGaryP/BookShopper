/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctInfo', () => {
      let book

      beforeEach(async () => {
        book = await Product.create({
          title: 'The Hobbit',
          author: 'J.R.R Tolkien',
          price: 9.99,
          rating: 5,
          genre: 'Fantasy'
        })
      })

      it('returns correct title', () => {
        expect(book.dataValues.title).to.be.equal('The Hobbit')
      })
      it('returns correct author', () => {
        expect(book.dataValues.author).to.be.equal('J.R.R Tolkien')
      })
      it('returns correct price', () => {
        expect(book.dataValues.price).to.be.equal(9.99)
      })
      it('returns correct rating', () => {
        expect(book.dataValues.rating).to.be.equal(5)
      })
      it('returns correct genre', () => {
        expect(book.dataValues.genre).to.be.equal('Fantasy')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
