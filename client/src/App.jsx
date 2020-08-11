import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import './App.css';

function App() {
  const [connection, setConnection] = useState(new WebSocket(`ws://127.0.0.1:${process.env.PORT || 3030}`));

  useEffect(() => {
    connection.onopen = (e) => {
      console.info('WebSocket is open now!');
    };

    connection.onclose = (e) => {
      console.log('WebSocket is closed now!');
    };

    connection.onerror = (e) => {
      console.error('WebSocket error observed:', e);
    };

    connection.onmessage = ({ data }) => {
      console.log('%s received!', data);
    };
  }, [connection]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home connection={connection} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
