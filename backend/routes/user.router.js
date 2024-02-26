import express from "express"
import { login, logout, signup } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("User Router ")
})

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router
