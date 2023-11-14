import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

dotenv.config() // to read our config file
connectDB() // connect to the database
const app = express() // create an express app
const PORT = process.env.PORT || 5000

app.use(express.json()) // parse incoming json
app.use(express.urlencoded({ extended: true })) // parse form data in req data
app.use(cookieParser()) // parse incoming cookies

//Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

//app listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
