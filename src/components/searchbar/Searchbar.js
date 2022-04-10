import React from 'react';
import { useProducts } from '../../context/productsContext';
import './searchbar.css';

function Searchbar() {
  const {
    productListState: { filters },
    setProductList,
  } = useProducts();

  const handleChange = (e) => {
    setProductList({
      type: 'PRODUCT_LIST_APPLY_FILTER',
      payload: { ...filters, searchQuery: e.target.value },
    });
  };

  return (
    <form className='searchbar mx-auto'>
      <div className='input-has-icon'>
        <i className='fa-solid fa-magnifying-glass ml-2'></i>
        <input
          type='text'
          className='input'
          placeholder='Search'
          value={filters.searchQuery}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default Searchbar;
