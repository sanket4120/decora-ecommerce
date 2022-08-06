import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/userActions';
import { useUser } from '../../context/userContext';
import Loader from '../../components/loader/Loader';

const OrderDetails = () => {
  const {
    orderDetailsState: { orderDetails, loading, error },
    setOrderDetails,
  } = useUser();
  const { orderId } = useParams();

  useEffect(() => {
    getOrderDetails(setOrderDetails, orderId);
  }, [orderId, setOrderDetails]);

  const getCartTotal = () =>
    orderDetails?.items?.reduce(
      (acc, product) =>
        (acc =
          acc +
          Number(product.qty) * Number(product.discountPrice ?? product.price)),
      0
    );

  return (
    <>
      {loading && <Loader />}
      {!loading && !error && orderDetails && (
        <section className='my-6 minheight'>
          <h1 className='txt-center mb-5 size-2'>Order Details</h1>
          <table className='w-100 txt-center mb-5'>
            <thead>
              <tr>
                <th colSpan={2}>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100px' }}
                      className='inline-block mr-2 contain'
                    />
                  </td>
                  <td className='txt-start p-2'>{item.title}</td>
                  <td>{item.qty}</td>
                  <td>{item.discountPrice ?? item.price}</td>
                  <td>{item.qty * (item.discountPrice ?? item.price)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>Total Price</td>
                <td>{getCartTotal()}</td>
              </tr>
            </tbody>
          </table>

          <ul className='list-unstyled'>
            <li className='list-item'>
              <span className='txt-secondary'>Delivery Details</span>
              <div>
                <p className='fw-medium'>
                  {orderDetails?.deliveryDetails?.title}
                </p>

                <p className='txt-capitalize'>
                  {orderDetails?.deliveryDetails?.firstName}{' '}
                  {orderDetails?.deliveryDetails?.lastName}
                </p>
                <p className='txt-capitalize'>
                  {orderDetails?.deliveryDetails?.addressLine1},{' '}
                  {orderDetails?.deliveryDetails?.addressLine2},
                  {orderDetails?.deliveryDetails?.city}
                  {' - '}
                  {orderDetails?.deliveryDetails?.pincode},{' '}
                  {orderDetails?.deliveryDetails?.state}
                </p>
                <p className='flex align-items-center'>
                  <i className='fa-solid fa-phone mr-2'></i>{' '}
                  {orderDetails?.deliveryDetails?.phoneNumber}
                </p>
              </div>
            </li>
            <li className='list-item'>
              <span className='txt-secondary'>Payment Method</span>
              <p>{orderDetails?.paymentMethod}</p>
            </li>
            <li className='list-item'>
              <span className='txt-secondary'>Status</span>
              <p>Yet To Deliver</p>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default OrderDetails;
