import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getCartThunk} from '../store'
import {Button} from 'react-bootstrap'
import Cart from './cart'
import {AiOutlineShoppingCart, AiOutlineUser} from 'react-icons/ai'
import history from '../history'

const Navbar = ({handleClick, isLoggedIn, fetchCart, user, isAdmin}) => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <div className="nav-bar">
      {!isLoggedIn ? (
        <Link to="/">
          <h1 className="nav-title">BookShopper</h1>
        </Link>
      ) : (
        <Link to="/home">
          <h1 className="nav-title">BookShopper</h1>
        </Link>
      )}

      <nav className="nav-links">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/books"> Books </Link>
            <a href="/" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/books"> Books </Link>
          </div>
        )}
        <div>
          {isAdmin && (
            <div>
              <Link to="/addproduct"> Add Product </Link>
              <Link to="/users"> View Users </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="nav-buttons">
        {isLoggedIn && (
          <Button
            className="mr-1"
            variant="light"
            onClick={() => history.push('/profile')}
          >
            <AiOutlineUser />
          </Button>
        )}
        <Button
          className="ml-1"
          variant="light"
          onClick={() => {
            setModalShow(true)
            fetchCart({isLoggedIn: isLoggedIn, userId: user})
          }}
        >
          <AiOutlineShoppingCart />
        </Button>
      </div>

      <Cart
        isLoggedIn={isLoggedIn}
        userId={user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: (info) => dispatch(getCartThunk(info)),
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
