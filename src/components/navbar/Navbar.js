import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <header>
      <nav className='navbar container'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <h3>
              <Link to='/'>Decora</Link>
            </h3>
          </div>
        </div>
        <ul className='navbar-menu' id='menu'>
          <li className='navbar-item txt-center active'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar-item txt-center'>
            <Link to='/'>Categories</Link>
          </li>
          <li className='navbar-item txt-center'>
            <Link to='/'>Shop</Link>
          </li>
        </ul>
        <ul>
          <li className='navbar-item icon'>
            <Link to='/'>
              <i className='fa-regular fa-user'></i>
            </Link>
          </li>
          <li className='navbar-item icon'>
            <Link to='/'>
              <i className='fa-regular fa-heart'></i>
            </Link>
            <span className='badge'>4</span>
          </li>
          <li className='navbar-item icon'>
            <Link to='/'>
              <i className='fa-solid fa-bag-shopping'></i>
            </Link>
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
