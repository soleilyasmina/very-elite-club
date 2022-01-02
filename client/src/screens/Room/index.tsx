import { RoomMember } from 'types';
import Chatbox from '../../components/shared/Chatbox';

const Room = (props: any) => {
  const { socket, room, user } = props;

  if (!room) return null;

  const status = (mem: RoomMember) => {
    if (mem.host) {
      return '(host)';
    } else if (mem.name === user.name) {
      return '(you)';
    }
  }

  return (
    <div className='room'>
      <div className='room-info'>
        <h3>Code: {room.code}</h3>
        {room.password && <h4>Password: {room.password}</h4>}
        <h5>{user.name}</h5>
        <ul>
          {room.members.map((mem: RoomMember) => (
            <li>{mem.name} {status(mem)} <div className={mem.connected ? 'online' : 'offline'}></div></li>
          ))}
        </ul>
      </div>
      <Chatbox {...props} />
    </div>
  );
};

export default Room;
