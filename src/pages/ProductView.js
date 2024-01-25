import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';

const ProductView = () => {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({
    breed: '',
    description: '',
    price: 0,
  });

  const [quantity, setQuantity] = useState(1);

  const purchase = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Authentication Error',
        icon: 'error',
        text: 'Please log in to make a purchase.',
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          products: [{ productId: productId, quantity: quantity }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        Swal.fire({
          title: 'Order Error',
          icon: 'error',
          text: `Failed to place the order: ${data.error}`,
        });
      } else {
        Swal.fire({
          title: 'Successfully Ordered',
          icon: 'success',
          text: 'You have successfully ordered this product.',
        });

        navigate('/products');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProductDetails({
          breed: data.breed,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData(); 
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center bg-dark text-light">
              <Card.Text className="breed-details">{productDetails.breed}</Card.Text>
              <Card.Text className="description-details">{productDetails.description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {productDetails.price}</Card.Text>
              <Card.Subtitle>Quantity:</Card.Subtitle>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                style={{ marginRight: '10px' }}
              />
              {user.id !== null ? (
                <>
                  <Button
                    variant="success"
                    className="mr-2"
                    onClick={purchase}
                  >
                    Purchase
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => navigate('/products')}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Link className="btn btn-primary btn-block" to="/login">
                  Log in to Buy Now
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
