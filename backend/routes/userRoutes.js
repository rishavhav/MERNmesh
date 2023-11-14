import express from "express"
import { signupUser, loginUser } from "../controllers/userController.js"

const router = express.Router()

router.post("/signup", signupUser) //functions get big so we'll move them to a controller
router.post("/login", loginUser)

export default router
