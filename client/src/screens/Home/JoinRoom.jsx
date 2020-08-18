import React, { useState } from 'react';

const JoinRoom = (props) => {
  const { code, name, password, socket, updateErrorMessage, updateCode, updateName, updatePassword } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      updateErrorMessage('No name provided!');
    } else if (!code) {
      updateErrorMessage('No code provided!');
    } else if (code.length < 4) {
      updateErrorMessage('Code too short!');
    } else {
      socket.emit('join room', {
        name,
        password,
        code,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        maxLength="12"
        name="name"
        onChange={(e) => updateName(e.target.value)}
        value={name}
      />
      <label htmlFor="code">code:</label>
      <input
        maxLength="4"
        name="code"
        onChange={(e) => updateCode(e.target.value.toUpperCase())}
        value={code}
      />
      <label htmlFor="password">password:</label>
      <input
        maxLength="6"
        name="password"
        onChange={(e) => updatePassword(e.target.value.toUpperCase())}
        value={password}
      />
      <button type="submit">Let's Go!</button>
    </form>
  )
}

export default JoinRoom;
