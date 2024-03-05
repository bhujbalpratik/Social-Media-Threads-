import express from "express"
import { isAuthenticated } from "../utils/verifyUser.js"
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getfeedPosts,
} from "../controllers/post.controller.js"
const router = express.Router()

router.get("/feed", isAuthenticated, getfeedPosts)
router.get("/:id", getPost)
router.delete("/:id", isAuthenticated, deletePost)
router.post("/create", isAuthenticated, createPost)
router.post("/like/:id", isAuthenticated, likeUnlikePost)
router.post("/reply/:id", isAuthenticated, replyToPost)

export default router
