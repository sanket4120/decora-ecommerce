import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addUserAddress,
  updateUserAddress,
} from '../../../actions/userActions';
import { useMessage } from '../../../context/messageContext';
import { useUser } from '../../../context/userContext';
import { validateAddress, validateAddressField } from '../../../utils/validate';
import './new-address.css';

const NewAddress = () => {
  const {
    addressState: { loading },
    setAddress,
  } = useUser();
  const { setMessages } = useMessage();
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    city: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    errors: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      state: '',
      city: '',
      pincode: '',
      addressLine1: '',
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const address = location?.state?.address;
  const from = location?.state?.from;

  useEffect(() => {
    if (address) {
      const addressData = { ...address };
      setFormData((prevState) => ({
        ...prevState,
        ...addressData,
      }));
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateAddressField(name, value, formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...formData.errors, [name]: error },
    }));

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateAddress(formData);

    if (isValid) {
      const addressDetails = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
      };

      address
        ? updateUserAddress(
            setAddress,
            setMessages,
            address._id,
            addressDetails
          )
        : addUserAddress(setAddress, setMessages, addressDetails);

      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        state: '',
        city: '',
        pincode: '',
        addressLine1: '',
        addressLine2: '',
        errors: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          state: '',
          city: '',
          pincode: '',
          addressLine1: '',
        },
      });
      from && navigate(from, { replace: true });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, ...errors },
      }));
    }
  };

  const {
    title,
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    pincode,
    addressLine1,
    addressLine2,
    errors,
  } = formData;

  return (
    <form className='new-address-container' onSubmit={handleAddressSubmit}>
      <div className='mb-3'>
        <label htmlFor='title' className='label'>
          Title (optional)
        </label>
        <input
          type='text'
          className='input'
          placeholder='e.g My office address'
          value={title}
          name='title'
          onChange={handleChange}
        />
      </div>
      <div className='grid gap-2 mb-3'>
        <div className='col-6'>
          <label htmlFor='firstName' className='label'>
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            className={`input ${errors.firstName && 'border-danger'}`}
            value={firstName}
            onChange={handleChange}
          />
          <span className='message txt-danger'>{errors.firstName}</span>
        </div>
        <div className='col-6'>
          <label htmlFor='lastName' className='label'>
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            className={`input ${errors.lastName && 'border-danger'}`}
            value={lastName}
            onChange={handleChange}
          />
          <span className='message txt-danger'>{errors.lastName}</span>
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='phone-number' className='label'>
          Phone number
        </label>
        <input
          type='number'
          id='phone-number'
          name='phoneNumber'
          className={`input ${errors.phoneNumber && 'border-danger'}`}
          value={phoneNumber}
          onChange={handleChange}
        />
        <span className='message txt-danger'>{errors.phoneNumber}</span>
      </div>

      <div className='mb-3'>
        <label htmlFor='state' className='label'>
          State
        </label>
        <input
          type='text'
          id='state'
          name='state'
          className={`input ${errors.state && 'border-danger'}`}
          value={state}
          onChange={handleChange}
        />
        <span className='message txt-danger'>{errors.state}</span>
      </div>
      <div className='mb-3'>
        <label htmlFor='city' className='label'>
          City
        </label>
        <input
          type='text'
          id='city'
          name='city'
          className={`input ${errors.city && 'border-danger'}`}
          value={city}
          onChange={handleChange}
        />
        <span className='message txt-danger'>{errors.city}</span>
      </div>
      <div className='mb-3'>
        <label htmlFor='pincode' className='label'>
          Pincode
        </label>
        <input
          type='number'
          id='pincode'
          name='pincode'
          className={`input ${errors.pincode && 'border-danger'}`}
          value={pincode}
          onChange={handleChange}
        />
        <span className='message txt-danger'>{errors.pincode}</span>
      </div>
      <div className='mb-3'>
        <label htmlFor='address-line-1' className='label'>
          Address line 1
        </label>
        <input
          type='text'
          id='address-line-1'
          name='addressLine1'
          className={`input ${errors.addressLine1 && 'border-danger'}`}
          value={addressLine1}
          onChange={handleChange}
        />
        <span className='message txt-danger'>{errors.addressLine1}</span>
      </div>
      <div className='mb-3'>
        <label htmlFor='address-line-2' className='label'>
          Address line 2 (optional)
        </label>
        <input
          type='text'
          id='address-line-2'
          name='addressLine2'
          className='input'
          value={addressLine2}
          onChange={handleChange}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary w-100'
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
};

export default NewAddress;
