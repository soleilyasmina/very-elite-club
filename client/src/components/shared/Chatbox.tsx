import { useEffect, useContext, useState, useRef } from "react";
import { AppContext } from "context";
import { RoomMessage } from "types";

const Chatbox = (props: any) => {
  const [content, updateContent] = useState("");
  const scrollbox = useRef<any>();

  const { socket, room, user } = useContext(AppContext);

  useEffect(() => {
    scrollbox.current.scrollTop = scrollbox.current.scrollHeight;
  }, [room.messages]);

  const handleTyping = (e: any) => {
    const { value } = e.target;
    if (value !== "" && content === "") {
      socket.emit("roomStartTyping", {
        code: room.code,
        name: user.name,
      });
    } else if (value === "" && content !== "") {
      socket.emit("roomStopTyping", {
        code: room.code,
        name: user.name,
      });
    }
    updateContent(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("roomMessage", {
      code: room.code,
      content,
      name: user.name,
    });
    updateContent("");
  };

  const currentlyTyping = () => {
    const notMe = room.typing.filter((t: string) => t !== user.name);
    const [first, second, third] = notMe;
    if (!first) {
      return null;
    } else if (!second) {
      return `${first} is typing.`;
    } else if (!third) {
      return `${first} and ${second} are typing.`;
    } else {
      return "Several people are typing.";
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages" ref={scrollbox}>
        {room.messages.map((msg: RoomMessage) => (
          <div>
            <p className={msg.name === user.name ? "chatbox-you" : ""}>
              <strong>{msg.name}</strong>: {msg.content}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleTyping} value={content} />
        <button type="submit">send</button>
      </form>
      {currentlyTyping()}
    </div>
  );
};

export default Chatbox;
