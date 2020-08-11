import React, { useState } from 'react';

const Home = (props) => {
  const [isJoin, updateIsJoin] = useState(true);

  return (
    <section className="home">
      <button onClick={() => updateIsJoin(!isJoin)}>
        { isJoin ? 'Join Room' : 'Create Room' }
      </button>
    </section>
  );
};

export default Home;
