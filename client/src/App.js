import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [connection, setConnection] = useState(new WebSocket(`ws://127.0.0.1:${process.env.PORT || 3030}`));
  const [chatMessages, setChatMessages] = useState([]); 
  const [message, setMessage] = useState('');

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
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };
  }, [connection]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    connection.send(message);
    setMessage('');
  }

  return (
    <div className="App">
      { chatMessages.map((cm) => <h1>{cm}</h1>) }
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={message} />
      </form>
    </div>
  );
}

export default App;
