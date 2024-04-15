import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import data from "../assets/chat-register.json";
import Lottie from "lottie-react";
import { Slide } from "react-awesome-reveal";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuthenticated, error: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
  });

  return (
    <div className="flex h-screen items-center bg-zinc-200">
      <div className="flex-1">
        <Lottie animationData={data} loop= {true}/>
      </div>
      <div className="flex-1 flex justify-center">
        <Slide direction="down">
        <div className="bg-zinc-800 max-w-md p-10 rounded-3xl shadow-2xl">
          {registerErrors &&
            registerErrors.length > 0 &&
            registerErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </div>
            ))}
          <form onSubmit={onSubmit} className="text-center">
            <h1 className="text-white font-bold text-2xl mb-4">
              Crear una Cuenta
            </h1>
            <input
              type="text"
              name="username"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Nombre de Usuario"
            />
            {errors.username && (
              <p className="text-red-500">EL nombre de usuario es requerido</p>
            )}
            <input
              type="text"
              name="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">El Email es requerido</p>
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
              Registrarte
            </button>
          </form>
          <p className="mt-2 text-white">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-sky-500">
              Iniciar Sesión
            </Link>
          </p>
        </div>
        </Slide>
      </div>
    </div>
  );
}

export default RegisterPage;
