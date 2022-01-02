import { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const Home = (props: any) => {
  const [isJoin, updateIsJoin] = useState(true);
  const [name, updateName] = useState('');
  const [isPrivate, updateIsPrivate] = useState(false);
  const [code, updateCode] = useState('');
  const [password, updatePassword] = useState('');
  const [errorMessage, updateErrorMessage] = useState('');
  const { socket } = props;

  return (
    <section className="home">
      <div className="home-buttons">
      <button className={isJoin ? 'home-selected' : ''} onClick={() => updateIsJoin(true)}>
        Join Room
      </button>
        <button className={!isJoin ? 'home-selected' : ''} onClick={() => updateIsJoin(false)}>
        Create Room
      </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
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
