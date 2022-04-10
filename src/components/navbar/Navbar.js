import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <header>
      <nav className='navbar container'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <h3>Decora</h3>
          </div>
        </div>
        <ul className='navbar-menu' id='menu'>
          <li className='navbar-item txt-center'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='navbar-item txt-center'>
            <NavLink to='/categories'>Categories</NavLink>
          </li>
          <li className='navbar-item txt-center'>
            <NavLink to='/shop'>Shop</NavLink>
          </li>
        </ul>
        <ul>
          <li className='navbar-item icon'>
            <NavLink to='/login'>
              <i className='fa-regular fa-user'></i>
            </NavLink>
          </li>
          <li className='navbar-item icon'>
            <NavLink to='/wishlist'>
              <i className='fa-regular fa-heart'></i>
            </NavLink>
            <span className='badge'>4</span>
          </li>
          <li className='navbar-item icon'>
            <NavLink to='/cart'>
              <i className='fa-solid fa-bag-shopping'></i>
            </NavLink>
            <span className='badge'>4</span>
          </li>
          <li
            className='navbar-item icon navbar-toggler'
            id='navbar-toggler'
            data-toggle='#menu'
          >
            <i className='fa-solid fa-bars icon'></i>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
