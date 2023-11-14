import User from "../models/userModel.js"
import Post from "../models/postModel.js"
const createPost = async (req, res) => {
  try {
    const { postedBy, text, image } = req.body

    //validating req fields
    if (!postedBy || !text) {
      return res.status(400).json({ message: "Please enter all fields" })
    }

    //check if user exists
    const user = await User.findById(postedBy)

    if (!user) {
      return res.status(404).json({ message: "User does not exist" })
    }

    //check if user is posting for themselves
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    //check max length of text
    const maxLength = 500
    if (text.length > maxLength) {
      return res.status(400).json({ message: `Text must be less than ${maxLength} characters` })
    }

    //create post
    const newPost = await Post.create({
      postedBy,
      text,
      image,
    })

    await newPost.save()
    res.status(201).json({ message: "New Post Created", newPost })
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("Error in createPost", error)
  }
}

export { createPost }
