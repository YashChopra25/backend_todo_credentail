import mongoose from "mongoose"
import { TodoData } from "../../models/data-model.js"
export const UpdateData = async (req, res) => {
    try {
        const id = (req.params.id);
        const { title, description, priority, date, status, addedBy } = req.body
        if (!id || !mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Not available",
                status: false
            })
        }
        const Update_data = await TodoData.findByIdAndUpdate(id, { title, description, priority, date, status, addedBy }, { new: true })
        return res.status(200).json({
            data: Update_data,
            message: "Login successfull",
            status: true
        })
    } catch (error) {
        console.log("Login handler error", error)
        return res.status(500).json({
            message: "Login Failed",
            status: false
        })
    }
}