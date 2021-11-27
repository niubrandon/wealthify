import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../components/Error';
import axios from 'axios';
import {
  useNavigate,
} from 'react-router-dom';

const Signup = (props) => {

  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("")

  let navigate = useNavigate();

  useEffect(() => {
    
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
        setError("Email address is taken! Please try a different one!")
      });
  }, [user]);

  const onSignUp = (e) => {
    e.preventDefault();
    setUser({
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        referral_code: referralCode,
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
      { error && <Error errorMessage={error} variant="warning" />}
      <Form className="w-50" onSubmit={ (e) => onSignUp(e) }>
        <Form.Group className="mb-3" controlId="formFristName">
          <Form.Label >First Name</Form.Label>
          <Form.Control type="text" name="first_name" placeholder="Frist Name" onChange={e => setFirstName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" placeholder="Last Name" onChange={e => setLastName(e.target.value)} required/>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
                type="email" 
                name="email" 
                placeholder="Enter email" 
                onChange={e => {
                setError("")
                setEmail(e.target.value)
              }} 
                required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <Form.Label>Referral code</Form.Label>
          <Form.Control type="text" name="referral_code" placeholder="Refferal code" onChange={e => setReferralCode(e.target.value)} />
        </Form.Group>
      
        <Button variant="primary" type="submit" data-testid="signup-button">
          SignUp
        </Button>
      </Form>
    </div>
  );
};

export default Signup;