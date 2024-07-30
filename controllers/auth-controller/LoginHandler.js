import bcrypt from "bcryptjs"
import { User } from "../../models/user-model.js"
import { GenerateToken } from "../../utils/generateToken.js";
export const LoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: 'Email or password are required' });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = await GenerateToken({ name: user.name, email, id: user.id })
        res.status(200).json({
            message: "Login successfull",   
            token,
            status: true
        })
    } catch (error) {
        console.log("Login handler error", error)
        res.status(500).json({
            message: "Login Failed",
            status: false
        })
    }
}