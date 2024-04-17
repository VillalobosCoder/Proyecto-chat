import { useState, useEffect } from "react";
import { urlToBase64 } from "../secure/base64";
import { MdFileUpload } from "react-icons/md";
import { setPicture } from "../api/users";

function PicturePage() {
  const [imageBase64, setImageBase64] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const CU = async () => {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    };
    CU();
  }, []);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64 = await urlToBase64(URL.createObjectURL(file));
      setImageBase64(base64);
      console.log(base64);
    }
  };

  const handleUpdatePicture = () => {
    async function updatePicture() {
      try {
        await setPicture(currentUser.id, {
          picture: imageBase64,
        });
      } catch (error) {
        console.log(error);
      }
    }
    updatePicture();
    console.log("Picture updated", currentUser.id, imageBase64);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-300">
      <div className="p-8 bg-zinc-800 rounded shadow-md w-1/2 max-w-lg">
        <h1 className="mb-4 text-2xl text-white font-bold">
          Selecciona una nueva imagen de perfil
        </h1>
        <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-500 text-white rounded-xl mb-4 hover:bg-blue-600">
          <MdFileUpload className="w-8 h-8 text-white" />
          <span className="mt-2 text-base leading-normal text-white">
            Seleccionar imagen
          </span>
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
        <div className="mb-4 w-full h-64">
          {imageBase64 ? (
            <img
              src={imageBase64}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-zinc-600 rounded-xl"></div>
          )}
        </div>
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleUpdatePicture}>
          Actualizar foto
        </button>
      </div>
    </div>
  );
}

export default PicturePage;
