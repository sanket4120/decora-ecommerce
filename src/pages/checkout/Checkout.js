import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserCart, placeOrder } from '../../actions/userActions';
import Address from '../../components/addressManagement/address/Address';
import ItemsSummary from '../../components/itemsSummary/ItemsSummary';
import { useMessage } from '../../context/messageContext';
import { useUser } from '../../context/userContext';
import { validateCheckout, validateCheckoutField } from '../../utils/validate';
import './checkout.css';

const Checkout = () => {
  const {
    addressState: { address },
    cartState: { cart },
    setCart,
    setOrders,
  } = useUser();
  const { setMessages } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    paymentMethod: '',
    deliveryDetails: '',
    errors: {
      paymentMethod: '',
      deliveryDetails: '',
    },
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateCheckout(formData);
    if (isValid) {
      const deliveryDetails = address.find(
        (address) => address._id === formData.deliveryDetails
      );
      const { paymentMethod } = formData;
      const orderDetails = {
        paymentMethod,
        deliveryDetails,
        items: cart,
      };

      placeOrder(setOrders, setMessages, orderDetails);
      getUserCart(setCart);
      navigate('/account/orders');
    } else {
      setFormData((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, ...errors },
      }));
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const error = validateCheckoutField(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...formData.errors, [name]: error },
    }));
  };

  const { deliveryDetails, paymentMethod, errors } = formData;

  return (
    <section className='my-6 minheight'>
      <h1 className='txt-center mb-5 size-2'>Checkout</h1>

      {cart?.length ?? 0 ? (
        <form>
          <section className='grid gap-2 minheight'>
            <main className='col-12 col-md-7 col-lg-8'>
              <div className='mb-3'>
                <span className='fw-medium block mb-3'>Delivery Address</span>

                {address?.length ?? 0 ? (
                  <ul className='list-unstyled address-container border'>
                    {address?.map((address) => (
                      <li
                        className='list-item mb-3 flex gap-3'
                        key={address._id}
                      >
                        <input
                          type='radio'
                          name='deliveryDetails'
                          onChange={handleChange}
                          value={address._id}
                          checked={address._id === deliveryDetails}
                          id={address._id}
                        />
                        <label htmlFor={address._id} className='flex-grow-1'>
                          <Address address={address} />
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p>You havent added any address yet</p>
                  </>
                )}
                <span className='message txt-danger'>
                  {errors.deliveryDetails}
                </span>

                <Link
                  to='/account/address/new'
                  state={{ from: location.pathname }}
                  className='block'
                >
                  <button className='btn btn-sm btn-secondary my-3'>
                    Add new address
                  </button>
                </Link>
              </div>

              <div className='mb-3'>
                <span className='fw-medium block mb-3'>Payment Method</span>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='cash on delivery'
                  id='cash on delivery'
                  onChange={handleChange}
                  checked={paymentMethod === 'cash on delivery'}
                />
                <label
                  htmlFor='cash on delivery'
                  className='label ml-2 fw-normal'
                >
                  cash on delivery
                </label>
                <span className='message txt-danger block'>
                  {errors.paymentMethod}
                </span>
              </div>
            </main>

            <aside className='col-12 col-md-5 col-lg-4 checkout'>
              <ItemsSummary items={cart}>
                <button
                  className='btn btn-primary w-100'
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </ItemsSummary>
            </aside>
          </section>
        </form>
      ) : (
        <section className='txt-center mt-6'>
          <h1 className='mb-3'>Your cart is empty!</h1>
          <p className='mb-3'>Add items to it now</p>
          <Link to='/shop'>
            <button className='btn btn-primary'> Shop now </button>
          </Link>
        </section>
      )}
    </section>
  );
};

export default Checkout;
