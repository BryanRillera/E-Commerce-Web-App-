import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/retrieveOrders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching user orders:', error);
      });
  }, []);

  const totalAmount = userOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <Container className="mt-5" style={{ 
      background: 'linear-gradient(45deg, #333333, #1a1a1a)', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
    }}>
      <h1 className="text-center text-white">Order History</h1>
      <div style={{ margin: '20px' }}>
        <Table striped bordered hover responsive className="table-black-border text-white">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Purchased On</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.products[0].productId}</td>
                <td>{order.products[0].quantity}</td>
                <td>{new Date(order.purchasedOn).toLocaleString()}</td>
                <td>{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}><strong>Total Amount of all Orders:</strong></td>
              <td>{totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </Container>
  );
};

export default Orders;
