import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/user.router.js"
import { mongoConnection } from "./data/mongoose.js"
config({ path: "./config/.env" })

const app = express()

app.use("/user", userRouter)

mongoConnection()
app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
