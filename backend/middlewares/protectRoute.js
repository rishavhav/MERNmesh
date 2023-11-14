import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decoded: ", decoded)
    const user = await User.findById(decoded.userID).select("-password")
    console.log("user: ", user)
    req.user = user

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log("Error in signupUser: ", err.message)
  }
}

export default protectRoute
