import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { urlToBase64 } from "../secure/base64";
import reactlogo from "../assets/reactlogo.png";
import { PerfilePicChat } from "./perfile-pic-chat";

function ContactsChat({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    urlToBase64(reactlogo)
      .then((data) => {
        console.log(data);
        setCurrentUserImage(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {currentUserName && (
        <div>
          <div
            className="mb-4 ml-2 mt-3 rounded-lg p-4 bg-zinc-800 flex"
            id="usuario"
          >
            <div className="flex items-center">
              <PerfilePicChat base64={currentUserImage} />
              <h2 className="text-white font-bold text-lg ml-4">
                {currentUserName}
              </h2>
            </div>
            <div
              className="ml-auto mr-2 bg-blue-500 px-4 py-2 flex justify-center items-center rounded-xl cursor-pointer"
              onClick={handleLogout}
            >
              <TbLogout2 className="text-white" />
            </div>
          </div>
          <section className="ml-2 bg-zinc-800 rounded-xl pt-4 pb-4">
            <div className="justify-center">
              <h1 className="text-xl font-ligh text-white text-center">
                Contactos
              </h1>
            </div>
            <div className="m-4 contacts-list-container overflow-y-auto">
              {contacts.map((contact, index) => (
                <div
                  className={`rounded-2xl bg-blue-500 text-white m-4 p-3 hover:bg-blue-600 text-xl contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={contact._id}
                  onClick={() => handleChatChange(index, contact)}
                >
                  <div>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ContactsChat;
