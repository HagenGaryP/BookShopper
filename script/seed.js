'use strict'

const db = require('../server/db')
const Chance = require('chance')
const chance = new Chance()

const {User, Product, Order} = require('../server/db/models')

const genre = () => {
  const types = [
    'Fantasy',
    'Horror',
    'Mystery',
    'Young Adult',
    "Children's",
    'Sci-Fi',
    'Music',
    'Finance',
    'Comedy',
    'Comic',
    'Romance',
  ]
  return types[Math.floor(Math.random() * (types.length - 1))]
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  ///////////////////////////
  //manually created users//
  /////////////////////////
  await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Codingson',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Franco',
      lastName: 'Trelles',
      email: 'franco@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Jared',
      lastName: 'Usher',
      email: 'jared@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Gary',
      lastName: 'Hagen',
      email: 'gary@email.com',
      password: '123',
    }),
  ])

  //creates random users
  for (let i = 0; i < 50; i++) {
    let name = chance.name().split(' ')
    User.create({
      firstName: name[0],
      lastName: name[1],
      email: chance.email(),
      password: 'chance123',
    })
  }

  //creates random books
  for (let i = 0; i < 200; i++) {
    Product.create({
      title: chance.company(),
      author: chance.name(),
      price: chance.natural({min: 3, max: 50}) + 0.99,
      rating: chance.natural({min: 1, max: 5}),
      ratingCount: chance.natural({min: 2, max: 3000}),
      genre: genre(),
      coverImg: `https://picsum.photos/id/${chance.natural({
        min: 1,
        max: 50,
      })}/300/500`,
    })
  }

  await Promise.all([
    Product.create({
      title: "Harry Potter and The Sorcerer's Stone",
      author: 'J.K Rowling',
      price: 15.99,
      rating: 5,
      ratingCount: 1142,
      genre: 'Fantasy',
    }),
    Product.create({
      title: 'Green Eggs and Ham',
      author: 'Dr. Seuss',
      price: 10.99,
      rating: 5,
      ratingCount: 366,
      genre: 'Children',
    }),
    Product.create({
      title: 'The Very Hungry Caterpillar',
      author: 'Eric Carle',
      price: 10.99,
      rating: 5,
      ratingCount: 324,
      genre: 'Children',
    }),
    Product.create({
      title: 'If It Bleeds',
      author: 'Stephen King',
      price: 13.99,
      rating: 3,
      ratingCount: 415,
      genre: 'Horror',
    }),
    Product.create({
      title: 'The Hobbit',
      author: 'J.R.R Tolkien',
      price: 9.99,
      rating: 5,
      ratingCount: 1257,
      genre: 'Fantasy',
    }),
    Product.create({
      title: 'Lord of The Rings',
      author: 'J.R.R Tolkien',
      price: 10.99,
      rating: 5,
      ratingCount: 1372,
      genre: 'Fantasy',
    }),
    Product.create({
      title: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      price: 8.99,
      rating: 5,
      ratingCount: 642,
      genre: 'Fantasy',
    }),
    Product.create({
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carroll',
      price: 5.99,
      rating: 4,
      ratingCount: 403,
      genre: 'Fantasy',
    }),
    Product.create({
      title: 'She: A History of Adventure',
      author: 'H. Rider Haggard',
      price: 14.79,
      rating: 5,
      ratingCount: 34,
      genre: 'Adventure',
    }),
    Product.create({
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      price: 12.5,
      rating: 5,
      ratingCount: 355,
      genre: 'Adventure',
    }),
    Product.create({
      title: "Charlotte's Web",
      author: 'E.B White',
      price: 5.99,
      rating: 5,
      ratingCount: 231,
      genre: "Children's Fiction",
    }),
    Product.create({
      title: 'The Ginger Man',
      author: 'J.P Donleavy',
      price: 15.79,
      rating: 2,
      ratingCount: 22,
      genre: 'Unknown',
    }),
  ])

  for (let i = 1; i <= 54; i++) {
    await Order.create({userId: i})
  }

  console.log(`seeded 54 users`)
  console.log(`seeded 212 products`)
  console.log(`seeded 54 orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
