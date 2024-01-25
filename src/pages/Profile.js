import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';
import imagecard from '../img/pfp.png';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDetails(data);
        }
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchProfileDetails();
  }, [isProfileUpdated]);

  const handleProfileUpdateSuccess = () => {
    setIsProfileUpdated(!isProfileUpdated);
  };

  return (
    <>
      {user.id === null ? (
        <Navigate to="/products" />
      ) : (
        <>
          <Row className="profile-row">
            <Col className="p-5 bg-dark text-white text-center">
              <img
                src={imagecard}
                alt="Profile"
                className="img-fluid mb-3 rounded-circle" 
                style={{ maxWidth: '150px' }} 
              />
              <h1 className="my-3">Profile</h1>
              {details._id && (
                <>
                  <h2 className="mt-3 text-center">{`${details.firstName} ${details.lastName}`}</h2>
                  <hr />
                  <h4 className="text-center">Contacts</h4>
                  <ul className="list-unstyled text-center">
                    <li>Email: {details.email}</li>
                    <li>Mobile No: {details.mobileNo}</li>
                  </ul>
                </>
              )}
            </Col>
          </Row>
          <Row className="update-row">
            <Col className="p-3 bg-dark text-white">
              <UpdateProfile onUpdateSuccess={handleProfileUpdateSuccess} />
            </Col>
          </Row>
          <Row className="reset-row">
            <Col className="p-3 bg-dark text-white">
              <ResetPassword />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
