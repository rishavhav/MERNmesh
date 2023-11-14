import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // parse incoming json
app.use(express.urlencoded({ extended: true })) // parse incoming urlencoded data
app.use(cookieParser()) // parse incoming cookies

//Routes
app.use("/api/users", userRoutes)

//app listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
