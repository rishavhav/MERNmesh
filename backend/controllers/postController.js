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

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.status(200).json({ message: "Post found", post })
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("Error in getPost", error)
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    //see if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    //see if user is authorized to delete post
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json({ message: "Post deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("Error in deletePost", error)
  }
}

const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params
    console.log("hereeeeee")
    const userId = req.user._id
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const userLikedPost = post.likes.includes(userId)
    if (userLikedPost) {
      await post.likes.pull(userId)
      await post.save()
      res.status(200).json({ message: "Post unliked" })
    } else {
      await post.likes.push(userId)
      await post.save()
      res.status(200).json({ message: "Post liked" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("Error in likeUnlikePost", error)
  }
}

export { createPost, getPost, deletePost, likeUnlikePost }
