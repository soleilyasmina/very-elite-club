import { useContext } from "react";
import { RoomMember } from "types";
import Chatbox from "../../components/shared/Chatbox";
import Invite from "components/shared/Invite";
import { AppContext } from "context";

const Room = (props: any) => {
  const { room, user } = useContext(AppContext);

  if (!room) return null;

  const status = (mem: RoomMember) => {
    if (mem.host) {
      return "(host)";
    } else if (mem.name === user.name) {
      return "(you)";
    }
  };

  return (
    <div className="room">
      <div className="room-info">
        <h3>Room Code: {room.code}</h3>
        {room.password && <h4>Password: {room.password}</h4>}
        <Invite code={room.code} />
        <div className="chatbox-with-members">
          <Chatbox {...props} />
          <ul>
            <em>members:</em>
            {room.members.map((mem: RoomMember) => (
              <li key={mem.name}>
                <span>{mem.name} {status(mem)}{" "}</span>
                <div className={mem.connected ? "online" : "offline"}>◉</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Room;
