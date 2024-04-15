import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import data from "../assets/chat-login.json";
import { Slide } from "react-awesome-reveal";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrros, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen justify-center items-center bg-zinc-200">
      <div className="flex-1 flex justify-center">
        <Slide direction="down">
          <div className="bg-zinc-800 max-w-md p-10 rounded-3xl shadow-2xl">
            {signinErrros &&
              signinErrros.length > 0 &&
              signinErrros.map((error, i) => (
                <div className="bg-red-500 p-2 text-white" key={i}>
                  {error}
                </div>
              ))}
            <h1 className="text-white font-bold text-2xl mb-4"> Bienvenido </h1>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="username"
                {...register("username", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Nombre de Usuario"
              />
              {errors.username && (
                <p className="text-red-500">
                  EL nombre de usuario es requerido
                </p>
              )}
              <input
                type="password"
                name="password"
                {...register("password", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="text-red-500">La contraseña es requerida</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Iniciar Sesión
              </button>
            </form>

            <p className="mt-2 text-white">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-sky-500">
                Crear una cuenta
              </Link>
            </p>
          </div>
        </Slide>
      </div>
      <div className="flex-1">
        <Lottie animationData={data} loop={true} />
      </div>
    </div>
  );
}

export default LoginPage;
