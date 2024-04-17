import ContactsChat from "../components/contacts-chat";
import WelcomeChat from "../components/welcome-chat";
import { useEffect, useState, useRef } from "react";
import { getAllUsers } from "../api/users";
import decodeJWT from "../secure/jwtDecode";
import ContainerChat from "../components/container-chat";
import { io } from "socket.io-client";

function ChatPage() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const CU = async () => {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    };
    CU();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1];
        const id = decodeJWT(token);
        const res = await getAllUsers(id);
        setContacts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="bg-zinc-300 flex">
      <div className="w-1/4 flex-grow-0">

        <ContactsChat
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
      </div>
      <div className="w-3/4 flex-grow">
        {isLoaded && currentChat === undefined ? (
          <WelcomeChat currentUser={currentUser} />
        ) : (
          <ContainerChat
            currentChat={currentChat}
            socket={socket}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
