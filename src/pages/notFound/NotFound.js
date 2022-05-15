import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='minheight flex flex-column justify-content-center align-items-center'>
      <h1 className='size-1 fw-bold'>404</h1>
      <p className='size-4 mb-3'>Page not found</p>
      <Link to='/'>
        <button className='btn btn-primary'>Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
