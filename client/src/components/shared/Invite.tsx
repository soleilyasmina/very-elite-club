import { useRef, useState } from "react";

const Invite = (props: any) => {
  const [message, setMessage] = useState("Copy Invite Link");
  const ref = useRef<any>();
  const link = `https://veryelite.club/join/${props.code}`;

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setMessage("Copied!");
      setTimeout(() => setMessage("Copy Invite Link"), 3000);
    }
  }

  return (
    <div className="invite">
      {navigator.clipboard ? (
        <button ref={ref} className="invite" onClick={copyLink}>
          {message}
        </button>) : <input readOnly value={link} />}
    </div>
  )
}

export default Invite;