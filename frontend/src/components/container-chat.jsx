import React, { useState, useEffect, useRef } from "react";
import InputChat from "./input-chat";
import axios from "../api/axios";

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
    console.log(currentChat);
    await axios.post("/addmsg", {
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", { 
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
      socket.current.on("msg-recieved", (msg) => {
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
    <div>
      <h1>
        <div>
          {messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index}>
                <div>
                  <div>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <InputChat  handleSendMsg={handleSendMsg}/>
      </h1>
    </div>
  );
}

export default ContainerChat;
