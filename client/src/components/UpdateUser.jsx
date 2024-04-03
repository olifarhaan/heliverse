// AddUser.js
import React, { useState } from "react"
import { toast } from "react-toastify"

function UpdateUser({ user, users, setUsers, handleCloseEditModal }) {
  const [loading, setLoading] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({ ...user })

  const handleUpdateUser = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/v1/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        toast.success(responseJSON.message)
        // Find the index of the updated user in the users array
        const updatedUserIndex = users.findIndex((u) => u._id === user._id)
        // Replace the old user with the updated user
        const updatedUsers = [...users]
        updatedUsers[updatedUserIndex] = responseJSON.data
        setUsers(updatedUsers)
        handleCloseEditModal()
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md m-2 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={updatedUser.first_name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, first_name: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={updatedUser.last_name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, last_name: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Gender"
          value={updatedUser.gender}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, gender: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Avatar"
          value={updatedUser.avatar}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, avatar: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Domain"
          value={updatedUser.domain}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, domain: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={updatedUser.available}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                available: e.target.checked,
              })
            }
            className="mr-2 outline-none h-4"
          />
          <span>Available</span>
        </div>
        <div className="flex justify-end">
          <button
            disabled={loading}
            className={`${
              loading ? "bg-blue-200" : "bg-blue-500"
            } text-white px-4 py-2 rounded-md mr-2`}
            onClick={() => handleUpdateUser()}
          >
            Update User
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={handleCloseEditModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
