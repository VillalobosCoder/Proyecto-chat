import Lottie from "lottie-react";
import data from "../assets/chat-welcome.json";

function WelcomeChat({ currentUser }) {
  return (
    <div className="h-screen flex justify-center items-center p-4"> 
      <section className="bg-zinc-800 text-white p-4 rounded-xl text-lg font-bold h-full flex flex-col justify-center items-center"> 
        <h1>
          Bienvenido de nuevo, {currentUser.username}!
        </h1>
        <h3>Selecciona algun contacto para iniciar un chat</h3>
        <div className="w-3/4 h-3/4 flex justify-center items-center">
          <Lottie animationData={data} loop={true} />
        </div>
      </section>
    </div>
  );
}

export default WelcomeChat;