import { Link } from 'react-router-dom';
import {
  removeProductFromCart,
  updateCart,
} from '../../../actions/userActions';
import { useMessage } from '../../../context/messageContext';
import { useUser } from '../../../context/userContext';
import './horizontal-product-card.css';

const HorizontalCard = ({ product }) => {
  const {
    setCart,
    cartState: { loading },
  } = useUser();
  const { setMessages } = useMessage();

  const removeFromCart = () => {
    removeProductFromCart(setCart, setMessages, product);
  };

  const updateProductQuantity = (e) => {
    updateCart(setCart, setMessages, { ...product, qty: e.target.value });
  };

  return (
    <div className='card card-horizontal col-12 relative'>
      <Link to={`/product/${product._id}`}>
        <div className='card-image absolute top-0 start-0 w-100 h-100'>
          <img src={product.image} alt='alt text' className='contain' />
        </div>
      </Link>
      <div className='card-content'>
        <div className='card-body'>
          <Link to={`/product/${product._id}`}>
            <p className='mb-3 size-5'>{product.title}</p>
          </Link>
          <p>{product.discount && `${product.discount} % off`}</p>
          <div className='my-3'>
            <p>
              {product.discountPrice ? (
                <>
                  <span className='txt-deleted txt-secondary mr-1'>
                    Rs {product.price}
                  </span>
                  <span className='txt-primary'>
                    Rs {product.discountPrice}
                  </span>
                </>
              ) : (
                <span>Rs {product.price}</span>
              )}
            </p>
          </div>
          <form>
            <label htmlFor='quantity' className='mr-2'>
              Quantity
            </label>
            <select
              className='input product-quantity'
              id='quantity'
              name='qty'
              value={product.qty}
              onChange={updateProductQuantity}
            >
              {[...Array(product.stock < 5 ? product.stock : 5).keys()].map(
                (x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                )
              )}
            </select>
          </form>
        </div>
        <div className='card-footer'>
          <button
            className='btn btn-secondary w-100'
            disabled={loading}
            onClick={removeFromCart}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
