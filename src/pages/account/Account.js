import { NavLink, Outlet } from 'react-router-dom';
import './account.css';

const Account = () => {
  return (
    <section className='minheight my-6'>
      <div
        className='grid gap-1'
        style={{ gridTemplateRows: 'minmax(1px, auto) 1fr' }}
      >
        <aside className='col-lg-3 col-md-4 col-12'>
          <ul className='list-unstyled account-nav'>
            <li className='list-item'>
              <NavLink to='/account' end>
                <i className='fa-solid fa-user mr-2'></i> My details
              </NavLink>
            </li>
            <li className='list-item'>
              <NavLink to='/account/address'>
                <i className='fa-solid fa-location-dot mr-2'></i> My address
                book
              </NavLink>
            </li>
            <li className='list-item'>
              <NavLink to='/account/orders'>
                <i className='fa-solid fa-bag-shopping mr-2'></i>
                My orders
              </NavLink>
            </li>
          </ul>
        </aside>
        <main className='col-lg-9 col-md-8 col-12'>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Account;
