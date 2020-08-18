import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const Home = (props) => {
  const [isJoin, updateIsJoin] = useState(true);
  const [name, updateName] = useState('');
  const [isPrivate, updateIsPrivate] = useState(false);
  const [code, updateCode] = useState('');
  const [password, updatePassword] = useState('');
  const [errorMessage, updateErrorMessage] = useState('');
  const { socket } = props;

  return (
    <section className="home">
      <button onClick={() => updateIsJoin(true)}>
        Join Room
      </button>
      <button onClick={() => updateIsJoin(false)}>
        Create Room
      </button>
      <h4>{errorMessage}</h4>
      {
        isJoin
          ? <JoinRoom
            socket={socket}
            code={code}
            name={name}
            password={password}
            updateCode={updateCode}
            updateErrorMessage={updateErrorMessage}
            updateName={updateName}
            updatePassword={updatePassword}
          />
          : <CreateRoom
            socket={socket}
            isPrivate={isPrivate}
            name={name}
            updateErrorMessage={updateErrorMessage}
            updateIsPrivate={updateIsPrivate}
            updateName={updateName}
          />
      }
    </section>
  );
};

export default Home;
