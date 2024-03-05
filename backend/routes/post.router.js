import express from "express"
import { isAuthenticated } from "../utils/verifyUser.js"
import { createPost } from "../controllers/post.controller.js"
const router = express.Router()

router.post("/create", isAuthenticated, createPost)

export default router
