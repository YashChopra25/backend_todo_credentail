import mongoose from "mongoose"
import { TodoData } from "../../models/data-model.js"
export const GetData = async (req, res) => {
    try {
        const id = (req.params.id)
        if (!id || !mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Not available",
                status: false
            })
        }

        const data = await TodoData.aggregate([
            {
                $match: {
                    addedBy: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: "$status",
                    data: {
                        $push: {
                            id: "$_id",
                            title: "$title",
                            createdAt: "$createdAt",
                            date: "$date",
                            status: "$status",
                            priority: "$priority",
                            description: "$description"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    usedFor: "$_id",
                    data: "$data"
                }
            }, {
                $sort: {
                    usedFor: 1
                }
            }
        ])
        return res.status(200).json({
            data,
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