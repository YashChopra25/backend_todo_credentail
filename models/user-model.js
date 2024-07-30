import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already register"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
}, {
    timestamps: true,
})
UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        const hashedpassword = await bcryptjs.hash(user.password, 10)
        user.password = hashedpassword
    }
    next()
})
export const User = mongoose.model("User", UserSchema);