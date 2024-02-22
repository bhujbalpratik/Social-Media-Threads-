import mongoose from "mongoose"

export const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "Threads" })
    .then(() => console.log(`Database Connected`))
    .catch((e) => console.log(`Error while Database Connection : ${e}`))
}
