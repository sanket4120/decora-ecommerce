import { Link } from 'react-router-dom';
import { useUser } from '../../../context/userContext';
import Address from '../address/Address';

const AddressList = () => {
  const {
    addressState: { address },
  } = useUser();

  return (
    <>
      {address.length ? (
        <ul className='list-unstyled'>
          {address?.map((address) => (
            <li className='list-item mb-3 border-bottom' key={address._id}>
              <Address address={address} />
            </li>
          ))}
        </ul>
      ) : (
        <section className='txt-center mt-6'>
          <h3 className='mb-3'>You haven't added any address yet</h3>
          <Link to='/account/address/new'>
            <button className='btn btn-sm btn-primary'> Add Address </button>
          </Link>
        </section>
      )}
    </>
  );
};

export default AddressList;
