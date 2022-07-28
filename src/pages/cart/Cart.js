import { Link } from 'react-router-dom';
import HorizontalProductCard from '../../components/cards/horizontalProductCard/HorizontalProductCard';
import ItemsSummary from '../../components/itemsSummary/ItemsSummary';
import { useUser } from '../../context/userContext';

const Cart = () => {
  const {
    cartState: { cart },
  } = useUser();

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
            <ItemsSummary items={cart}>
              <Link to='/checkout' className='w-100'>
                <button className='btn btn-primary w-100'>
                  Proceed To Checkout
                </button>
              </Link>
            </ItemsSummary>
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
