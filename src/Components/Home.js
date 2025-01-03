import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { useCart } from './Cartcontext'; 

function Home() {
  const { cartState, cartDispatch } = useCart();
  const { category } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const usernamesess = localStorage.getItem('username');
  console.log(usernamesess)
  const [records, setRecords] = useState([]);

  const LoadProductData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setRecords(res);
      });
  };

  useEffect(() => {
    LoadProductData();
  }, []);

  const handleAddToBag = (product) => {
    console.log(usernamesess)
    if (usernamesess) {
      cartDispatch({ type: 'ADD_TO_CART', payload: product });
      console.log("Item added to cart");
      console.log(cartState)
    } else {
      navigate("/signup");
    }
  };

  return (
    <div style={{ backgroundColor: "secondary", padding: "50px 10%" }}>
      {records.map((record) => (
        <div className="row product" key={record.id}>
          <div className="col-md-2">
            <img src={record.image} alt="Sample Image" height="150" width="140" />
            <h7> rating - {record.rating.rate} ,</h7>
            <h8> count -{record.rating.count}</h8>
          </div>
          <div className="col-md-8 product-detail">
            <h4>{record.title}</h4>
            <h5>{record.category}</h5>
            <p>{record.description}</p>
            <Link to={`/viewdetail/${record.id}`}>
              <Button variant="info">View </Button>
            </Link>{' '}
            {cartState.cartItems && cartState.cartItems.some((p) => p.id === record.id) ? (
              <Button
                variant="warning"
                onClick={() =>
                  cartDispatch({
                    type: "REMOVE_FROM_CART",
                    payload: record.id,
                  })
                }
              >
                Remove 
              </Button>
            ) : (
              <Button variant="info" onClick={() => handleAddToBag(record)}>
                Add to Cart
              </Button>
            )}
          </div>
          <div className="col-md-2 product-price"> Rs. {record.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
