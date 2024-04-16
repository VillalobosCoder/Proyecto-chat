import User from "../models/user_model.js";

export const getAllUsers = async (req, res) => { 
    try {
        const users = await User.find({
            _id: { $ne: req.params.id }
        }).select([
            "email",
            "username",
            "userPic",
            "_id"
        ]);
        return res.json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};