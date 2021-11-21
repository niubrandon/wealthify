import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


const Signup = (props) => {
  console.log(props.authuser)
  const [ user, setUser ] = useState({user: ''});
  //const [ jwt, setJWT ] = useState({jwt: null});

  useEffect(() => {
    console.log("user is", user)
    if (!user.user) {
      return
    }

    console.log(`printing the current state of ${user.user.email}`)
    axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: user
  })
  .then(function (response) {
      console.log(response.data);
      //setJWT({jwt: response.data.auth_token})
      props.setAuthuser({
        jwt: response.data.auth_token,
        user_id: response.data.user_id,
        user_email: response.data.user_email
      })
  })
  .catch(function (error) {
      console.log(error);
  });
  }, [user])


  const onSignUp = (e) => {
    console.log("onSignUp invoked")
    e.preventDefault();

    setUser({ user: {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      referral_code: e.target.referral_code.value
    }
    })
  };

  return (
    <Form className="w-50" onSubmit={ (e) => onSignUp(e) }>
      <Form.Group className="mb-3" controlId="formFristName">
        <Form.Label >First Name</Form.Label>
        <Form.Control type="text" name="first_name" placeholder="Frist Name" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="last_name" placeholder="Last Name" required/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Referral code</Form.Label>
        <Form.Control type="text" name="referral_code" placeholder="Refferal code" />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        SignUp
      </Button>
    </Form>
  )
}

export default Signup;