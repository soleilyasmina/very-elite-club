import { Route, Routes } from "react-router-dom";
import Home from "screens/Home";
import CreateRoom from "screens/Home/CreateRoom";
import JoinRoom from "screens/Home/JoinRoom";
import Lobby from "screens/Room";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<JoinRoom />} />
          <Route path="create" element={<CreateRoom />} />
          <Route path="join" element={<JoinRoom />} />
          <Route path="join/:inviteCode" element={<JoinRoom />} />
        </Route>
        <Route path="room">
          <Route
            path=":room_code"
            element={<Lobby />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
