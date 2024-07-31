import mongoose from "mongoose";
import { User } from "./user-model.js"
const DataSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: User
    }
    ,
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
deadline: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})
export const TodoData = mongoose.model('TodoData', DataSchema);
