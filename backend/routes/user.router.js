import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("User Router ")
})

router.post("/register")

export default router
