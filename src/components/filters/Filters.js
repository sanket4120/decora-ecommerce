import { useEffect } from 'react';
import { getCategories } from '../../actions/categoryActions';
import { useCategory } from '../../context/categoryContext';
import { useProducts } from '../../context/productsContext';
import {
  PRODUCT_LIST_APPLY_FILTER,
  PRODUCT_LIST_REMOVE_FILTER,
} from '../../constants/productConstants';
import './filters.css';
import { useLocation } from 'react-router-dom';

const Filters = () => {
  const {
    state: { categories },
    dispatch,
  } = useCategory();

  const {
    productListState: { filters },
    setProductList,
  } = useProducts();

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const { state } = useLocation();
  const category = state ? state.category : '';
  useEffect(() => {
    setProductList({
      type: PRODUCT_LIST_APPLY_FILTER,
      payload: { category: category },
    });
  }, [setProductList, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductList({
      type: PRODUCT_LIST_APPLY_FILTER,
      payload: { [name]: value },
    });
  };

  const resetFilters = () => {
    setProductList({
      type: PRODUCT_LIST_REMOVE_FILTER,
    });
  };

  return (
    <>
      <button className='mb-5 btn btn-light' onClick={resetFilters}>
        Clear All
      </button>

      <form>
        <div className='mb-5'>
          <h4 className='fw-medium mb-3'>Price</h4>
          <div className='pr-3'>
            <input
              type='range'
              name='price'
              min='322'
              max='20160'
              value={filters.price}
              className='slider'
              onChange={handleChange}
            />
            {filters.price && (
              <span className='txt-primary'>Rs 322 - Rs {filters.price}</span>
            )}
          </div>
        </div>

        <div className='mb-5'>
          <h4 className='fw-medium mb-3'>Categories</h4>
          <ul className='list-unstyled'>
            {categories.map((category) => (
              <li className='list-item txt-capitalize' key={category._id}>
                <input
                  type='radio'
                  name='category'
                  value={category.categoryName}
                  id={category.categoryName}
                  checked={filters.category === category.categoryName}
                  onChange={handleChange}
                  className='hide'
                />
                <label htmlFor={category.categoryName}>
                  {category.categoryName}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-5'>
          <h4 className='fw-medium mb-3'>Sort BY</h4>
          <ul className='list-unstyled'>
            <li className='list-item'>
              <input
                type='radio'
                name='sortBy'
                value='low-to-high'
                checked={filters.sortBy === 'low-to-high'}
                onChange={handleChange}
                id='low-to-high'
                className='hide'
              />
              <label htmlFor='low-to-high'>Price(low to high)</label>
            </li>
            <li className='list-item'>
              <input
                type='radio'
                name='sortBy'
                value='high-to-low'
                checked={filters.sortBy === 'high-to-low'}
                onChange={handleChange}
                id='high-to-low'
                className='hide'
              />
              <label htmlFor='high-to-low'>Price(high to low)</label>
            </li>
          </ul>
        </div>

        <div className='mb-5'>
          <h4 className='fw-medium mb-3'>Rating</h4>
          <ul className='list-unstyled'>
            {['4', '3', '2', '1'].map((rating) => (
              <li className='list-item' key={rating}>
                <input
                  type='radio'
                  value={rating}
                  name='rating'
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onChange={handleChange}
                  className='hide'
                />
                <label htmlFor={`rating-${rating}`}>
                  {rating} <i className='fa-solid fa-star'></i> & above
                </label>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
};

export default Filters;
