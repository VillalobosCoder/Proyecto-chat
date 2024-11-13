import React, { useState, useEffect, useRef } from "react";
import InputChat from "./input-chat";
import axios from "../api/axios";
import { PerfilePicChat } from "./perfile-pic-chat";

function ContainerChat({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post("/getmsg", {
          from: currentUser.id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post("/addmsg", {
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("enviarmsj", {
      to: currentChat._id,
      from: currentUser.id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msjrecibido", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" h-screen flex flex-col p-3">
      <div className="bg-zinc-800 text-white p-4 rounded-xl text-lg font-bold">
        {currentChat && (
          <div className="flex items-center">
            <PerfilePicChat base64={currentChat.userPic} />
            <h1 className="ml-4">{currentChat.username}</h1>
          </div>
        )}
      </div>
      <div className="overflow-y-auto flex-grow bg-zinc-800 rounded-xl mt-2 mb-2 text-white">
        {messages.map((message, index) => (
          <div
            className={`flex ${
              message.fromSelf ? "justify-end" : "justify-start"
            } m-3`}
            key={index}
          >
            <div
              className={`p-2 ${
                message.fromSelf
                  ? "bg-blue-500 p-2 rounded-xl w-2/6"
                  : "bg-sky-700 p-2 rounded-xl w-2/6"
              }`}
              style={{ wordWrap: "break-word" }}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <InputChat handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ContainerChat;
