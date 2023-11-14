import express from "express"
import { getFeed, replyPost, createPost, getPost, deletePost, likeUnlikePost } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.get("/feed", protectRoute, getFeed)
router.post("/create", protectRoute, createPost)
router.get("/:postId", getPost) // imp learning:- parameterized routes should be always posted below as it can cause express to confuse feed as postId

router.delete("/:postId", protectRoute, deletePost)
router.post("/like/:postId", protectRoute, likeUnlikePost)
router.post("/reply/:postId", protectRoute, replyPost)

export default router
