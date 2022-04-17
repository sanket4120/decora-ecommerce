import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './auth.css';
import { validateLogin, validateLoginField } from '../../utils/validate';
import { useUser } from '../../context/authContext';
import { useMessage } from '../../context/messageContext';
import { login } from '../../actions/authActions';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const {
    authState: { isAuthenticated, loading },
    setAuth,
  } = useUser();
  const { setMessages } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [navigate, from, isAuthenticated]);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const loginWithTestCredentials = () => {
    const loginCredentials = { email: 'john@gmail.com', password: '123456' };
    login(setAuth, setMessages, loginCredentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateLogin(formData);

    if (isValid) {
      const { email, password } = formData;
      const loginCredentials = {
        email,
        password,
      };

      login(setAuth, setMessages, loginCredentials);

      setFormData({
        email: '',
        password: '',
        errors: {
          email: '',
          password: '',
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
    const error = validateLoginField(name, value, formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...formData.errors, [name]: error },
    }));
  };

  const { email, password, errors } = formData;

  return (
    <main className='minheight flex align-items-center'>
      <div className='auth-container mx-auto w-100 my-6'>
        <div className='flex justify-content-evenly mb-6'>
          <h2 className='fw-normal txt-secondary'>
            <Link to='/signup' state={{ from }}>
              Register
            </Link>
          </h2>
          <h2 className='fw-normal txt-primary'>
            <Link to='/login' state={{ from }}>
              Login
            </Link>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='label'>
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
            <div className='input-has-icon'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`input ${errors.password && 'border-danger'}`}
                name='password'
                id='password'
                value={password}
                onChange={handleChange}
              />
              {showPassword ? (
                <i
                  className='fa-regular fa-eye mr-2 cursor-pointer'
                  onClick={handleShowPassword}
                ></i>
              ) : (
                <i
                  className='fa-regular fa-eye-slash mr-2 cursor-pointer'
                  onClick={handleShowPassword}
                ></i>
              )}
            </div>
            <span className='message txt-danger'>{errors.password}</span>
          </div>

          <button
            className='btn btn-outline-primary mb-3 w-100'
            disabled={loading}
            onClick={loginWithTestCredentials}
          >
            {loading ? (
              <i className='fa-solid fa-circle-notch fa-spin'></i>
            ) : (
              'Login With Test Credentials'
            )}
          </button>

          <button className='btn btn-primary w-100' disabled={loading}>
            {loading ? (
              <i className='fa-solid fa-circle-notch fa-spin'></i>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
