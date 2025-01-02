
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
// import { CountContext } from "../App";
import { useContext } from "react";
import { useCart } from './Cartcontext'
function Home() {
  const { category } = useParams();
    console.log(category)
    const location = useLocation();
    const { cartState:{cartItems},cartDispatch } = useCart();
    const [product, setProduct] = useState();
   
      // const {count,dispatch}=useContext(CountContext)
      const navigate=useNavigate();
      const usernamesess = localStorage.getItem('usernamesess');
    const [records, setRecords] = useState([]);
    const LoadProductData = () => {
      fetch("https://fakestoreapi.com/products")
      // fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        // .then(json=>console.log(json))
        .then((res    ) => {
          setRecords(res);
        });
  
    };
    useEffect(() => {
      LoadProductData();
    }, []);
  
 
    
    const handleAddToBag = (product) => {
      if (usernamesess) {
        cartDispatch({ type: 'ADD_TO_CART', payload: product });
        console.log("Item added to cart");
      } else {
        navigate("/signup");
      }
    };

  


        return (
              <div style={{ backgroundColor: "secondary", padding: "50px 10%" }}>
                {records.map((records) => (
                
                  <div className="row product"  key={records.id}>
                    <div className="col-md-2">
                      <img
                        src={records.image}
                        alt="Sample Image"
                        height="150"
                        width="140"
                      />
                      <h7> rating - {records.rating.rate} ,</h7>
                      <h8> count -{records.rating.count}</h8>   
                    </div>
                    <div className="col-md-8 product-detail">
                      <h4>{records.title}</h4>
                      <h5>{records.category}</h5>
                      <p>{records.description}</p>
                      
                      <Link to={`/viewdetail/${records.id}`}>
                        <Button variant="info">View Details</Button>
                      </Link>{' '}
                      {cartItems.some((p)=>p.id===records.id)?
                      (
                        <Button variant="warning" onClick={() =>cartDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: records,
                        })
        }>
        
        Remove from  Cart
        </Button>
                       
                      ):
                      <Button variant="info" onClick={() => handleAddToBag(records)}>

                      Add to Cart
                    </Button>
                      }
                    
  
                    </div>
                    <div className="col-md-2 product-price"> Rs. {records.price}</div>
                  </div>
          
             
                ))};
                
                 </div>
            );
          }
          
          export default Home;
          