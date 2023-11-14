import express from "express"
import { signupUser, loginUser, logoutUser, followUnFollowUser } from "../controllers/userController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/signup", signupUser) //functions get big so we'll move them to a controller
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/follow/:id", protectRoute, followUnFollowUser) //:id is gonna be dynamic ; protectRoute is a middleware for authentication

export default router
