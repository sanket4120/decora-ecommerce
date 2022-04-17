import './product-card.css';

function ProductCard({ product, showDetails }) {
  return (
    <div className='card flex-grow-1'>
      {product.discount && (
        <span className='badge bg-primary rounded card-badge-top-start'>
          {product.discount}% off
        </span>
      )}

      {showDetails && (
        <button className='btn btn-white icon-rounded card-badge-top-end'>
          <i className='fa-regular fa-heart'></i>
        </button>
      )}

      <img
        src={product.image}
        alt={product.title}
        className='card-image rounded'
        loading='lazy'
      />
      <div className='card-body'>
        <p className='flex justify-content-between'>
          <span>{product.title}</span>

          <span className='space-nowrap ml-3'>
            {product.rating}
            <i className='fa-solid fa-star ml-1 txt-warning'></i>
          </span>
        </p>

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

      {showDetails && (
        <div className='card-footer p-0'>
          <button className='btn btn-primary w-100'>Add To Cart</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
