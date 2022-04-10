import React from 'react';
import './product-card.css';

function ProductCard({ product }) {
  return (
    <div className='card'>
      <img
        src={product.image}
        alt={product.title}
        className='card-image'
        loading='lazy'
      />
      <div className='card-body txt-center'>
        <p>{product.title}</p>
        <p>
          {product.discountPrice ? (
            <>
              <span className='txt-deleted txt-secondary mr-1'>
                Rs {product.price}
              </span>
              <span className='txt-primary'>Rs {product.discountPrice}</span>
            </>
          ) : (
            <span>Rs {product.price}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
