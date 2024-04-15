import NavbarHome from "../components/navbar_home";
import Lottie from "lottie-react";
import data from "../assets/home.json";
import { Slide } from "react-awesome-reveal";

function HomePage() {
  return (
    <div className="bg-zinc-300 h-screen w-screen">
      <NavbarHome />
      <Slide duration={1500}>
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-4/6 lg:pr-8 xl:pr-16 bg-zinc-900 text-center p-6 py-14 rounded-2xl shadow-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Bienvenido a TamaliChat
            </h1>
            <p className="text-2xl mb-8 text-white">
              ¡Bienvenido a nuestra comunidad de chat en tiempo real! <br />
              Donde cada mensaje es una oportunidad para conectar <br /> con
              alguien nuevo.
            </p>
          </div>
          <div className="lg:w-1/2 lg:pl-8 xl:pl-16 flex justify-center">
            <div className="rounded-full overflow-hidden border-2 border-gray-200 w-3/4 lg:w-full mx-auto lg:mx-0">
              <Lottie animationData={data} loop={true} className="w-full" />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default HomePage;
