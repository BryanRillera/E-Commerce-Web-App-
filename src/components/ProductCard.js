import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ productProp }) => {
  const { _id, breed, description, price, image } = productProp;
  console.log('Image URL:', image);

  return (
    <div className="card my-5 mx-5 bg-dark text-light" id="productcard">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={image} 
            className="card-img"
            alt={`${breed} product-img`} 
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="breed-title">{breed}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text mt-auto">
              <strong>Price:</strong> Php {price}
            </p>
            <Link to={`/products/${_id}`} className="btn btn-info mt-2">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default ProductCard;
