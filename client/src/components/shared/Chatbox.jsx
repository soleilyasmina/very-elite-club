import React, { useState } from 'react';

const Chatbox = (props) => {
  const [content, updateContent] = useState('');
  const { socket, room, user } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', {
      code: room.code,
      content,
      name: user.name,
    });
    updateContent('');
  }

  return (
    <div>
      <div>
        {room.messages.map((msg) => (
          <div>
            <h4><strong>{msg.name}</strong>: {msg.content}</h4>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => updateContent(e.target.value)}
          value={content}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Chatbox;
