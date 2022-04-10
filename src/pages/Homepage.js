import React from 'react';
import Footer from '../components/footer/Footer';
import Searchbar from '../components/searchbar/Searchbar';
import ProductCarousel from '../components/carousel/ProductCarousel';
import CategoryCarousel from '../components/carousel/CategoryCarousel';
import ProductCard from '../components/cards/productCard/ProductCard';
import { useGetFeaturedProducts } from '../actions/productActions';

function Homepage() {
  const { products } = useGetFeaturedProducts();

  return (
    <React.Fragment>
      <div className='container'>
        <section className='mt-3 mb-5'>
          <Searchbar />
        </section>

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
                  className='col-6 col-sm-6 col-md-4 col-lg-3'
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Homepage;
