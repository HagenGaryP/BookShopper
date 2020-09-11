import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const LandingPage = () => {
  return (
    <div>
      <div>
        <div className="welcome" />
        <div className="home-page-container">
          <div className="front-page-welcome">
            <div>
              <h1 className="front-display-text">
                The Best Books From Around The World
              </h1>
              <p className="subtext">
                Browse through our vibrant collection of books. Search by Author
                or by Genre.
              </p>
            </div>
            <div className="front-page-buttons">
              <Link to="/books">
                <Button variant="outline-light button-margin">click to view selection!</Button>
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
