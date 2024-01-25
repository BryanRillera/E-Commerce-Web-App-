import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access); 
          retrieveUserDetails(data.access);

          Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            text: 'Welcome to PetBili',
          });
        } else {
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Check your login details and try again',
          });
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    setEmail('');
    setPassword('');
  }


  const retrieveUserDetails = (token) => {

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      })

    })

  }

  useEffect(() => {

    if(email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

  }, [email, password]);

  return (
    <>
      {user.id !== null ? (
        user.isAdmin ? (
          <Navigate to="/products" />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Container className="mb-5">
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <div className="login-form" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px',  border: '5px solid black', }}>
                <h1 className="my-3 text-center" style={{ color: 'black' }} id="loginfont">
                  LOGIN
                </h1>
                <Form onSubmit={(e) => authenticate(e)}>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  {isActive ? (
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      block
                      style={{ width: '100%', marginBottom: '20px' }}
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      type="submit"
                      size="lg"
                      block
                      disabled
                      style={{ width: '100%', marginBottom: '20px' }}
                      title={isActive ? '' : 'Fill in both email and password'}
                    >
                      Log In
                    </Button>
                  )}
                </Form>
                
                <p className="text-center" style={{ color: 'black' }}>
                    Don't have an account?{' '}
                  <Link to="/register" style={{ color: 'blue' }}>
                    Register here
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
