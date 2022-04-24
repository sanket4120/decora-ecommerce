import { Link } from 'react-router-dom';
import {
  addProductToWishlist,
  removeProductFromWishlist,
  addProductToCart,
} from '../../../actions/userActions';
import { useUser } from '../../../context/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMessage } from '../../../context/messageContext';
import './product-card.css';

function ProductCard({ product, showDetails }) {
  const {
    authState: { isAuthenticated },
    wishlistState: { wishlist, loading: wishlistLoading },
    cartState: { cart, loading: cartLoading },
    setWishlist,
    setCart,
  } = useUser();
  const { setMessages } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  let isInWishlist = false;
  if (wishlist?.some((wishlistProduct) => wishlistProduct._id === product._id))
    isInWishlist = true;

  let isInCart = false;
  if (cart?.some((cartProduct) => cartProduct._id === product._id)) {
    isInCart = true;
  }

  const toggleWishlist = () => {
    if (isAuthenticated) {
      isInWishlist
        ? removeProductFromWishlist(setWishlist, setMessages, product)
        : addProductToWishlist(setWishlist, setMessages, product);
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  const addToCart = () => {
    if (isAuthenticated) {
      !isInCart && addProductToCart(setCart, setMessages, product);
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  const isInStock = product.stock > 0;

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
          disabled={wishlistLoading}
          onClick={toggleWishlist}
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
          {isInCart ? (
            <Link to='/cart' className='w-100'>
              <button className='btn btn-primary w-100'>Go To Cart</button>
            </Link>
          ) : (
            <button
              className={`btn w-100 ${
                isInStock ? 'btn-primary' : 'btn-secondary'
              }`}
              disabled={cartLoading || !isInStock}
              onClick={addToCart}
            >
              {isInStock ? 'Add To Cart' : 'Out Of Stock'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
