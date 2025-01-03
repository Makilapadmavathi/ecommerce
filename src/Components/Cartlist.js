// Cartlist.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './actions';
import { useCart } from './Cartcontext';
const Cartlist = ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [total, setTotal] = useState(0);
  const { cartState, cartDispatch } = useCart();
  console.log(cartState)
  useEffect(() => {
    setTotal(
      cartState && cartState.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cartState]);

  console.log('CartItems in Cartlist:', cartItems); 

  // const handleAddToCart = (item) => {
  //   const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  //   if (existingItem) {
  //     increaseQuantity(item);
  //   } else {
  //     console.log('Dispatch ADD_TO_CART with payload:', item);
     
  //   }
  // };

  // const handleDecrease = (item) => {
  //   console.log('Dispatch DECREASE_QUANTITY with payload:', item);
 
  //   decreaseQuantity(item);
  // };
  const handleAddToCart = (id) => {
    console.log(id)
    const existingItem = cartState.cartItems.find((item) => item.id === id);
console.log(existingItem)
    if (existingItem) {
      console.log("Item already exists in the cart. Increasing quantity.");
      cartDispatch({ type: "INCREASE_QUANTITY", payload: id });
    } 
  };

  const handleDecrease = (id) => {
    const existingItem = cartState.cartItems.find((item) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      console.log("Dispatching DECREASE_QUANTITY with payload:", id);
      cartDispatch({ type: "DECREASE_QUANTITY", payload: id });
    } else {
      console.log("Item quantity is 1. Removing from cart.");
      cartDispatch({
        type: "REMOVE_FROM_CART",
        payload:id,
      });
    }
  };
  const getTotalPrice = (id,price) => {
    const itemInCart = cartState && cartState.cartItems.find((item) => item.id === id);
    return itemInCart ? itemInCart.price * itemInCart.quantity : price;
  };

  return (
    <div className="home">
      <div className="productContainer">
        <h2 style={{ textAlign: 'center' }}>Cart Items</h2>

        <div style={{ backgroundColor: 'white', padding: '10px 10%' }}>
  {cartState && cartState.cartItems.length > 0 ? (
    cartState.cartItems.map((cartItem) => (
      <div key={cartItem.id} className="row product" style={{ textAlign: "center",backgroundColor:"white" }}>
        <img
          src={cartItem.image}
          style={{ width: "250px", display: "block", margin: "0 auto" }}
          alt="Product"
        />
        
        <p style={{ textAlign: "center", fontFamily: "fantasy" }}>{cartItem.title}</p>
        <p style={{ textAlign: "center", fontFamily: "cursive" }}>Quantity: {cartItem.quantity}</p>
        <h5 style={{ textAlign: "center", fontFamily: "cursive" }}>
          Rs.{getTotalPrice(cartItem.id, cartItem.price)}
        </h5>

        {/* Centering the buttons */}
        <div style={{ textAlign: "center" }}>
          <Button
            variant="info"
            onClick={() => handleAddToCart(cartItem.id)}
           
          >
            +
          </Button>&nbsp; &nbsp;
          <Button
            variant="danger"
            onClick={() => handleDecrease(cartItem.id)}
           
          > 
            -
          </Button>&nbsp; &nbsp;
          <Button
            variant="warning"
            onClick={() =>
              cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: cartItem.id,
              })
            }
           
          >
            Remove 
          </Button>
        </div>
      </div>
    ))
  ) : (
    <p style={{ textAlign: "center" }}>No items in cart</p>
  )}
</div>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cartItems.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: ₹ {total.toFixed(2)}
        </span>
        <Button type="button" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart && state.cart.cartItems ? state.cart.cartItems : [],
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (product) => dispatch(removeFromCart(product)),
  increaseQuantity: (product) => dispatch(increaseQuantity(product)),
  decreaseQuantity: (product) => dispatch(decreaseQuantity(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cartlist);
