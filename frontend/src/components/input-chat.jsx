import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

function InputChat({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Mensaje"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button type="submit" className="">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default InputChat;
