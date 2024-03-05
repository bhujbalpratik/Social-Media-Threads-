import { errorHandler } from "../utils/error.handler.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"

export const createPost = async (req, res, next) => {
  try {
    const { postedBy, text, img } = req.body

    if (!postedBy || !text)
      return next(errorHandler(400, "Posted by and text field required"))

    if (text.trim() === "")
      return next(errorHandler(400, "text field cant be empty"))

    const user = await User.findOne({ _id: postedBy })

    if (user._id.toString() !== req.user.id)
      return next(errorHandler(500, "Unauthorized to create post"))

    if (text.length > 500)
      return next(errorHandler(400, "Text should be less than 500 characters"))

    const newPost = new Post({ postedBy, text, img })

    await newPost.save()

    res.status(201).json({ message: "Post created successfully" })
  } catch (error) {
    next(error)
  }
}
