import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const AddressManagement = () => {
  const location = useLocation();

  return (
    <>
      <div className='txt-center mb-5'>
        <h1 className='size-2'>Address Book</h1>
        <p>Add delete or manage addresses to facilitate the buying process</p>
      </div>
      <div className='flex mb-6 justify-content-evenly'>
        <NavLink to='/account/address' end className='size-4'>
          Address list
        </NavLink>
        <NavLink
          to='/account/address/new'
          className='size-4'
          state={{ from: location.pathname }}
        >
          Add address
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default AddressManagement;
