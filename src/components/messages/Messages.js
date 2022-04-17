import { useMessage } from '../../context/messageContext';
import Message from './Message';

const Messages = () => {
  const { messages } = useMessage();

  return (
    <div className='fixed end-0'>
      {messages.length > 0 &&
        messages != null &&
        messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  );
};

export default Messages;
