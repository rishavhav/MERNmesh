import express from "express"
import { signupUser } from "../controllers/userController.js"

const router = express.Router()

router.post("/signup", signupUser) //functions get big so we'll move them to a controller

export default router
