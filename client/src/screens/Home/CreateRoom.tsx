import { useOutletContext } from "react-router-dom";

const CreateRoom = (props: any) => {
  const { isPrivate, name, socket, updateErrorMessage, updateIsPrivate, updateName } = useOutletContext<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name) {
      updateErrorMessage('No name provided!');
      setTimeout(() => updateErrorMessage(''), 3000);
    } else {
      socket.emit('roomCreate', {
        name,
        isPrivate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        name="name"
        onChange={(e) => updateName(e.target.value)} maxLength={12}
        value={name}
      />
      <div className="create-private">
        <label htmlFor="isPrivate">private?</label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => updateIsPrivate(!isPrivate)}
        />
      </div>
      <button type="submit">Let's Go!</button>
    </form>
  )
}

export default CreateRoom;
