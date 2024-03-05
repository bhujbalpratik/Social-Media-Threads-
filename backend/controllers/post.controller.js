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

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })

    if (!post) return next(errorHandler(404, "Post not found"))

    res.status(200).json({ post })
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })

    if (!post) return next(errorHandler(404, "Post not found"))

    if (post.postedBy.toString() !== req.user.id)
      return next(errorHandler(500, "Unauthourized to delete post"))

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Post deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const likeUnlikePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const post = await Post.findOne({ _id: id })

    if (!post) return next(errorHandler(404, "Post not found"))

    const userLikedPost = post.likes.includes(userId)

    if (userLikedPost) {
      // Unlike Post
      await Post.updateOne({ _id: id }, { $pull: { likes: userId } })
      res.status(200).json({ message: "Post Unliked successfully" })
    } else {
      // Like Post
      await Post.updateOne({ _id: id }, { $push: { likes: userId } })
      res.status(200).json({ message: "Post liked successfully" })
    }
  } catch (error) {
    next(error)
  }
}

export const replyToPost = async (req, res, next) => {
  try {
    const { text } = req.body
    if (!text) return next(errorHandler(400, "message must be required"))
    if (text.trim() === "")
      return next(errorHandler(400, "reply can't be empty"))
    const postId = req.params.id
    const post = await Post.findOne({ _id: postId })

    if (!post) return next(errorHandler(404, "Post not found"))

    const currentUser = await User.findOne({ _id: req.user.id })
    const reply = {
      userId: currentUser._id,
      text,
      userProfilePic: currentUser.profilePic,
      username: currentUser.username,
    }

    post.replies.push(reply)
    await post.save()

    res.status(200).json({ message: "Replied successfully" })
  } catch (error) {
    next(error)
  }
}

export const getfeedPosts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await User.findOne({ _id: userId })

    if (!user) return next(errorHandler(404, "User not found"))

    const friends = user.friends

    const feedPosts = await Post.find({ postedBy: { $in: friends } }).sort({
      createdAt: -1,
    })

    res.status(200).json(feedPosts)
  } catch (error) {
    next(error)
  }
}
