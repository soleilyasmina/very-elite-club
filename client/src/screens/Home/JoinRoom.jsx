import React, { useState } from 'react';

const JoinRoom = (props) => {
  const [username, updateUsername] = useState('');
  const [code, updateCode] = useState('');
  const [password, updatePassword] = useState('');

  const { connection } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: 'joinRoom',
      data: {
        username,
        password,
        code,
      },
    };
    connection.send(JSON.stringify(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username:</label>
      <input 
        maxLength="12"
        name="username" 
        onChange={(e) => updateUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="code">code:</label>
      <input 
        maxLength="4"
        name="code" 
        onChange={(e) => updateCode(e.target.value)} 
        value={code}
      />
      <label htmlFor="password">password:</label>
      <input 
        maxLength="6"
        name="password" 
        onChange={(e) => updatePassword(e.target.value)} 
        value={password}
      />
      <button type="submit">Let's Go!</button>
    </form>
  )
}

export default JoinRoom;
