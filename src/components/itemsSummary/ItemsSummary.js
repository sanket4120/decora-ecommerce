import './items-summary.css';

const ItemsSummary = ({ items, children }) => {
  const getCartTotal = () =>
    items?.reduce(
      (acc, product) =>
        (acc =
          acc +
          Number(product.qty) * Number(product.discountPrice ?? product.price)),
      0
    );

  return (
    <>
      <h2 className='size-4 mb-3'>Order summary</h2>
      <ul className='list-unstyled border'>
        {items?.map((product) => (
          <li
            className='list-item flex justify-content-between'
            key={product._id}
          >
            <span>
              {product.title} &times; {product.qty}
            </span>
            <span className='ml-2'>
              {product.qty * (product.discountPrice ?? product.price)}
            </span>
          </li>
        ))}
        <li className='list-item flex justify-content-between'>
          <span className='fw-medium'>Total</span>
          <span className='txt-primary'>{getCartTotal()}</span>
        </li>
        <li className='list-item'>{children}</li>
      </ul>
    </>
  );
};

export default ItemsSummary;
