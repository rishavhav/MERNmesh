import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.post("/create", protectRoute, createPost)
router.get("/:postId", getPost)
router.delete("/:postId", protectRoute, deletePost)
router.post("/like/:postId", protectRoute, likeUnlikePost)

export default router
