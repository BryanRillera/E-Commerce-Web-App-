import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {
  const [productId, setProductId] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); 
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductId(data._id);
        setBreed(data.breed);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image); 
      })
      .catch((error) => {
        console.error(error);
       
      });
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setBreed('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const editProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        breed: breed,
        description: description,
        price: price,
        image: image, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === true) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Updated',
          });
          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again',
          });
          closeEdit();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
        Edit
      </Button>

      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
