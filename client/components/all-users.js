import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Button, Card} from 'react-bootstrap'
import {fetchAllUsers, deletedUser} from '../store'

const AllUsers = ({users, getUsers, isAdmin, removeUser}) => {
  useEffect(() => {
    getUsers()
  }, [])

  const handleOnClick = (id) => {
    removeUser(id)
  }

  const isAdminFunc = (admin, userId) => {
    if (admin) {
      return (
        <Button variant="danger" onClick={() => handleOnClick(userId)}>
          Remove User
        </Button>
      )
    }
  }

  return (
    <div className="content">
      <h1 className="user-page-text">Users</h1>
      {/* <CardDeck> */}
      <div className="user-cards">
        {users &&
          users.map((singleUser) => {
            return (
              <Card key={singleUser.id} style={{width: '18rem'}}>
                <Card.Body>
                  <Card.Title>
                    Name: {singleUser.firstName || 'Not Filled Out'}{' '}
                    {singleUser.lastName}
                  </Card.Title>
                  <Card.Subtitle>Email: {singleUser.email}</Card.Subtitle>
                  {isAdminFunc(isAdmin, singleUser.id)}
                </Card.Body>
              </Card>
            )
          })}
      </div>
      {/* </CardDeck> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.users,
  isAdmin: state.user.isAdmin,
})
const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchAllUsers()),
  removeUser: (userId) => dispatch(deletedUser(userId)),
})

export default connect(mapStateToProps, mapDispatch)(AllUsers)
