import { Link } from "react-router-dom";
import logoImage from "/message.png"; // Importa la imagen aquí

function NavbarHome() {
  return (
    <nav className="bg-zinc-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src={logoImage} alt="Logo" className="h-10 " />
        </Link>
        <div className="flex items-center ">
          <Link to="/login" className="text-white px-4 p-1 hover:bg-blue-500 transition-colors duration-300 rounded-lg">Iniciar Sesion</Link>
          <Link to="/register" className="text-white px-4 p-1 hover:bg-blue-500 transition-colors duration-300 ml-4 rounded-lg">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;
