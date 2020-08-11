import React, { useState } from 'react';
import CreateRoom from './CreateRoom';

const Home = (props) => {
  const [isJoin, updateIsJoin] = useState(true);
  const { connection } = props;

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
          ? null
          : <CreateRoom connection={connection} />
      }
    </section>
  );
};

export default Home;
