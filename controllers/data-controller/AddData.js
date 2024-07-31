import mongoose from "mongoose";
import { TodoData } from "../../models/data-model.js"
export const AddData = async (req, res) => {
    try {
        const { title, description, priority, date, status, addedBy } = req.body
        console.log(title, description, priority, date, status);
        if(!addedBy | !mongoose.isValidObjectId(addedBy)){
            return res.status(400).json({ message: "Invalid user id" })
        }
        if (!title || !status) {
            return res.status(400).json({ message: "Title and Status are mandatory Fields.", status: false })
        }
        const DataAdd = await TodoData.create({
            title, description, priority, date, status, addedBy
        })
        return res.status(200).json({
            data: DataAdd,
            message: "Data Added Successfully",
            status: true
        })
    } catch (error) {
        console.log("Login handler error", error)
        return res.status(500).json({
            message: "Adding data failed",
            status: false
        })
    }
}