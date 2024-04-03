import express from "express"
import dotenv from "dotenv/config"
import userRouter from "./routes/userRoute.js"
import teamRouter from "./routes/teamRoute.js"
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js"
import responseMiddleware from "./middlewares/responseMiddleware.js"
import connect from "./db/connect.js"
import { PORT } from "./utils/constants.js"
import cookieParser from "cookie-parser"
import path from "path"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import xss from "xss-clean"
import User from "./models/userModel.js"

const __dirname = path.resolve()
const app = express()
const globalLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour duration
  message: {
    statusCode: 429,
    success: false,
    message: "Too many requests, please try again later",
  },
})

// Middlewares ------>
app.use("/api", globalLimiter)
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
)
app.use(mongoSanitize()) // sanitization againt NOSQL query injection
app.use(xss()) // sanitize agains XSS attacks (like HTML in input)
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())
app.use(responseMiddleware)

// Routes middleware ------------------------------------>
app.use("/api/v1/users", userRouter)
app.use("/api/v1/teams", teamRouter)

async function updateUsersWithTimestamps() {
  try {
    // Fetch all users
    const users = await User.find()

    // Iterate over each user and update their data with timestamps
    for (const user of users) {
      // Add timestamps to the user data
      user.createdAt = new Date()
      user.updatedAt = new Date()

      // Save the updated user data to the database
      await user.save()
    }

    console.log("All users updated with timestamps successfully")
  } catch (error) {
    console.error("Error updating users with timestamps:", error)
  }
}

// Call the function to update users with timestamps
// updateUsersWithTimestamps();

app.use(express.static(path.join(__dirname, "/client/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

// Error hnadling middlewares------------------->
app.use(errorHandlerMiddleware)

// Server start code----------------------->
const start = async () => {
  try {
    await connect(process.env.MONGODB_CONNECTION_URI)
    console.log("MongoDB connected successfully")
    app.listen(PORT, () => {
      console.log("Server running at port:", PORT)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
