import { User } from "../models/user.model.js"
import { errorHandler } from "../utils/error.handler.js"
import bcryptjs from "bcryptjs"
import sendCookie from "../utils/helpers/sendCookie.js"
export const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body

    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) return next(errorHandler(400, "User already exist"))

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const rest = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    }
    if (newUser) {
      sendCookie(newUser._id, res)
      res.status(200).json(rest)
    } else {
      next(errorHandler(400, "Invalid user data"))
    }
  } catch (error) {
    next(error)
  }
}
