import React from 'react';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

export default function ArchiveProduct({ product, isActive, fetchData }) {
    
   const archiveToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === true) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Archived',
          });
         
          fetchData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again',
          });
         
          fetchData();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again.',
        });
      });
  };

   const activateToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === true) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Activated',
          });
         
          fetchData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again',
          });
         
          fetchData();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again.',
        });
      });
  };


   return (
       <>
         {(isActive) ? (
           <Button variant="danger" size="sm" onClick={() => archiveToggle(product._id)}>
             Archive
           </Button>
         ) : (
           <Button variant="success" size="sm" onClick={() => activateToggle(product._id)}>
             Activate
           </Button>
         )}
       </>
     );
   }
