import Slider from 'react-slick';
import { useGetCategories } from '../../actions/categoryActions';
import { categoryCarouselSettings } from '../../config/sliderSettings';
import CategoryCard from '../cards/categoryCard/CategoryCard';

function CategoryCarousel() {
  const { categories } = useGetCategories();

  return (
    <Slider {...categoryCarouselSettings}>
      {categories.map((category) => (
        <CategoryCard category={category} key={category._id} />
      ))}
    </Slider>
  );
}

export default CategoryCarousel;
