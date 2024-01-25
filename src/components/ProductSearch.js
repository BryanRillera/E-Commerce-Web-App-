import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ breed: searchQuery })
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearchPerformed(true);
      } else {
        console.error('Error searching for products:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching for products:', error.message);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-lg-flex align-items-center mb-3">
        <h2 className="mb-lg-0 mr-lg-3" style={{ fontFamily: 'Single Day, sans-serif', marginBottom: '15px' }}>Product Search:</h2>
        <div className="form-group mb-lg-0 flex-grow-1 mr-lg-3">
          <div className="d-flex">
            <input
              type="text"
              placeholder="Insert dog breed"
              id="breed"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="form-control"
              style={{ width: '100%', marginLeft: '10px', marginRight: '10px'}}
            />
            <button className="btn btn-warning" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {searchPerformed && (
        <div className="product-results">
          <h3 className="text-light">Search Results</h3>
          <ul>
            {searchResults.map((product) => (
              <ProductCard productProp={product} key={product._id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
