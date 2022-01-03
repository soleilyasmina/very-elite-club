import { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const Home = (props: any) => {
  const [name, updateName] = useState("");
  const [isPrivate, updateIsPrivate] = useState(false);
  const params = useParams();
  const [code, updateCode] = useState(params.inviteCode || "");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const { socket } = props;

  const outletContext = {
    code,
    isPrivate,
    name,
    password,
    socket,
    updateCode,
    updateErrorMessage,
    updateName,
    updatePassword,
    updateIsPrivate,
  }

  const isJoin = location.pathname !== '/create';

  return (
    <section className="home">
      <h1>veryelite.club</h1>
      <div className="home-buttons">
        <button
          className={isJoin ? "home-selected" : ""}
          onClick={() => navigate("/join")}
        >
          Join Room
        </button>
        <button
          className={!isJoin ? "home-selected" : ""}
          onClick={() => navigate("/create")}
        >
          Create Room
        </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Outlet context={outletContext} />
    </section>
  );
};

export default Home;
