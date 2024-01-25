import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    
    return <p>Loading...</p>;
  }

  if (error) {
    
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {user.isAdmin ? (
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        <UserView productsData={products} />
      )}
    </>
  );
}
