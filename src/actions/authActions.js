import axios from 'axios';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/authConstants';
import { setMessage } from './messageActions';

export const signup = async (dispatch, setMessages, userDetails) => {
  dispatch({ type: USER_SIGNUP_REQUEST });

  try {
    const res = await axios.post('/api/auth/signup', {
      ...userDetails,
    });

    const { createdUser, encodedToken } = res.data;

    localStorage.setItem('token', encodedToken);

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: createdUser });
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: USER_SIGNUP_FAIL, payload: errors });
  }
};

export const login = async (dispatch, setMessages, loginCredentials) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const res = await axios.post('/api/auth/login', {
      ...loginCredentials,
    });

    const { foundUser, encodedToken } = res.data;

    localStorage.setItem('token', encodedToken);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: foundUser });
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: USER_LOGIN_FAIL, payload: errors });
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: USER_LOGOUT });
};
