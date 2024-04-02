import mongoose from "mongoose"

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Assuming you have a User model for team members
        },
      ],
      validate: [membersValidator, "At least one member is required"], // Custom validator for members array
    },
  },
  {
    timestamps: true, // Adding default timestamps
  }
)

function membersValidator(value) {
  // Check if the members array has at least one member
  return value.length > 0
}

const Team = mongoose.model("Team", teamSchema)

export default Team
