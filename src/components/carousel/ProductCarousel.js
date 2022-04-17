import Slider from 'react-slick';
import Banner from '../banner/Banner';
import { getTopProducts } from '../../actions/productActions';
import { productSliderSettings } from '../../config/sliderSettings';
import { useProducts } from '../../context/productsContext';
import { useEffect } from 'react';

function ProductCarousel() {
  const {
    topProductsState: { products },
    setTopProducts,
  } = useProducts();

  useEffect(() => {
    getTopProducts(setTopProducts);
  }, [setTopProducts]);

  return (
    <Slider {...productSliderSettings}>
      {products.map((banner) => (
        <Banner banner={banner} key={banner.title} />
      ))}
    </Slider>
  );
}

export default ProductCarousel;
