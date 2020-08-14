import React, { useEffect, useState } from 'react';

const Room = (props) => {
  const [expires, updateExpires] = useState(null);
  const { socket, room, user } = props;

  useEffect(() => {
    clearInterval(expires);
    if (room) {
      updateExpires(setInterval(() => {
        socket.emit('ttl room', room);
      }, 60000));
    }
  }, [room, socket]);
  if (!room) return null;
  return (
    <div>
      <h2>Host: {room.members.find((mem) => mem.host === true).name}</h2>
      <h3>Code: {room.code}</h3>
      {room.password && <h4>Password: {room.password}</h4>}
      <h5>{user.name}</h5>
      <ul>
        {room.members.map((mem) => <li>{mem.name}</li>)}
      </ul>
    </div>
  );
};

export default Room;
