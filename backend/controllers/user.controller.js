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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(400, "Invalid email and password"))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword)
      return next(errorHandler(400, "Invalid email and password"))

    const rest = {
      _id: validUser._id,
      name: validUser.name,
      username: validUser.username,
      email: validUser.email,
    }
    sendCookie(validUser._id, res)
    res.status(201).json(rest)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ mssage: "User logout successsfully" })
  } catch (error) {
    next(error)
  }
}
