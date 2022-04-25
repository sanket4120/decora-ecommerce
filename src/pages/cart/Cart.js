import { Link } from 'react-router-dom';
import HorizontalProductCard from '../../components/cards/horizontalProductCard/HorizontalProductCard';
import { useUser } from '../../context/userContext';
import './cart.css';

const Cart = () => {
  const {
    cartState: { cart },
  } = useUser();

  const getCartTotal = () =>
    cart?.reduce(
      (acc, product) =>
        (acc =
          acc +
          Number(product.qty) * Number(product.discountPrice ?? product.price)),
      0
    );

  return (
    <section className='my-6 minheight'>
      <h1 className='txt-center mb-5 size-2'>My Cart</h1>
      {cart?.length > 0 ? (
        <section className='grid gap-2 minheight'>
          <main className='col-12 col-md-7 col-lg-8'>
            <div className='grid gap-2'>
              {cart?.map((product) => (
                <div className='col-12' key={product._id}>
                  <HorizontalProductCard product={product} />
                </div>
              ))}
            </div>
          </main>

          <aside className='col-12 col-md-5 col-lg-4 checkout'>
            <div className='mb-5'>
              <h4>Apply Coupan</h4>
              <form className='my-3 flex align-items-center'>
                <input
                  type='text'
                  className='input'
                  placeholder='Enter your coupan code'
                />
                <button className='btn btn-secondary ml-1'>APPLY</button>
              </form>
            </div>

            <ul className='list-unstyled border'>
              {cart?.map((product) => (
                <li
                  className='list-item flex justify-content-between'
                  key={product._id}
                >
                  <span>
                    {product.title} &times; {product.qty}
                  </span>
                  <span className='ml-2'>
                    {product.qty * (product.discountPrice ?? product.price)}
                  </span>
                </li>
              ))}
              <li className='list-item flex justify-content-between'>
                <span className='fw-medium'>Total</span>
                <span className='txt-primary'>{getCartTotal()}</span>
              </li>
              <li className='list-item'>
                <button className='btn btn-primary w-100'>
                  Proceed To Checkout
                </button>
              </li>
            </ul>
          </aside>
        </section>
      ) : (
        <section className='txt-center mt-6'>
          <h1 className='mb-3'>Your cart is empty!</h1>
          <p className='mb-3'>Add items to it now</p>
          <Link to='/shop'>
            <button className='btn btn-primary'> Shop now </button>
          </Link>
        </section>
      )}
    </section>
  );
};

export default Cart;
