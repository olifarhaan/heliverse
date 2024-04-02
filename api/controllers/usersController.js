import User from "../models/userModel.js"

// GET /api/Users - Retrieve all Users with pagination support
export const getAllUsersController = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      domain,
      gender,
      available,
      search,
    } = req.query
    const query = {}

    if (domain) query.domain = domain
    if (gender) query.gender = gender
    if (available !== undefined) query.available = available === "true"

    if (search) {
      query.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ]
    }

    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await User.countDocuments(query)

    res.status(200).jsonResponse(true,200, "Users retrieved successfully", {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (err) {
    next(err) // Pass the caught error to the next middleware
  }
}

// GET /api/Users/:id - Retrieve a specific User by ID
export const getUsersByIdController = async (req, res, next) => {
  try {
    const User = await User.findById(req.params.id)
    if (!User) {
      next(errorHandler(404, "User not found")) // Pass the custom error to the errorHandler middleware
    } else {
      res.status(200).jsonResponse(true,200, "User retrieved successfully", User)
    }
  } catch (err) {
    next(err) // Pass the caught error to the next middleware
  }
}

// POST /api/Users - Create a new User
export const createUsersController = async (req, res, next) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).jsonResponse(true, 201, "User created successfully", user)
  } catch (err) {
    next(err) // Pass the caught error to the next middleware
  }
}

// PUT /api/Users/:id - Update an existing User
export const updateUsersController = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!user) {
      next(errorHandler(404, "User not found")) // Pass the custom error to the errorHandler middleware
    } else {
      res.status(200).jsonResponse(true,200, "User updated successfully", user)
    }
  } catch (err) {
    next(err) // Pass the caught error to the next middleware
  }
}

// DELETE /api/Users/:id - Delete an User
export const deleteUsersController = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      next(errorHandler(404, "User not found")) // Pass the custom error to the errorHandler middleware
    } else {
      res.status(200).jsonResponse(true,200, "User deleted successfully")
    }
  } catch (err) {
    next(err) // Pass the caught error to the next middleware
  }
}
