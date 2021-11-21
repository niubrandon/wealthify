import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Login = (props) => {
  console.log("from login page", props.authuser)
  const [user, setUser] = useState({user: ""});
  //const [ jwt, setJWT ] = useState({jwt: null});


  useEffect(() => {
    console.log("user is", user)
    if (!user.user) {
      return
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
      data: user
  })
  .then(function (response) {
      console.log(response);
      //setJWT({jwt: response.data.auth_token})
      props.setAuthuser({
        jwt: response.data.auth_token,
        user_id: response.data.user_id,
        user_email: response.data.user_email})
  })
  .catch(function (error) {
      console.log(error);
      

  });
  }, [user])



  const onLogIn = (e) => {
    console.log("onSignUp invoked")
    e.preventDefault();

    setUser({ user: {
      email: e.target.email.value,
      password: e.target.password.value
    }

    })
  };

 



  return (
 
    <Form className="w-50" onSubmit={ (e) => onLogIn(e) }>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>  
    
    
    
    )
}

export default Login;