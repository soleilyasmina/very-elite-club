import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './screens/Home';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, updateUser] = useState(null);
  const [room, updateRoom] = useState(null);

  useEffect(() => {
    const newSocket = io(`ws://127.0.0.1:${process.env.PORT || 3030}`);
    newSocket.on('room created', (res) => {
      updateRoom(res);
      updateUser(res.members[0]);
    });
    newSocket.on('room joined', (res) => {
      updateRoom(res);
      updateUser(res.members.find((m) => m.socketId === newSocket.id));
    });
    newSocket.on('room updated', (res) => {
      updateRoom(res);
    });
    newSocket.on('error', (res) => {
      console.log(res);
    });
    setSocket(newSocket);
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home socket={socket} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
