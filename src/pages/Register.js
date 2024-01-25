import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [buttonColor, setButtonColor] = useState('danger');
  const [loading, setLoading] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo('');
          setPassword('');
          setConfirmPassword('');

          Swal.fire({
            title: 'Thank you for registering!',
            icon: 'success',
          });

          navigate('/login');
        } else {
          Swal.fire({
            title: 'Registration failed',
            text: 'Please try again later.',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Handle error, provide user feedback
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return (
    <>
      {user.id !== null ? (
        <Navigate to="/login" />
      ) : (
        <Container className="mb-5">
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <div className="login-form" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '5px solid black' }}>
                <h1 className="my-3 text-center" style={{ color: 'black' }} id="registerfont">REGISTER</h1>
                <Form onSubmit={(e) => registerUser(e)}>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="mobileNo">
                    <Form.Control
                      type="number"
                      placeholder="Mobile No (11 digits)"
                      required
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ marginBottom: '15px' }}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ marginBottom: '20px' }}
                    />
                  </Form.Group>

                  {isActive ? (
                    <Button
                      variant={buttonColor}
                      type="submit"
                      size="lg"
                      block
                      disabled={loading}
                      onClick={() => setButtonColor('primary')}
                      style={{ width: '100%', marginBottom: '20px' }}
                    >
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      type="submit"
                      size="lg"
                      block
                      disabled
                      title={isActive ? '' : 'Fill in all fields correctly'}
                      style={{ width: '100%', marginBottom: '20px' }}
                    >
                      Register
                    </Button>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
