import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { CloseButton, Form, InputGroup } from 'react-bootstrap';
import { Person, Key } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Signup() {
const navigate=useNavigate();
    const [records, setRecords] = useState({
        FirstName: "",
        LastName:"",
        Email:"",
        Username:"",
        Password: "",
        Confirmpassword:"",
       
    });
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

    const schema = yup.object().shape({
       
        FirstName: yup.string().required("FirstName is mandatory"),
        Email: yup.string().required().email(),
        Username:yup.string().required(),
        Password: yup.string().matches(passwordRules, { message: "Please create a stronger password" })
                  .required("Password is mandatory"),
                  Confirmpassword: yup.string().oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Confirmpassword is mandatory"),
       
      });
    const handleInput = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value });
      };
      const handleSubmit=()=>{
        Loginsubmit();
      }
  
    const Loginsubmit = () => {
            const datas = {
                FirstName: records.FirstName,
                LastName:records.LastName,
                Email:records.Email,
                Username:records.Username,
                Password: records.Password,
                Confirmpassword:records.Confirmpassword,
            };
            localStorage.setItem("usernamesess", datas.Username);
            navigate('/')
            //    const usernamesess=sessionStorage.getItem('usernamesess');
            // axios.get("",datas)
            //     .then((response) => {
            //         //console.log(datas)
            //         // navigate('/', { replace: true });
            //           console.log(datas) 
            //           navigate('/')
            //           }
                      
            //           )
            //           .catch((err) => { "invalid "});
        };
        

    return (
        <div className="ecombackground-image">
            <Container className="ecomcontainer-center">
           
            <Formik
            initialValues={records}
            validationSchema={schema}
            enableReinitialize
            onSubmit={handleSubmit} 
          >
            {({handleChange, handleSubmit }) => (
             
                <Form noValidate className="ecomform-container px-4" ><Link to='/'><CloseButton className="closebutton" /></Link>
                    <h3>Sign Up</h3><br /><br />
                    <Form.Group className="mb-3 input" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Person /></i></InputGroup.Text>
                            <Form.Control
                                type="text"
                                required
                                name="FirstName"
                                value={records.FirstName}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                placeholder="FirstName"
                                
                            />
                        </InputGroup>
                        <ErrorMessage
                      name="FirstName"
                      component="div"
                      className="text-danger"
                    />
                    </Form.Group>
                    <Form.Group className="mb-3 input" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Person /></i></InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="LastName"
                                value={records.LastName}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                placeholder="LastName"
                               
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i> @ </i></InputGroup.Text>
                            <Form.Control
                                type="email"
                                required
                                name="Email"
                                placeholder="Email"
                                style={{ borderLeft: 'none' }}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                value={records.Email}
                            />
                        </InputGroup>
                        <ErrorMessage
                      name="Email"
                      component="div"
                      className="text-danger"
                    />
                    </Form.Group>
                    <Form.Group className="mb-3 input" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Person /></i></InputGroup.Text>
                            <Form.Control
                                type="text"



                                name="Username"
                                value={records.Username}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                placeholder="Username"
                                
                            />
                        </InputGroup>
                        <ErrorMessage
                      name="Username"
                      component="div"
                      className="text-danger"
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Key /></i></InputGroup.Text>
                            <Form.Control
                                type="password"
                                required
                                name="Password"
                                placeholder="Password"
                                style={{ borderLeft: 'none' }}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                value={records.Password}
                            />
                        </InputGroup>
                        <ErrorMessage
                      name="Password"
                      component="div"
                      className="text-danger"
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Key /></i></InputGroup.Text>
                            <Form.Control
                                type="password"
                                required
                                name="Confirmpassword"
                                placeholder="Confirmpassword"
                                style={{ borderLeft: 'none' }}
                                onChange={(e) => {
                                    handleChange(e);
                                     handleInput(e);
                                   }}
                                value={records.Confirmpassword}
                            />
                        </InputGroup>
                        <ErrorMessage
                      name="Confirmpassword"
                      component="div"
                      className="text-danger"
                    />
                    </Form.Group>
                  
                    <Button type="button" onClick={(e)=>handleSubmit(e)} variant="outline-primary"> submit</Button>
                </Form>
            )}
                </Formik>
  
      
            </Container>
        </div>
    );
}

export default Signup;
