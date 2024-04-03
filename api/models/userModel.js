import mongoose from "mongoose"

// Custom validator for email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Custom validator for URL
function validateURL(url) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

// Define the schema for the employee data
const userSchema = new mongoose.Schema(
  {
    id: { type: Number },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: { validator: validateEmail, message: "Invalid email format" },
    },
    gender: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: validateURL,
        message: "Invalid URL format for avatar",
      },
    },
    domain: { type: String, required: true },
    available: { type: Boolean, required: true },
  }, {timestamps: true}
)

// Create a model for employees from the schema
const User = mongoose.model("User", userSchema)

export default User
export { validateEmail, validateURL }
