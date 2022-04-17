import React from 'react';
import './category-card.css';

function CategoryCard({ category }) {
  return (
    <div className='category-card mx-3 relative'>
      <img
        src={category.image}
        alt='furniture'
        className='contain'
        loading='lazy'
      />
      <span className='absolute start-0 bottom-0 bg-white p-1 txt-capitalize'>
        {category.categoryName}
      </span>
    </div>
  );
}

export default CategoryCard;
