import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Image, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = ({name}) => {
  return (
    <div>
      <div>
        <div className="welcome">
          <h3 className="welcomeText">Welcome back, {name}!</h3>
          <Col xs={6} md={4}>
            <Image
              className="user-welcome-img"
              src="https://www.pinclipart.com/picdir/big/165-1653686_female-user-icon-png-download-user-colorful-icon.png"
              roundedCircle
            />
          </Col>
        </div>
        <div className="home-page-container">
          <div className="front-page-welcome">
            <div>
              <h1 className="front-display-text">
                Buy The Best Books From <br />
                Around The World
              </h1>
              <p className="subtext">
                Browse through our vibrant collection of books. Search by Author
                or by Genre. <br />
                Check out our clearance section for plenty of discounts!
              </p>
            </div>
            <div className="front-page-buttons">
              <Link to="/books">
                <Button variant="outline-light button-margin">All Books</Button>
              </Link>
            </div>
          </div>
          <div className="right-container">
            <img
              className="main-page-image"
              src="https://i.imgur.com/EZPUkqg.png"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
