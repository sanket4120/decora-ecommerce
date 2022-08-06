import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { useUser } from '../../context/userContext';
import './navbar.css';

function Navbar() {
  const {
    authState: { isAuthenticated, userInfo },
    wishlistState: { wishlist },
    cartState: { cart },
    setAuth,
  } = useUser();

  const handleLogout = () => {
    logout(setAuth);
    document.location.href = '/';
  };

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
          {isAuthenticated ? (
            <li className='navbar-item dropdown'>
              <i className='fa-solid fa-user mr-2'></i>
              <span className='txt-capitalize'>Hello {userInfo.firstName}</span>

              <ul className='dropdown-menu'>
                <li className='dropdown-item'>
                  <NavLink to='/account' className='block'>
                    Account
                  </NavLink>
                </li>
                <li className='dropdown-item' onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </li>
          ) : (
            <li className='navbar-item badge-container'>
              <NavLink to='/login'>
                <i className='fa-solid fa-user'></i>
              </NavLink>
            </li>
          )}
          <li className='navbar-item badge-container'>
            <NavLink to='/wishlist'>
              <i className='fa-solid fa-heart'></i>
            </NavLink>
            <span className='badge'>{wishlist ? wishlist.length : '0'}</span>
          </li>
          <li className='navbar-item badge-container'>
            <NavLink to='/cart'>
              <i className='fa-solid fa-bag-shopping'></i>
            </NavLink>
            <span className='badge'>{cart ? cart.length : '0'}</span>
          </li>
          <li
            className='navbar-item navbar-toggler'
            id='navbar-toggler'
            data-toggle='#menu'
          >
            <i className='fa-solid fa-bars'></i>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
