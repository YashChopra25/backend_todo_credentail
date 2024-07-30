import jwt from "jsonwebtoken"
export const GenerateToken = async (payload) => {
    try {
        
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        return token
    } catch (error) {
        console.log("Failed to GenerateToken")
        throw new error("Failed to GenerateToken")
    }
}