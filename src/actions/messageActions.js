import { SET_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants';
import { v4 as uuid } from 'uuid';

export const setMessage = (dispatch, message, messageType) => {
  const id = uuid();
  dispatch({
    type: SET_MESSAGE,
    payload: {
      id: id,
      message,
      messageType,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), 5000);
};
