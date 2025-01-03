// Viewdetail.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./Cartcontext";
import { Button } from "react-bootstrap";

function Viewdetail() {
  const usernamesess = localStorage.getItem('username');
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartState: { cartItems }, cartDispatch } = useCart();
  const navigate = useNavigate();

  const fetchProductviewDetail = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductviewDetail();
  }, []);

  const handleAddToBag = (product) => {
    if (usernamesess) {
      cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
      console.log("Item added to cart",product);
    } else {
      navigate("/signup");
    }
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      console.log("Item already exists in the cart. Increasing quantity.");
      cartDispatch({ type: "INCREASE_QUANTITY", payload: product.id });
    } else {
      console.log("Adding item to the cart.");
      cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    }
  };

  const handleDecrease = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem && existingItem.quantity > 1) {
      console.log("Dispatching DECREASE_QUANTITY with payload:", product.id);
      cartDispatch({ type: "DECREASE_QUANTITY", payload: product.id });
    } else {
      console.log("Item quantity is 1. Removing from cart.");
      cartDispatch({
        type: "REMOVE_FROM_CART",
        payload: product.id,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const getTotalPrice = () => {
    const itemInCart = cartItems.find((item) => item.id === product.id);
    return itemInCart ? itemInCart.price * itemInCart.quantity : product.price;
  };

  const getQuantityInCart = () => {
    const itemInCart = cartItems.find((item) => item.id === product.id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <div className="viewdetail-container">
      <img
        src={product.image}
        alt="Product"
        style={{ width: "50%" }}
      />
      <h2>{product.title}</h2>
      <h3>{product.category}</h3>
      <p>{product.description}</p>

      <p>
        <h5>Rs.{getTotalPrice()}</h5>
      </p>

      <p>
        <h5>Qty: {getQuantityInCart()}</h5>
      </p>

      <div>
        {cartItems.some((p) => p.id === product.id) ? (
          <div>
            <Button variant="info" onClick={handleAddToCart}>+</Button>{' '}
            <Button variant="danger" onClick={handleDecrease}>-</Button>{' '}
            <Button
              variant="warning"
              onClick={() =>
                cartDispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product.id,
                })
              }
            >
              Remove from Cart
            </Button>
          </div>
        ) : (
          <Button variant="info" onClick={() => handleAddToBag(product)}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default Viewdetail;
