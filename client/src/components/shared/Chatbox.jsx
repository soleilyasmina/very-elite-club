import React, { useEffect, useState, useRef } from 'react';

const Chatbox = (props) => {
  const [content, updateContent] = useState('');
  const scrollbox = useRef();

  const { socket, room, user } = props;

  useEffect(() => {
    scrollbox.current.scrollTop = scrollbox.current.scrollHeight;
  }, [room.messages]);

  const handleTyping = (e) => {
    const { value } = e.target;
    if (value !== '' && content === '') {
      socket.emit('start typing', {
        code: room.code,
        name: user.name,
      });
    } else if (value === '' && content !== '') {
      socket.emit('stop typing', {
        code: room.code,
        name: user.name,
      })
    }
    updateContent(value);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', {
      code: room.code,
      content,
      name: user.name,
    });
    updateContent('');
  };

  const currentlyTyping = () => {
    const notMe = room.typing.filter((t) => t !== user.name);
    const [first, second, third] = notMe;
    if (!first) {
      return null;
    } else if (!second) {
      return `${first} is typing.`;
    } else if (!third) {
      return `${first} and ${second} are typing.`;
    } else {
      return 'Several people are typing.';
    }
  };

  return (
    <div className='chatbox'>
      <div className='chatbox-messages'  ref={scrollbox}>
        {room.messages.map((msg) => (
          <div>
            <p className={msg.name === user.name && "chatbox-you"}><strong>{msg.name}</strong>: {msg.content}</p>
          </div>
        ))}
      </div>
      {currentlyTyping()}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTyping}
          value={content}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Chatbox;
