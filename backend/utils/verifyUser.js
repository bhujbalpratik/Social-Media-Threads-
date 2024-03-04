import jwt from "jsonwebtoken"
import { errorHandler } from "./error.handler.js"

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return next(errorHandler(400, "You should login first"))

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(500, "Token is not valid"))
    req.user = user
    console.log("User from cookie : ", req.user)
    next()
  })
}
