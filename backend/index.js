import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/user.router.js"
import { mongoConnection } from "./data/mongoose.js"
import { errorMiddleware } from "./middleware/error.middleware.js"

config({ path: "./config/.env" })

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)

mongoConnection()
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
