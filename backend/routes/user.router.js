import express from "express"
import {
  friendUnfriend,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js"
import { isAuthenticated } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("User Router")
})

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/friend/:id", isAuthenticated, friendUnfriend)

export default router
