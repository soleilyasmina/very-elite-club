import React, { useState } from 'react';

const CreateRoom = (props) => {
  const [username, updateUsername] = useState('');
  const [isPrivate, updateIsPrivate] = useState(false);
  const { connection } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: 'createRoom',
      data: {
        username,
        isPrivate,
      },
    };
    connection.send(JSON.stringify(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username:</label>
      <input 
        name="username" 
        onChange={(e) => updateUsername(e.target.value)} maxLength="12"
        value={username}
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
