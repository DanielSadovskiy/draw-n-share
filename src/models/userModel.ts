import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: String,
    password: String
})

export default mongoose.model('user', UserModel)