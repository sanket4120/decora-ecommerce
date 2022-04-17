import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useUser } from '../../context/authContext';
import './navbar.css';

function Navbar() {
  const {
    authState: { isAuthenticated, userInfo },
    setAuth,
  } = useUser();

  const handleLogout = () => {
    logout(setAuth);
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
              <i className='fa-regular fa-user mr-2'></i>
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
                <i className='fa-regular fa-user'></i>
              </NavLink>
            </li>
          )}
          <li className='navbar-item badge-container'>
            <NavLink to='/wishlist'>
              <i className='fa-regular fa-heart'></i>
            </NavLink>
            <span className='badge'>4</span>
          </li>
          <li className='navbar-item badge-container'>
            <NavLink to='/cart'>
              <i className='fa-solid fa-bag-shopping'></i>
            </NavLink>
            <span className='badge'>4</span>
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
