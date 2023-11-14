import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body // Added this in server.js: app.use(express.json())
    //if user exists, return error
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
      res.status(400).json({ message: "User already exists" })
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
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("Error in signup user", error)
  }
}

export { signupUser }
