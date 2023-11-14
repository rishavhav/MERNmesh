import express from "express"
import { createPost, getPost } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.post("/create", protectRoute, createPost)
router.get("/:postId", getPost)
export default router
