import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: String,
    password: String,
    isAdmin: Boolean,
    isAbleToDraw: Boolean
})

export default mongoose.model('user', UserModel)