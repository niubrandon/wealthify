import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../components/Error'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/login.scss';

const Login = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  let from = '/portfolio';

  useEffect(() => {

    if (!user) {
      return;
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
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
        setError("Wrong credential, please try again!")
      });
  }, [user]);

  const onLogIn = (e) => {
    console.log('onSignUp invoked');
    e.preventDefault();

    setUser({
      user: {
        email: email,
        password: password
      },
    });
  };

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    height: "70vh"
  };

  return (
    <div style={flexWrapperVertical}>
      { error && <Error errorMessage={error} variant="warning" />}
      <Form className='w-50' onSubmit={(e) => onLogIn(e)} data-testid="signin-form"  >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control  
            type='email'
            name='email'
            placeholder='Enter email'
            data-testid="input-email"
            value={email}
            onChange={e => {
              setError("")
              setEmail(e.target.value)}}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            data-testid="input-password"
            value={password}
            onChange={e => {
              setError("")
              setPassword(e.target.value)}}
            required
          />
        </Form.Group>

        <Button id="login-button" variant='primary' type='submit' data-testid="login-button">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;