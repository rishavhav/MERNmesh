import express from "express"
import { getUserProfile, updateUser, signupUser, loginUser, logoutUser, followUnFollowUser } from "../controllers/userController.js"
import protectRoute from "../middlewares/protectRoute.js"
import { get } from "mongoose"

const router = express.Router()

//get calls
router.get("/profile/:username", getUserProfile)

//post calls
router.post("/signup", signupUser) //functions get big so we'll move them to a controller
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/follow/:id", protectRoute, followUnFollowUser) //:id is gonna be dynamic ; protectRoute is a middleware for authentication
router.post("/update/:id", protectRoute, updateUser)

export default router
