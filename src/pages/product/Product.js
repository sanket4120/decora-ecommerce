import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductDetails } from '../../actions/productActions';
import { useProducts } from '../../context/productsContext';
import { useUser } from '../../context/userContext';
import { useMessage } from '../../context/messageContext';
import Loader from '../../components/loader/Loader';
import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../actions/userActions';

const Product = (props) => {
  const params = useParams();
  const {
    productDetailsState: { product, loading },
    setProductDetails,
  } = useProducts();
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
  let isInCart = false;

  useEffect(() => {
    getProductDetails(setProductDetails, params.productId);
  }, [params.productId, setProductDetails]);

  if (product) {
    if (
      wishlist?.some((wishlistProduct) => wishlistProduct._id === product._id)
    )
      isInWishlist = true;

    if (cart?.some((cartProduct) => cartProduct._id === product._id)) {
      isInCart = true;
    }
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

  return (
    <>
      {loading && <Loader />}
      {!loading && product && (
        <main className='grid my-6 gap-3'>
          <div className='col-md-6 col-12 relative'>
            <button
              className={`btn icon-rounded absolute top-0 end-0 ${
                isInWishlist && 'bg-primary border-none'
              }`}
              disabled={wishlistLoading}
              onClick={toggleWishlist}
            >
              <i className='fa-regular fa-heart'></i>
            </button>
            <img
              src={product.image}
              alt={product.title}
              className='contain'
              style={{ height: '70vh' }}
            />
          </div>
          <div className='col-md-6 col-12 '>
            <h1 className='size-3'>{product.title}</h1>
            <span className='inline-block mb-3 txt-primary'>
              By {product.author}
            </span>

            <p className='mb-3'>
              {product.rating}
              <i className='fa-solid fa-star ml-1 txt-warning'></i>
            </p>
            <div className='mb-3'>
              <p className='txt-primary size-5'>
                Rs {product.discountPrice ?? product.price}
              </p>
              {product.discountPrice && (
                <p className='mt-3'>
                  Save Rs {product.price - product.discountPrice}
                  <span className='txt-deleted ml-1'>Rs {product.price}</span>
                  (Inc of all taxes)
                </p>
              )}
            </div>
            <div className='mb-3'>
              {isInCart ? (
                <Link to='/cart'>
                  <button className='btn btn-primary'>Go To Cart</button>
                </Link>
              ) : (
                <button
                  className={`btn ${
                    product.isInStock ? 'btn-primary' : 'btn-secondary'
                  }`}
                  disabled={cartLoading || !product.isInStock}
                  onClick={addToCart}
                >
                  {product.isInStock ? 'Add To Cart' : 'Out Of Stock'}
                </button>
              )}
            </div>
            <h3 className='mb-3 fw-medium'>Details</h3>
            <ul className='list-unstyled grid'>
              {Object.keys(product.details).map((key, index) => (
                <li className='list-item col-6' key={index}>
                  <span className='txt-secondary'>{key}</span> <br />
                  {product.details[key]}
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default Product;
