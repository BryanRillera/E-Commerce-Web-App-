import { useState, useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './UserContext';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductView from './pages/ProductView';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminOrders from './pages/AdminOrders';
import Error from './pages/Error';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        
        if (typeof data._id !== 'undefined') {
        
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/adminorders" element={<AdminOrders />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;