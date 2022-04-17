import { createContext, useContext, useReducer } from 'react';
import { initialState, messageReducer } from '../reducers/messageReducer';

const MessageContext = createContext(initialState);

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useReducer(messageReducer, initialState);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

export default MessageProvider;
