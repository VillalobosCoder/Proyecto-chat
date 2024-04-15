import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requiered: true,
        trim: true,
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        requiered: true,
    },
    userPic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true

})

export default mongoose.model('User', userSchema);