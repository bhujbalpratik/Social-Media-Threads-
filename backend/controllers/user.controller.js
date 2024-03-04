import { User } from "../models/user.model.js"
import { errorHandler } from "../utils/error.handler.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
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

  try {
    await newUser.save()
    res.status(201).json({ message: "User Created Successfully" })
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

    const { password: hashedPassword, ...rest } = validUser._doc

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json(rest)
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

export const friendUnfriend = async (req, res, next) => {
  try {
    const { id } = req.params
    const friend = await User.findOne({ _id: id })
    const currentUser = await User.findOne({ _id: req.user.id })

    if (id === req.user._id) return next(errorHandler(400, "You cant do this"))

    if (!friend || !currentUser)
      return next(errorHandler(400, "User not found"))

    const isFriend = currentUser.friends.includes(id)

    if (isFriend) {
      // Unfriend
      friend.friends = friend.friends.filter((fid) => fid !== req.user.id)
      currentUser.friends = currentUser.friends.filter((uid) => uid !== id)
      res.status(201).json({ message: "Remove friend successfully" })
    } else {
      // friend
      friend.friends.push(req.user.id)
      currentUser.friends.push(id)
      res.status(201).json({ message: "Add friend successfully" })
    }
    await friend.save()
    await currentUser.save()
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(400, "You can change only your account"))

  try {
    const { name, username, email } = req.body

    if (username?.trim() === "")
      return next(errorHandler(400, "Username cant be empty"))

    if (name?.trim() === "")
      return next(errorHandler(400, "Name cant be empty"))

    if (email?.trim() === "")
      return next(errorHandler(400, "email cant be empty"))

    if (req.body.password?.trim() === "")
      return next(errorHandler(400, "password cant be empty"))

    const userName = await User.findOne({ username: req.body.username || "" })
    const userEmail = await User.findOne({ email: req.body.email || "" })

    if (userName) return next(errorHandler(500, "username already existed"))

    if (userEmail) return next(errorHandler(500, "user already existed"))

    req.body.password = bcryptjs.hashSync(req.body.password, 10)

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
          bio: req.body.bio,
        },
      },
      { new: true }
    )
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
