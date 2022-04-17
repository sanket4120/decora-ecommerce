import { REMOVE_MESSAGE, SET_MESSAGE } from '../constants/messageConstants';

export const initialState = [];

export const messageReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return [...state, payload];
    case REMOVE_MESSAGE:
      return state.filter((message) => message.id !== payload);
    default:
      return state;
  }
};
