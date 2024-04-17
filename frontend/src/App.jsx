import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/register_page";
import LoginPage from "./pages/login_page";
import HomePage from "./pages/home_page";
import ChatPage from "./pages/chat_page";
import PicturePage from "./pages/picture_page";

import ProtectedRoute from "./secure/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/picture" element={<PicturePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
