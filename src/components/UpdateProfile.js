import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateProfile = ({ onUpdateSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ firstName, lastName, mobileNo }),
      });

      if (response.ok) {
        onUpdateSuccess();

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
        });
      } else {
        console.error('Error updating profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  return (
    <div className="container">
      <h3>Update Profile</h3>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name:</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name:</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-3" >
        <label htmlFor="mobileNo" className="form-label">Mobile No:</label>
        <input
          type="text"
          id="mobileNo"
          className="form-control"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default UpdateProfile;