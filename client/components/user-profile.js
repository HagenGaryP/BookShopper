import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {
  Paper,
  Divider,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
} from '@material-ui/core'
import {
  MdPerson,
  MdReceipt,
  MdHome,
  MdCreditCard,
  MdFavorite,
} from 'react-icons/md'
import {profileViewThunk, getOrderThunk} from '../store'

const Profile = (props) => {
  const {
    address,
    billingAddress,
    buttonIdx,
    debitCard,
    email,
    firstName,
    getOrder,
    id,
    lastName,
    order,
    paymentInfo,
    profileView,
  } = props

  useEffect(() => {
    profileView(0)
    getOrder(id)
  }, [])

  const displayHelper = () => {
    if (buttonIdx === 0) {
      return (
        <div className="profileInfo">
          <h6>
            Name: {firstName} {lastName}
          </h6>
          <p> Email: {email} </p>
        </div>
      )
    } else if (buttonIdx === 1) {
      return (
        <div className="profileOrder">
          <h1>
            Orders:
            {order.map((item) => {
              return (
                <ul key={item.id}>
                  <li>Status: {item.status}</li>
                  <li>
                    Item(s):
                    {item.products.map((product) => {
                      return product.title
                    })}
                  </li>
                  <li>Order Number: N/A </li>
                  <li>Total Cost: N/A </li>
                </ul>
              )
            })}
          </h1>
        </div>
      )
    } else if (buttonIdx === 2) {
      return (
        <div className="profileAddres">
          <h1> {address ? `${address}` : 'Please enter an address.'} </h1>
        </div>
      )
    } else if (buttonIdx === 3) {
      return (
        <div className="profilePayment">
          <h1> {debitCard ? address : 'Please enter payment info.'} </h1>
        </div>
      )
    } else {
      return (
        <div className="profileWish">
          <h1> Wish List: List.</h1>
        </div>
      )
    }
  }

  console.log('THIS IS THE ORDER', order)

  return (
    <div className="content">
      {/*---------- Header ----------*/}
      <div className="profileHead">
        <div className="profHeadTxt">
          <h1>
            {firstName} {lastName}
          </h1>
          <h6>Welcome to your profile.</h6>
        </div>
        <div className="profButtons">
          <Button variant="outline-light">Edit Profile</Button>
          <Button className="ml-3" variant="outline-light">
            Signout
          </Button>
        </div>
      </div>
      <div className="profileInfo">
        <div className="profileList">
          <Paper variant="outlined">
            {/*---------- List Menu ----------*/}
            <List component="nav">
              <ListItem
                button
                selected={buttonIdx === 0}
                onClick={() => profileView(0)}
              >
                <ListItemIcon>
                  <MdPerson />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={buttonIdx === 1}
                onClick={() => profileView(1)}
              >
                <ListItemIcon>
                  <MdReceipt />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={buttonIdx === 2}
                onClick={() => profileView(2)}
              >
                <ListItemIcon>
                  <MdHome />
                </ListItemIcon>
                <ListItemText primary="Addresses" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={buttonIdx === 3}
                onClick={() => profileView(3)}
              >
                <ListItemIcon>
                  <MdCreditCard />
                </ListItemIcon>
                <ListItemText primary="Payment Info" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={buttonIdx === 4}
                onClick={() => profileView(4)}
              >
                <ListItemIcon>
                  <MdFavorite />
                </ListItemIcon>
                <ListItemText primary="Wishlist" />
              </ListItem>
            </List>
          </Paper>
        </div>
        {/*---------- Profile Info ----------*/}
        <div className="profContent">{displayHelper()}</div>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  profileView: (index) => dispatch(profileViewThunk(index)),
  getOrder: (user) => dispatch(getOrderThunk(user)),
})

const mapState = (state) => {
  console.log('ORDER ON STATE', state.profile.order)
  return {buttonIdx: state.profile.index, order: state.profile.order}
}

export default connect(mapState, mapDispatch)(Profile)
