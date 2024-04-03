// AddUser.js
import React, { useState } from "react"
import { toast } from "react-toastify"

function CreateUser({ setUsers }) {
  const [loading, setLoading]=useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: false,
  })

  const handleSaveUser = async () => {
    console.log("inside")
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
      const responseJSON = await res.json()
      console.log(responseJSON, "response json")
      if (res.ok && responseJSON.success) {
        setUsers((prevUsersList) => [responseJSON.data, ...prevUsersList])
        toast.success(responseJSON.message)
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log("error-----")
    } finally {
      setLoading(false)
      console.log("finally--------------->")
    }

    setNewUser({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      avatar: "",
      domain: "",
      available: false,
    })
    setShowModal(false)
  }

  return (
    <div>
      <button
        className="py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        onClick={() => setShowModal(true)}
      >
        + Add User
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md m-2 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={(e) =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={(e) =>
                setNewUser({ ...newUser, last_name: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Gender"
              value={newUser.gender}
              onChange={(e) =>
                setNewUser({ ...newUser, gender: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Avatar"
              value={newUser.avatar}
              onChange={(e) =>
                setNewUser({ ...newUser, avatar: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Domain"
              value={newUser.domain}
              onChange={(e) =>
                setNewUser({ ...newUser, domain: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={newUser.available}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
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
                className={`${ loading? "bg-blue-200": "bg-blue-500"} text-white px-4 py-2 rounded-md mr-2`}
                onClick={()=> handleSaveUser()}
              >
                Save User
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateUser
