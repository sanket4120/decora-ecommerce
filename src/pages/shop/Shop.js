import { useEffect } from 'react';
import ProductCard from '../../components/cards/productCard/ProductCard';
import Filters from '../../components/filters/Filters';
import Searchbar from '../../components/searchbar/Searchbar';
import Loader from '../../components/loader/Loader';
import { getAllProducts } from '../../actions/productActions';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { useProducts } from '../../context/productsContext';
import './shop.css';

const Shop = () => {
  useDocumentTitle('Shop');

  const {
    productListState: { loading },
    filteredProducts,
    setProductList,
  } = useProducts();

  useEffect(() => {
    getAllProducts(setProductList);
  }, [setProductList]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <section className='mt-3 mb-5'>
            <Searchbar />
          </section>

          <section className=' my-6'>
            <div className='grid gap-1 minheight'>
              <aside className='filters col-12 col-md-3 scrollbar' id='filters'>
                <Filters />
              </aside>

              <main className='products col-12 col-md-9'>
                {filteredProducts.length > 0 && !loading ? (
                  <>
                    <div className='flex align-items-center mb-3'>
                      <p className='inline-block ml-auto'>
                        <span className='txt-primary'>
                          {filteredProducts.length}
                        </span>{' '}
                        Products found
                      </p>
                      <button
                        className='btn ml-2 filter-toggler hide-md'
                        id='navbar-toggler'
                        data-toggle='#filters'
                      >
                        Filter Results
                      </button>
                    </div>
                    <div className='grid gap-2'>
                      {filteredProducts.map((product) => (
                        <div
                          className='col-6 col-sm-6 col-lg-4 flex flex-column'
                          key={product._id}
                        >
                          <ProductCard product={product} showDetails={true} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <h1 className='txt-center'>Sorry, no results found!</h1>
                )}
              </main>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Shop;
