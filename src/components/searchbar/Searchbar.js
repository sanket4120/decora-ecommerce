import React from 'react';
import './searchbar.css';

function Searchbar() {
  return (
    <form className='searchbar mx-auto'>
      <div className='input-has-icon'>
        <i className='fa-solid fa-magnifying-glass ml-2'></i>
        <input type='text' className='input' placeholder='Search' />
      </div>
    </form>
  );
}

export default Searchbar;
