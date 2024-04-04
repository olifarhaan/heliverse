import React, { useState, useEffect } from "react"
import LoaderIcon from "../assets/LoaderIcon.svg"
import UserCard from "../components/UserCard"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {
  clearSelectedUsers,
  selectSelectedUserIds,
} from "../redux/team/teamSlice"

const TeamCart = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const selectedUserIds = useSelector(selectSelectedUserIds)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        if (selectedUserIds.length === 0) {
          setUsers([])
          setLoading(false)
          return
        }
        // Make a request to fetch user details using the teamIds
        const response = await fetch("/api/v1/users/team-users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedUserIds }),
        })
        const responseJSON = await response.json()
        console.log(responseJSON, "data")
        if (response.ok) {
          setUsers(responseJSON.data) // Set the fetched users in state
        } else {
          console.error("Error fetching users:", responseJSON.message)
          toast.error(responseJSON.message)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [selectedUserIds])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/v1/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          members: selectedUserIds,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        // Clear the form fields
        setName("")
        setDescription("")
        dispatch(clearSelectedUsers())
      } else {
        console.error("Error creating team:", data.message)
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error creating team:", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <section className="flex flex-col gap-4 max-w-6xl mx-auto justify-center text-center px-2 my-20">
      <h2>Team Cart</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-4 max-w-xl mx-auto w-full"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Members
          </label>
          <ul>
            {loading ? (
              <div className="flex justify-center">
                <img
                  src={LoaderIcon}
                  alt="Loading..."
                  className="w-20"
                />
              </div>
            ) : selectedUserIds.length === 0 ? (
              <p className="text-gray-500">You have not added any users yet</p>
            ) : (
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5 gap-3">
                {users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                  />
                ))}
              </ul>
            )}
          </ul>
        </div>
        <button
          type="submit"
          disabled={selectedUserIds.length === 0}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            selectedUserIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Create Team
        </button>
      </form>
    </section>
  )
}

export default TeamCart
