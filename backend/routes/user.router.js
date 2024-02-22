import express from "express"
import { signup } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("User Router ")
})

router.post("/signup", signup)

export default router
