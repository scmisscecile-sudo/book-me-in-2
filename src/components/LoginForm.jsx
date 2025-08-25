import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.login(loginInfo);
      sessionStorage.setItem('access_token', response.access_token);
      sessionStorage.setItem('refresh_token', response.refresh_token);
      const userInfo = jwtDecode(response.access_token);
      sessionStorage.setItem('user_roles', JSON.stringify({
        account_role: userInfo.account_role,
        event_roles: userInfo.event_roles
      }));
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h4 className="text-center mb-4">Login</h4>
              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    aria-label="Email"
                    value={loginInfo.email}
                    onChange={handleInputChange}
                    required
                    size="lg"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    placeholder="Enter your password"
                    aria-label="Password"
                    onChange={handleInputChange}
                    required
                    size="lg"
                  />
                </Form.Group>
                <Row className="g-2">
                  <Col xs={12} sm={6}>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100"
                      size="lg"
                    >
                      Login
                    </Button>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Button 
                      variant="outline-secondary" 
                      className="w-100"
                      onClick={handleForgotPassword}
                      type="button"
                      size="lg"
                    >
                      Forgot Password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
