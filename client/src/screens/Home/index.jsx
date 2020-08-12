import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const Home = (props) => {
  const [isJoin, updateIsJoin] = useState(true);
  const { socket } = props;

  return (
    <section className="home">
      <button onClick={() => updateIsJoin(true)}>
        Join Room
      </button>
      <button onClick={() => updateIsJoin(false)}>
        Create Room
      </button>
      {
        isJoin
          ? <JoinRoom socket={socket} />
          : <CreateRoom socket={socket} />
      }
    </section>
  );
};

export default Home;
