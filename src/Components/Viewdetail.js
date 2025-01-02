import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./Cartcontext";
import { Form,Button } from "react-bootstrap";
function Viewdetail() {
  const usernamesess = localStorage.getItem('usernamesess');
  const { id } = useParams();
  const [price,setPrice]=useState(0);
  const [product, setProduct] = useState(null);
  const { cartState: { cartItems}, cartDispatch} = useCart();
  const navigate = useNavigate();
const [qty,setqty]=useState(0);
    const fetchProductviewDetail = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        // setProduct({ ...data, quantity: 1, id: String(data.id) });
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
      cartDispatch({ type: 'ADD_TO_CART', payload: product });
      console.log("Item added to cart");
    } else {
      navigate("/signup");
    }
  };

  const handleAddToCart = () => {
   
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      console.log("Item already exists in the cart. Increasing quantity.");
      cartDispatch({ type: "INCREASE_QUANTITY", 
      payload: product });
     // console.log(cartItems);
    } else {
      console.log("Adding item to the cart.");
      cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    }
  };


  const handleDecrease = () => {
    console.log("Dispatching DECREASE_QUANTITY with payload:", product.id);
    cartDispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewdetail-container">
      <img
        src={product.image}
        alt="Product"
        style={{ width: "50%", height: "200px" }}
      />
      <h2>{product.title}</h2>
      <h3>{product.category}</h3>
      <p>{product.description}</p>
     
      <p>
      {cartItems.some((p) => p.id === product.id) ? (
        <h5>Rs.{cartItems.map((item)=>
      
          item.id===product.id?Number(item.quantity) * Number(item.price):'')}</h5>
      ):(<h5>Rs.{product.price}</h5>)}
      </p>
      {/* <p>Quantity: {product.quantity}</p> */}
      
      <p>
      {cartItems.some((p) => p.id === product.id) ? (
       <h5>Qty : {cartItems.map((item)=>
      
      item.id===product.id?(Number(item.quantity)):'')}</h5>):("")}
       
      </p>

      <div>
        {cartItems.some((p) => p.id === product.id) ? (
          <div>
         
             <Button variant="info" onClick={handleAddToCart}>+</Button>{'  '}
             <Button variant="danger" onClick={handleDecrease}>-</Button>{'  '}
             <Button
            variant="warning"
            onClick={() =>
              cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
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
