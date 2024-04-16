import { useEffect, useState } from "react";

function ContactsChat({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && (
        <div>
          <div>
            <h1>Contacts</h1>
          </div>
          <div>
            {contacts.map(
              (
                contact,
                index 
              ) => (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={contact._id}
                  onClick={() => handleChatChange(index,contact)} 
                >
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ContactsChat;
