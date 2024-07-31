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
                $lookup: {
                    from: "users",
                    localField: "addedBy",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result"
                }
            },
            {
                $group: {
                    _id: "$status",
                    data: {
                        $push: {
                            name: "$result.name",
                            email: "$result.email",
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
                    name: { $first: "$data.name" },
                    email: { $first: "$data.email" },
                    dataset: "$data"
                }
            },
            {
                $sort: {
                    usedFor: 1
                }
            }
        ])
        return res.status(200).json({
            data,
            message: "Fetching data successfull",
            status: true
        })
    } catch (error) {
        console.log("Login handler error", error)
        return res.status(500).json({
            message: "Fetching data Failed",
            status: false
        })
    }
}