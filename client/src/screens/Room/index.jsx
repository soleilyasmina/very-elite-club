import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

const Room = (props) => {
  const { room, user } = props;
  const { room_code } = useParams();
  if (!room || room.code === room_code) {
    return (
      <Redirect to="/" />
    )
  }
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
