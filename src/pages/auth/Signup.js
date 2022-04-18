import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateSignupField, validateSignup } from '../../utils/validate';
import { signup } from '../../actions/userActions';
import { useUser } from '../../context/userContext';
import { useMessage } from '../../context/messageContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    authState: { isAuthenticated, loading },
    setAuth,
  } = useUser();
  const { setMessages } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [navigate, from, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateSignup(formData);

    if (isValid) {
      const { firstName, lastName, email, password } = formData;
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
      };

      signup(setAuth, setMessages, userDetails);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, ...errors },
      }));
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const error = validateSignupField(name, value, formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...formData.errors, [name]: error },
    }));
  };

  const { firstName, lastName, email, password, confirmPassword, errors } =
    formData;

  return (
    <main className='minheight flex align-items-center'>
      <div className='auth-container mx-auto w-100 my-6'>
        <div className='flex justify-content-evenly mb-6'>
          <h2 className='fw-normal txt-primary'>
            <Link to='/signup' state={{ from }}>
              Register
            </Link>
          </h2>
          <h2 className='fw-normal txt-secondary'>
            <Link to='/login' state={{ from }}>
              Login
            </Link>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3 grid gap-1'>
            <div className='col-6'>
              <label htmlFor='firstname' className='label'>
                First Name
              </label>
              <input
                type='text'
                className={`input ${errors.firstName && 'border-danger'}`}
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={handleChange}
              />
              <span className='message txt-danger'>{errors.firstName}</span>
            </div>
            <div className='col-6'>
              <label htmlFor='lastname' className='label'>
                Last Name
              </label>
              <input
                type='text'
                className={`input ${errors.lastName && 'border-danger'}`}
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={handleChange}
              />
              <span className='message txt-danger'>{errors.lastName}</span>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='username' className='label'>
              Email
            </label>
            <input
              type='email'
              className={`input ${errors.email && 'border-danger'}`}
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
            />
            <span className='message txt-danger'>{errors.email}</span>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              className={`input ${errors.password && 'border-danger'}`}
              name='password'
              id='password'
              value={password}
              onChange={handleChange}
            />
            <span className='message txt-danger'>{errors.password}</span>
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='label'>
              Confirm Password
            </label>
            <input
              type='password'
              className={`input ${errors.confirmPassword && 'border-danger'}`}
              name='confirmPassword'
              id='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
            />
            <span className='message txt-danger'>{errors.confirmPassword}</span>
          </div>

          <button className='btn btn-primary w-100' disabled={loading}>
            {loading ? (
              <i className='fa-solid fa-circle-notch fa-spin'></i>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
