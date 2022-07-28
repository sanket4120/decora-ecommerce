import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const Orders = () => {
  const {
    ordersState: { orders },
  } = useUser();

  return (
    <>
      {orders ? (
        <main>
          <div className='txt-center mb-5'>
            <h1 className='size-2'>My Orders</h1>
            <p>Manage your orders or view their progress</p>
          </div>
          <table className='txt-center' border='true'>
            <thead>
              <tr>
                <th>Ordered Items</th>
                <th>Date</th>
                <th>status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <ul className='txt-start p-1'>
                      {order?.items.map((item) => (
                        <li key={item._id}>{item.title}</li>
                      ))}
                    </ul>
                  </td>
                  <td>13/02/2022</td>
                  <td>Yet to deliver</td>
                  <td className='p-1'>
                    <Link to={`/account/orders/${order._id}`}>
                      <button className='btn btn-sm btn-primary'>
                        View Order
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      ) : (
        <main className='txt-center mt-6'>
          <h1 className='mb-3'>No orders yet</h1>
          <Link to='/shop'>
            <button className='btn btn-primary'> Continue Shopping </button>
          </Link>
        </main>
      )}
    </>
  );
};

export default Orders;
