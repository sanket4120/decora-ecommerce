import { useUser } from '../../context/userContext';

const User = () => {
  const {
    authState: { userInfo },
  } = useUser();

  return (
    <>
      <div className='txt-center mb-5'>
        <h1 className='size-2'>Profile</h1>
      </div>

      <div className='mb-3 grid gap-1'>
        <div className='col-6'>
          <p>
            <span className='fw-medium txt-secondary'>First Name</span>
            <br />
            <span>{userInfo.firstName}</span>
          </p>
        </div>
        <div className='col-6'>
          <p>
            <span className='fw-medium txt-secondary'>Last Name</span>
            <br />
            <span>{userInfo.lastName}</span>
          </p>
        </div>
      </div>
      <div className='mb-3'>
        <p>
          <span className='fw-medium txt-secondary'>Email</span>
          <br />
          <span>{userInfo.email}</span>
        </p>
      </div>
    </>
  );
};

export default User;
