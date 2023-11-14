import express from "express"
import { replyPost, createPost, getPost, deletePost, likeUnlikePost } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.post("/create", protectRoute, createPost)
router.get("/:postId", getPost)
router.delete("/:postId", protectRoute, deletePost)
router.post("/like/:postId", protectRoute, likeUnlikePost)
router.post("/reply/:postId", protectRoute, replyPost)

export default router
