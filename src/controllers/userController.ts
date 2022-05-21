import {UserModel} from "../models"

export const getUsers = async (req, res) => {
    if(req.params.id) {
        res.send(await UserModel.findById(req.params.id))
    }
    res.send(await UserModel.find())
    
}