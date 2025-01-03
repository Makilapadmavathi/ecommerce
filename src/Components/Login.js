import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { CloseButton, Form, InputGroup } from 'react-bootstrap';
import { Person, Key } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Login() {
    let uname=localStorage.getItem("username")
    let pwd=localStorage.getItem("password")
const navigate=useNavigate();
    const [records, setRecords] = useState({
        
        Username:"",
        Password: "",
        
       
    });
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

    const schema = yup.object().shape({
       Username:yup.string().required(),
     Password: yup.string().matches(passwordRules, { message: "Please create a stronger password" })
                  .required("Password is mandatory"),
                });
    const handleInput = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value });
      };
      const handleSubmit=()=>{
        Loginsubmit();
      }
  
    const Loginsubmit = () => {
           
            if(records.Username==uname && records.Password == pwd){
                navigate('/home')
            }
            else{
                alert("Invalid credentials")
            }
        }
        

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
             
                <Form noValidate className="ecomform-container px-4" >
                    <h3>Login</h3><br /><br />
                   
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
                   
                    <Button type="button" onClick={(e)=>handleSubmit(e)} variant="outline-primary"> submit</Button>
                    <br/>
                    <p>Not an user click here <Button type="button"onClick={()=>navigate('/signup')}>Sign up</Button></p>
                </Form>

            )}
            
                </Formik>
  
     
            </Container>
          
        </div>
    );
}

export default Login;
