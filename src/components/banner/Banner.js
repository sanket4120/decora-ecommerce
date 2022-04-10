import React from 'react';
import './banner.css';

function Banner({ banner }) {
  return (
    <div className='carousel-banner grid rounded'>
      <div className='carousel-banner-image col-5'>
        <img src={banner.image} alt={banner.title} className='contain' />
      </div>
      <div className='carousel-banner-desc col-7 p-3 flex flex-column align-items-start justify-content-center'>
        <p className='fw-medium carousel-banner-desc-title'>{banner.title}</p>
        <p>{banner.desc}</p>
        <button className='btn btn-primary rounded-full mt-3'>Shop Now</button>
      </div>
    </div>
  );
}

export default Banner;
