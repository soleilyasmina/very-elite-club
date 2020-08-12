import React, { useState } from 'react';

const CreateRoom = (props) => {
  const [name, updateName] = useState('');
  const [isPrivate, updateIsPrivate] = useState(false);
  const { socket } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    socket.emit('create room', {
      name,
      isPrivate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        name="name"
        onChange={(e) => updateName(e.target.value)} maxLength="12"
        value={name}
      />
      <label htmlFor="isPrivate">private?</label>
      <input
        type="checkbox"
        checked={isPrivate}
        onChange={() => updateIsPrivate(!isPrivate)}
      />
      <button type="submit">Let's Go!</button>
    </form>
  )
}

export default CreateRoom;
