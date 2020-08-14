import React, { useEffect, useState } from 'react';
import Chatbox from '../../components/shared/Chatbox';

const Room = (props) => {
  const { socket, room, user } = props;

  if (!room) return null;
  return (
    <div>
      <div>
      <h2>Host: {room.members.find((mem) => mem.host === true).name}</h2>
      <h3>Code: {room.code}</h3>
      {room.password && <h4>Password: {room.password}</h4>}
      <h5>{user.name}</h5>
      <ul>
        {room.members.map((mem) => <li>{mem.name}</li>)}
      </ul>
      </div>
      <Chatbox {...props} />
    </div>
  );
};

export default Room;
