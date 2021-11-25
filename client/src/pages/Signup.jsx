import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
  useNavigate,
} from 'react-router-dom';

const Signup = (props) => {

  console.log(props.authUser);
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("user is", user)
    if (!user) {
      return
    }


    console.log(`printing the current state of ${user.user.email}`)
    axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: user,
    })
      .then(function (response) {
  
        props.setAuthUser({
          jwt: response.data.auth_token,
          user_id: response.data.user_id,
          user_email: response.data.user_email,
          referral_code: response.data.referral_code,
        });

        localStorage.setItem('auth', JSON.stringify({jwt: response.data.auth_token,
          user_id: response.data.user_id,
          user_email: response.data.user_email,
          referral_code: response.data.referral_code,}))

    
        navigate('/portfolio');
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user]);

  const onSignUp = (e) => {
    console.log('onSignUp invoked');
    e.preventDefault();

    setUser({
      user: {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        referral_code: e.target.referral_code.value,
      },
    });
  };

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <div style={flexWrapperVertical}>
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

      <Form.Group className="mb-3" controlId="formReferralCode">
        <Form.Label>Referral code</Form.Label>
        <Form.Control type="text" name="referral_code" placeholder="Refferal code" />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        SignUp
      </Button>
    </Form>
    </div>
  );
};

export default Signup;
