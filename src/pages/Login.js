import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }
    },[firebase,navigate])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const result = await firebase.signInUserWithEmailAndPassword(email,password);
        console.log("Login", result)
    }
    return (
        <div className='container mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} 
                    value={email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} 
                    value={password} type="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <h3 className='my-5'>OR</h3>
            <Button onClick={firebase.signInWithGoogle} variant='danger'>Signin with Google</Button>
        </div>
    )
}

export default Login