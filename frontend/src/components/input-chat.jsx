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
    <div className=" h-14 flex items-center">
      <form onSubmit={(e) => sendChat(e)} className="flex w-full">
        <input
          className="w-full h-12 bg-zinc-800 p-2 rounded-l-2xl text-white"
          type="text"
          placeholder="Mensaje"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button type="submit" className="bg-blue-500 h-12 w-12 rounded-r-2xl flex items-center justify-center">
          <IoMdSend className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default InputChat;
