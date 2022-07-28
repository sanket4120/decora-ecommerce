import { Link } from 'react-router-dom';
import { deleteUserAddress } from '../../../actions/userActions';
import { useMessage } from '../../../context/messageContext';
import { useUser } from '../../../context/userContext';

const Address = ({ address }) => {
  const { setAddress } = useUser();
  const { setMessages } = useMessage();

  const handleDelete = (address) => {
    deleteUserAddress(setAddress, setMessages, address);
  };

  return (
    <div>
      <div className='flex align-items-center flex-wrap'>
        {address.title && (
          <h4 className='fw-normal mr-2 txt-capitalize'>{address.title}</h4>
        )}

        <Link to='/account/address/new' state={{ address }} className='ml-auto'>
          <button className='btn btn-sm border-none'>
            <i className='fa-regular fa-pen-to-square'></i> Edit
          </button>
        </Link>

        <button
          className='btn btn-sm border-none'
          onClick={() => handleDelete(address)}
        >
          <i className='fa-regular fa-trash-can'></i> Remove
        </button>
      </div>

      <div>
        <p className='txt-capitalize'>
          {address.firstName} {address.lastName}
        </p>
        <p className='txt-capitalize'>
          {address.addressLine1}, {address.addressLine2},{address.city}
          {' - '}
          {address.pincode}, {address.state}
        </p>
        <p className='flex align-items-center'>
          <i className='fa-solid fa-phone mr-2'></i> {address.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default Address;
