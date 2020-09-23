/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal(
      'Welcome back, cody@email.com'
    )
  })

  it('renders the correct <p>', () => {
    expect(userHome.find('p').text()).to.be.equal(
      'Browse through our vibrant collection of books. Search by Author or by Genre. Check out our clearance section for plenty of discounts!'
    )
  })
})