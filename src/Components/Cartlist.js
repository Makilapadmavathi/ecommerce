import React,{useState,useEffect} from "react";
import { useCart } from "./Cartcontext";
import { Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";

function Cartlist() {
  const { cartState, cartDispatch } = useCart();
  const { cartItems } = cartState;
  const [total, setTotal] = useState();
  console.log(cartItems)
  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)
    );
  }, [cartItems]);

  const handleAddToCart = (item) => {
   
    
      console.log("Item already exists in the cart. Increasing quantity.");
      cartDispatch({ type: "INCREASE_QUANTITY", payload: item });
   
  };


  const handleDecrease = (item) => {
    console.log("Dispatching DECREASE_QUANTITY with payload:", item.id);
    cartDispatch({ type: "DECREASE_QUANTITY", payload: item });
  };
  return (
    <div className="home">
    <div className="productContainer">
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>

      <div style={{ backgroundColor: "secondary", padding: "50px 10%" }}>
        {cartItems.map((item) => (
          <div key={item.id} className="row product">
            <div className="col-md-2">
              <img
                src={item.image}
                alt="Sample Image"
                height="150"
                width="140"
              />
              <h7> rating - {item.rating.rate} ,</h7>
              <h8> count -{item.rating.count}</h8>
              <h5>quantity - {item.quantity}</h5>
            </div>
            <div className="col-md-8 product-detail">
              <h4>{item.title}</h4>
              <h5>{item.category}</h5>
              <p>{item.description}</p>
                 
              <Link to={`/viewdetail/${item.id}`}>
                        <Button variant="info">View Details</Button>
                      </Link>{' '}
            </div>
            <div className="col-md-4">
              {/* <Form.Select
                onChange={(e) =>
                  cartDispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      id: item.id,
                      quantity: e.target.value,
                    },
                  })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select> */}
              {/* <Button
                variant="info"
                onClick={() =>
                  cartDispatch({
                    type: "ADD_TO_CART",
                    payload: item,
                  })
                }
              >
                Add to Cart
              </Button> */}
                <Button variant="info" onClick={()=>handleAddToCart(item)}>+</Button>{'    '}
        <Button variant="danger" onClick={()=>handleDecrease(item)}>-</Button>{'    '}
              <Button
                type="button"
                variant="warning"
                onClick={() =>
                  cartDispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item,
                  })
                }
              >
                Remove From Cart
                {/* <Trash fontSize="20px" /> */}
              </Button>
            
            </div>
            <div className="col-md-2 product-price"> Rs. {(parseFloat(item.price)*item.quantity).toFixed(2)}</div>
          
          </div>
        
        ))}
         
      </div>
 
    </div>
    <div className="filters summary">
           <span className="title">Subtotal ({cartItems.length}) items</span>
           <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
           <Button type="button" disabled={cartItems.length === 0}>
             Proceed to Checkout
           </Button>
         </div>
    </div>
  );
}

export default Cartlist;
