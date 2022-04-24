import ProductCarousel from '../../components/carousel/ProductCarousel';
import CategoryCarousel from '../../components/carousel/CategoryCarousel';
import ProductCard from '../../components/cards/productCard/ProductCard';
import { getFeaturedProducts } from '../../actions/productActions';
import { useProducts } from '../../context/productsContext';
import { useEffect } from 'react';

function Homepage() {
  const {
    featuredProductsState: { products },
    setFeaturedProducts,
  } = useProducts();

  useEffect(() => {
    getFeaturedProducts(setFeaturedProducts);
  }, [setFeaturedProducts]);

  return (
    <main>
      <section aria-label='productCarousel' className='mb-6'>
        <ProductCarousel />
      </section>

      <section aria-label='categoryCarousel' className=' mb-6'>
        <h2 className='mb-3 txt-center'>Categories</h2>
        <CategoryCarousel />
      </section>

      <section className=' mb-6'>
        <h2 className='mb-3 txt-center'>Featured Products</h2>
        <div className='grid gap-2'>
          {products.map((product) => (
            <div
              className='col-6 col-sm-6 col-md-4 col-lg-3 flex flex-column'
              key={product._id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Homepage;
