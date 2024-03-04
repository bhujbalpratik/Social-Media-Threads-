import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
    },
    friends: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "Embracing the beauty of true friendship 💕",
    },
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
