import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (props) => {
  const [user, setUser] = useState(null);
  //const [ jwt, setJWT ] = useState({jwt: null});

  //navigate react routers
  let navigate = useNavigate();
  let location = useLocation();
  //let from = location.state?.from?.pathname || "/";
  let from = '/portfolio';

  useEffect(() => {
    //console.log("user is", user)
    if (!user) {
      return;
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
      data: user,
    })
      .then(function (response) {
        // console.log(response);
        //setJWT({jwt: response.data.auth_token})
        props.setAuthUser({
          jwt: response.data.auth_token,
          user_id: response.data.user_id,
          user_email: response.data.user_email,
          referral_code: response.data.referral_code,
        });

        //navigate
        //navigate(from, { replace: true });
        navigate('/portfolio');
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user]);

  const onLogIn = (e) => {
    console.log('onSignUp invoked');
    e.preventDefault();

    setUser({
      user: {
        email: e.target.email.value,
        password: e.target.password.value,
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
      <Form className='w-50' onSubmit={(e) => onLogIn(e)}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
