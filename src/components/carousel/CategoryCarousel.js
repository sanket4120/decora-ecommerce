import Slider from 'react-slick';
import { useEffect } from 'react';
import { getCategories } from '../../actions/categoryActions';
import { categoryCarouselSettings } from '../../config/sliderSettings';
import CategoryCard from '../cards/categoryCard/CategoryCard';
import { useCategory } from '../../context/categoryContext';
import { Link } from 'react-router-dom';

function CategoryCarousel() {
  const {
    state: { categories },
    dispatch,
  } = useCategory();

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  return (
    <Slider {...categoryCarouselSettings}>
      {categories.map((category) => (
        <Link
          to='/shop'
          state={{ category: category.categoryName }}
          key={category._id}
        >
          <CategoryCard category={category} />
        </Link>
      ))}
    </Slider>
  );
}

export default CategoryCarousel;
