import React, { useState } from 'react';

const CreateRoom = (props) => {
  const { isPrivate, name, socket, updateErrorMessage, updateIsPrivate, updateName } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      updateErrorMessage('No name provided!');
    } else {
      socket.emit('create room', {
        name,
        isPrivate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        name="name"
        onChange={(e) => updateName(e.target.value)} maxLength="12"
        value={name}
      />
      <div className="create-private">
        <label htmlFor="isPrivate">private?</label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => updateIsPrivate(!isPrivate)}
        />
      </div>
      <button type="submit">Let's Go!</button>
    </form>
  )
}

export default CreateRoom;
