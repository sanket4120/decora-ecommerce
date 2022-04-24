import './product-card.css';
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../../actions/userActions';
import { useUser } from '../../../context/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMessage } from '../../../context/messageContext';

function ProductCard({ product, showDetails }) {
  const {
    authState: { isAuthenticated },
    wishlistState: { wishlist, loading },
    setWishlist,
  } = useUser();
  const { setMessages } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  let isInWishlist = false;
  if (wishlist) {
    if (wishlist.some((wishlistProduct) => wishlistProduct._id === product._id))
      isInWishlist = true;
  }

  const handleClick = () => {
    if (isAuthenticated) {
      isInWishlist
        ? removeProductFromWishlist(setWishlist, setMessages, product._id)
        : addProductToWishlist(setWishlist, setMessages, product);
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return (
    <div className='card flex-grow-1'>
      {product.discount && (
        <span className='badge bg-primary rounded card-badge-top-start'>
          {product.discount}% off
        </span>
      )}

      {showDetails && (
        <button
          className={`btn btn-white icon-rounded card-badge-top-end ${
            isInWishlist && 'bg-primary'
          }`}
          disabled={loading}
          onClick={handleClick}
        >
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
