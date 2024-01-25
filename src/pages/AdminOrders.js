import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/retrieveAll`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching all orders:', error);
        setError('Error fetching all orders. Please try again.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const totalAmount = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <Container
      className="mt-5"
      style={{
        background: 'linear-gradient(45deg, #333333, #1a1a1a)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
      }}
    >
      <h1 className="text-center text-white">Admin Order History</h1>
      <div style={{ margin: '20px' }}>
        <Table striped bordered hover responsive className="table-black-border text-white">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Sold To</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Purchased On</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.soldTo}</td>
                <td>{order.products[0].productId}</td>
                <td>{order.products[0].quantity}</td>
                <td>{order.totalAmount}</td>
                <td>{new Date(order.purchasedOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" style={{ textAlign: 'right' }}><strong>Total Amount of all Orders:</strong></td>
              <td>{totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </Container>
  );
};

export default AdminOrders;
