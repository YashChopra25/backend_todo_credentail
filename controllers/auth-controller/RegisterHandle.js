import { User } from "../../models/user-model.js";
import { GenerateToken } from "../../utils/generateToken.js";
export const RegisterHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const user = await User.create({ name, email, password });
        const token = await GenerateToken({ name: user.name, email, id: user.id })
        res.status(200).json({
            message: "Registeration Successfull",
            token,
            status: true
        })
    } catch (error) {
        console.log("Register handler error", error)
        if (error.name === 'MongoError' || error.code === 11000) {
            return res.status(500).json({
                message: "Email is already register",
                status: false
            })
        }
        res.status(500).json({
            error,
            message: "Registeration Failed,Something went wrong",
            status: false
        })
    }
}