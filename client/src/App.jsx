import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './screens/Home';
import Room from './screens/Room';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, updateUser] = useState(null);
  const [room, updateRoom] = useState(null);
  const history = useHistory();

  useEffect(() => {
    history.push('/');
    const newSocket = io();
    newSocket.on('room closed', (res) => {
      console.log(res.message);
      history.push('/');
      updateRoom(null);
      updateUser(null);
    });
    newSocket.on('room created', (res) => {
      updateRoom(res);
      updateUser(res.members[0]);
      history.push(`/room/${res.code}`);
    });
    newSocket.on('room joined', (res) => {
      updateRoom(res);
      updateUser(res.members.find((m) => m.socketId === newSocket.id));
      history.push(`/room/${res.code}`)
    });
    newSocket.on('room updated', (res) => {
      updateRoom(res);
    });
    newSocket.on('room closed', (res) => {
      history.push('/');
      updateRoom(null);
      updateUser(null);
    });
    newSocket.on('server error', (res) => {
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
        <Route path="/room/:room_code">
          <Room
            room={room}
            socket={socket}
            user={user}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
