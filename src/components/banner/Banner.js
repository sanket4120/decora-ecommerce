import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';

function Banner({ product }) {
  return (
    <div className='carousel-banner grid rounded'>
      <div className='carousel-banner-image col-5'>
        <img src={product.image} alt={product.title} className='contain' />
      </div>
      <div className='carousel-banner-desc col-7 p-3 flex flex-column align-items-start justify-content-center'>
        <p className='fw-medium carousel-banner-desc-title'>{product.title}</p>
        <Link to={`/product/${product._id}`}>
          <button className='btn btn-primary rounded-full mt-3 flex align-items-center'>
            Shop Now <i className='fa-solid fa-arrow-right-long ml-2'></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
