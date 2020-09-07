# BookShopper

Practicing techniques like pagination, sorting, filtering, Search bars, and authentication.

BookShopper was a mock e-commerce web application for Fullstack Academy's "Grace Shopper" project,
to demonstrate the ability to build a site from scratch with a persistent cart.
It was originally for books, but currently is using dummy data from the "Chance" library.


- [BookShopper](https://bookshopper-app.herokuapp.com/) - Our deployed site.

## Features

- Uses Babel as ES6-to-ES5 transpiler
- ES2017 latest features like Async/Await
- Uses [npm](https://www.npmjs.com/)
- Linting with [eslint](http://eslint.org)
- Git hooks with [husky](https://github.com/typicode/husky)
- Logging with [morgan](https://github.com/expressjs/morgan)
- Authentication and Authorization with [passport](http://passportjs.org)
- State management with [Redux](https://redux.js.org/)
- Virtual DOM manipulation with [React](https://reactjs.org/)
- Supplemental styling with [React-Bootstrap](https://react-bootstrap.github.io/)
- Database models built with [Sequelize](https://sequelize.org/)
- RESTful APIs for our DB with [Express](https://expressjs.com/)
- Object-relational database management system (ORDBMS). [PostgreSQL](https://www.postgresql.org/)

## Authors

- **Gary Hagen** - [GitHub](https://github.com/HagenGaryP)
- **Franco Trelles** - [GitHub](https://github.com/francomt)
- **Jared Usher** - [GitHub](https://github.com/Oosh74)

## Requirements

- [Node v7.6+](https://nodejs.org/en/download/current/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

# Getting Started

#### Clone the repo and make it yours:

```bash
git clone https://github.com/HagenGaryP/BookShopper.git
cd BookShopper
```

#### Install dependencies:

```bash
npm install
```

## Create PostgreSQL database
Either create this exact DB or change the name in the package.json
```bash
createdb grace-shopper
```
https://www.postgresql.org/docs/9.1/tutorial-createdb.html

## Seed the database

```bash
npm run seed
```

## Running Locally

```bash
npm run start-dev
```

(localhost:8080)

## Lint

```bash
# lint code with ESLint
npm run lint

# try to fix ESLint errors
npm run lint:fix
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
