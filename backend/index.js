import express from "express"
import { config } from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.router.js"
import postRouter from "./routes/post.router.js"
import { mongoConnection } from "./data/mongoose.js"
import { errorMiddleware } from "./middleware/error.middleware.js"
import cookieParser from "cookie-parser"

config({ path: "./config/.env" })

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

mongoConnection()
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
