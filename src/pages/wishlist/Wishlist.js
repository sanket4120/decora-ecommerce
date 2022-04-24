import { Link } from 'react-router-dom';
import useDocumentTitle from '../../utils/useDocumentTitle';
import ProductCard from '../../components/cards/productCard/ProductCard';
import { useUser } from '../../context/userContext';

const Wishlist = () => {
  useDocumentTitle('Wishlist');
  const {
    wishlistState: { wishlist },
  } = useUser();

  return (
    <main className='my-6 minheight'>
      <h1 className='txt-center mb-5 size-2'>Wish List</h1>

      {wishlist?.length > 0 ? (
        <section className='grid gap-2'>
          {wishlist.map((product) => (
            <div
              className='col-6 col-sm-6 col-md-4 col-lg-3 flex flex-column'
              key={product._id}
            >
              <ProductCard product={product} showDetails={true} />
            </div>
          ))}
        </section>
      ) : (
        <section className='txt-center mt-6'>
          <h1 className='mb-3'>You haven't added any products yet</h1>
          <p className='mb-3'>
            Click <i className='fa-solid fa-heart txt-primary'></i> to save
            products
          </p>
          <Link to='/shop'>
            <button className='btn btn-primary'> Find items to save </button>
          </Link>
        </section>
      )}
    </main>
  );
};

export default Wishlist;
