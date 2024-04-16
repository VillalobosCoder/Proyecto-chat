import Lottie from "lottie-react";
import data from "../assets/chat-welcome.json";

function WelcomeChat({ currentUser }) {
  return (
    <div>
      <h1>
        Welcome, {currentUser.username}!
      </h1>
      <h3>Please select a chat to start Messaging.</h3>
      <Lottie animationData={data} loop={true} />
    </div>
  );
}

export default WelcomeChat;
