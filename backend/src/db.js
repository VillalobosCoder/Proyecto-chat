import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/proyecto-chat");
        console.log("Conectado a la base de datos");
    }catch(error){
        console.log(error);
    }
}