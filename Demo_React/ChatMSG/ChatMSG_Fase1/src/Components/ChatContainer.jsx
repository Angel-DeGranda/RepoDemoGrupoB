import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSocket } from '../hooks/useSocket';
import { useState } from 'react';

const ChatContainer = () => {
  const { messages, sendMessage } = useSocket();
  const [user] = useState(`Usuario-${Math.floor(Math.random() * 100)}`);

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3>Chat en Vivo (Memoria)</h3>
      <p><small>Conectado como: <strong>{user}</strong></small></p>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={(text) => sendMessage(user, text)} />
    </div>
  );
};

export default ChatContainer;