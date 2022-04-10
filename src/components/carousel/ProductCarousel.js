import Slider from 'react-slick';
import Banner from '../banner/Banner';
import { useGetTopProducts } from '../../actions/productActions';
import { productSliderSettings } from '../../config/sliderSettings';

function ProductCarousel() {
  const { products } = useGetTopProducts();

  return (
    <Slider {...productSliderSettings}>
      {products.map((banner) => (
        <Banner banner={banner} key={banner.title} />
      ))}
    </Slider>
  );
}

export default ProductCarousel;
