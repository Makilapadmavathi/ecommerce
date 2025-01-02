


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, InputGroup } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { CartCheckFill, Power, Search, TruckFlatbed } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import Gtlogo1 from '../Images/GT logo1.jpg';
import cartimg from '../Images/cart.png';
import Swal from 'sweetalert2';
// import { CountContext } from "../App";
import { useCart } from './Cartcontext'

function Navbarecom() {
  // const {count,dispatch}=useContext(CountContext)
  const usernamesess = localStorage.getItem('usernamesess');
  const [records, setRecords] = useState([]);
  const [cartData, setCartData] = useState('1');
  const { cartState } = useCart();
//  const cartState = useNavigate();
  const navigate = useNavigate();
 
 const cartCount = cartState.cartItems.reduce((count, item) => parseInt(count) + parseInt(item.quantity), 0);
 //const cartCount = cartState.cartItems.length;


 //console.log(cartItems)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        // const response = await axios.get('https://dummyjson.com/products/categories');
        const data = response.data;
        setRecords(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
 
  const handleLogout = () => {

    localStorage.removeItem('usernamesess');
 
    navigate('/');
  };
 

  return (
    <div>
      <Navbar expand="lg" className="bg-black">
        <Container fluid>
          <Navbar.Brand style={{ color: 'white' }}>
            <Link to="/">
            <img src={Gtlogo1} className="logo" alt="Logo" /></Link> GT Ecommerce <TruckFlatbed style={{ color: 'white', fontSize: '30px' }}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown className="custom-dropdown" title="All" id="navbarScrollingDropdown">
                {records.map((category, index) => (
                  <NavDropdown.Item key={records.categories} >
                    {category} 
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Form.Group>
                    <Form.Label>
                      Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon1"
                        style={{ backgroundColor: "white", color: "#f79d9c" }}
                      >
                        <i>
                          <Search/>
                        </i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        
                        style={{ borderLeft: "none" }}
                      />

                    </InputGroup>

                  </Form.Group>
     
            <Link to="/signup">
              <Button variant="dark" style={{ fontSize: '30px', color: 'white', paddingRight: '40px' }}>
                Hello, {usernamesess}
              </Button>
            </Link>
            <Link to='/cartlist'><Button variant="dark" >
           
              <div className='cartf'> 
          {cartState.cartItems.length}
          {/* {cartCount} */}
              </div>
              <img src={cartimg} className="cart" />
            </Button></Link> 
            {usernamesess && ( 
              <Button variant="dark" onClick={handleLogout}>
                <Power style={{ fontSize: '40px', color: 'white', paddingRight: '10px' }} />
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
         
       
     
 


       
    </div>
  );
}

export default Navbarecom;

