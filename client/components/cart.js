import React from 'react'
import {
  Modal,
  Button,
  ButtonGroup,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  removeFromCartThunk,
  incrementOrDecrementThunk,
  checkoutThunk,
} from '../store'

const Cart = ({
  cart,
  completeOrder,
  isLoggedIn,
  onHide,
  removeFromCart,
  show,
  updateQuantity,
  userId,
}) => {
  // toast on successfully removing item from cart
  const removeFromCartSuccess = () => {
    toast('Removed Item from Cart', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    })
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dispatch="false"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.map((product) => {
          return (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <h4>Quantity: {product.quantity}</h4>
              <ButtonGroup size="sm">
                <Button
                  variant="secondary"
                  onClick={() => {
                    updateQuantity({
                      isLoggedIn: isLoggedIn,
                      userId: userId,
                      productId: product.id,
                      quantity: product.quantity,
                      method: '+',
                    })
                  }}
                >
                  Qty +
                </Button>
                {product.quantity > 1 ? (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      updateQuantity({
                        isLoggedIn: isLoggedIn,
                        userId: userId,
                        productId: product.id,
                        quantity: product.quantity,
                        method: '-',
                      })
                    }
                  >
                    Qty -
                  </Button>
                ) : (
                  <Button disabled variant="secondary">
                    Qty -
                  </Button>
                )}
              </ButtonGroup>
              <button
                type="button"
                style={{margin: '10px'}}
                onClick={() => {
                  removeFromCart({
                    isLoggedIn: isLoggedIn,
                    userId: userId,
                    productId: product.id,
                  })
                  removeFromCartSuccess()
                }}
              >
                Remove from cart
              </button>
              <h4>Price: ${product.price}</h4>
              <h4>
                Subtotal: ${(product.price * product.quantity).toFixed(2)}
              </h4>
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Col>
          Total: ${' '}
          {cart
            .reduce((total, product) => {
              return total + product.price * product.quantity
            }, 0.0)
            .toFixed(2)}
        </Col>
        {isLoggedIn ? (
          <Button
            variant="success"
            href="/completepurchase"
            onClick={() => completeOrder(userId)}
          >
            Complete Purchase
          </Button>
        ) : (
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                Create an account to checkout!
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <Button disabled style={{pointerEvents: 'none'}}>
                Checkout
              </Button>
            </span>
          </OverlayTrigger>
        )}

        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeFromCart: (info) => dispatch(removeFromCartThunk(info)),
    updateQuantity: (info) => dispatch(incrementOrDecrementThunk(info)),
    completeOrder: (userId) => dispatch(checkoutThunk(userId)),
  }
}

export default connect(mapState, mapDispatch)(Cart)
