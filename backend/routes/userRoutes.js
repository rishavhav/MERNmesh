import express from "express"
import { signupUser, loginUser, logoutUser } from "../controllers/userController.js"

const router = express.Router()

router.post("/signup", signupUser) //functions get big so we'll move them to a controller
router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router
