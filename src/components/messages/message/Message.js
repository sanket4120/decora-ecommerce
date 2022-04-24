import { REMOVE_MESSAGE } from '../../../constants/messageConstants';
import { useMessage } from '../../../context/messageContext';

const Message = ({ message: { id, message, messageType } }) => {
  const { setMessages } = useMessage();

  const removeMessage = () => {
    setMessages({ type: REMOVE_MESSAGE, payload: id });
  };

  return (
    <div className={`toast toast-${messageType}`}>
      {message}
      <i className='fas fa-times toast-close close' onClick={removeMessage}></i>
    </div>
  );
};

export default Message;
