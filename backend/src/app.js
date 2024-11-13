import express from "express";
import http from "http";
import morgan from "morgan";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import msgRoutes from "./routes/message_routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", msgRoutes);

const server = http.createServer(app); 
const io = new Server(server, { 
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

global.onlineUsers =  new Map();
 
io.on("connection", (socket) => {
    console.log("Conectado al chat");
    global.chatSocket = socket;
    socket.on("agregarUsuario",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("enviarmsj",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msjrecibido",data.message);
  
        }
    });

});

export default server; 
