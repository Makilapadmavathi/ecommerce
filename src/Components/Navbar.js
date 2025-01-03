import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, InputGroup, Navbar, Container, Nav, Button } from 'react-bootstrap';
import { CartCheckFill, Power, Search, TruckFlatbed } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import Gtlogo1 from '../Images/GT logo1.jpg';
import cartimg from '../Images/cart.png';
import { useCart } from './Cartcontext';

function Navbarecom() {
  const usernamesess = localStorage.getItem('username');
  const [records, setRecords] = useState([]);
  const { cartState, cartDispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        const data = response.data;
        setRecords(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    cartDispatch({ type: "clear" });
    navigate('/');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-black">
        <Container fluid>
          <Navbar.Brand style={{ color: 'white' }}>
            <Link to="/home">
              <img src={Gtlogo1} className="logo" alt="Logo" />
            </Link>{' '}
            GT Ecommerce <TruckFlatbed style={{ color: 'white', fontSize: '30px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler white-icon" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* Dropdown or categories can be added here */}
            </Nav>

            <Link to="/signup">
              <Button variant="dark" style={{ fontSize: '30px', color: 'white', paddingRight: '40px' }}>
                Hello, {usernamesess}
              </Button>
            </Link>

            <Link to="/cartlist">
              <Button variant="dark">
                <div className="cartf">{cartState.cartItems.length}</div>
                <img src={cartimg} className="cart" alt="Cart" />
              </Button>
            </Link>

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
