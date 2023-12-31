import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body // Added this in server.js: app.use(express.json())
    //if user exists, return error
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
      res.status(400).json({ error: "User already exists" })
      return
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    })

    await newUser.save()

    if (newUser) {
      //create a cookie and send it to the client
      generateTokenAndSetCookie(newUser._id, res)

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in signup user", error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "") //compare the password from the request with the password from the database

    //if password/username is incorrect, return error
    if (!user || !isPasswordCorrect) {
      res.status(401).json({ error: "Invalid username or password" })
      return
    }

    //create a cookie and send it to the client
    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in login user", error)
  }
}

const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt")
    res.status(200).json({ message: "User logged out" })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in logout user", error)
  }
}

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params

    const userToModify = await User.findById(id)

    console.log("req.user:", req.user)
    const currentUser = await User.findById(req.user._id)

    if (id === req.user._id.toString()) return res.status(400).json({ error: "You cannot follow/unfollow yourself" })

    if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" })

    const isFollowing = currentUser.following.includes(id)

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      res.status(200).json({ message: "User unfollowed successfully" })
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
      res.status(200).json({ message: "User followed successfully" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log("Error in followUnFollowUser: ", err.message)
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, username, password, profilePic, bio } = req.body
    const userId = req.user._id
    try {
      let user = await User.findById(userId)
      if (!user) return res.status(400).json({ error: "User not found" })
      if (req.params.id !== userId.toString()) return res.status(400).json({ error: "You cannot update another user's profile" })

      if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
      }

      user.name = name || user.name
      user.email = email || user.email
      user.username = username || user.username
      user.profilePic = profilePic || user.profilePic
      user.bio = bio || user.bio

      await user.save()

      res.status(200).json({ message: "User updated successfully", user })
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log("Error in updateUser: ", err.message)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in updateUser: ", error.message)
  }
}

const getUserProfile = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username }).select("-password").select("updatedAt") // select everything about user other than the - fields

    if (!user) return res.status(400).json({ error: "User not found" })

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in getUserProfile: ", error.message)
  }
}

export { getUserProfile, updateUser, signupUser, loginUser, logoutUser, followUnFollowUser }
