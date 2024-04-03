import { useCallback, useEffect, useRef, useState } from "react"
import useInfiniteScroll from "../hooks/useInfiniteScroll.js"
import UserCard from "../components/UserCard"
import LoaderIcon from "../assets/LoaderIcon.svg"
import CreateUser from "../components/CreateUser"
import UpdateUser from "../components/UpdateUser"
import Filter from "../components/Filters"
import { toast } from "react-toastify"

const Home = () => {
  const [page, setPage] = useState(1)
  const [searchName, setSearchName] = useState("")
  const [selectedDomains, setSelectedDomains] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])
  const [availability, setAvailability] = useState("") // State to hold selected availability filter

  const [showModal, setShowModal] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState({})

  const { loading, error, users, setUsers, hasMore } = useInfiniteScroll(
    "/api/v1/users",
    page,
    selectedDomains,
    selectedGenders,
    searchName,
    availability // Pass selected availability filter to the hook
  )

  const handleFilterChange = (
    selectedDomains,
    selectedGenders,
    availability, // Receive availability from Filter component
    searchName
  ) => {
    setSelectedDomains(selectedDomains)
    setSelectedGenders(selectedGenders)
    setAvailability(availability) // Update availability state
    setSearchName(searchName)
    setPage(1)
  }

  useEffect(() => {
    setUsers([]) // Reset users to empty array when filter changes
  }, [selectedDomains, selectedGenders, searchName, availability])

  const observer = useRef()

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore]
  )

  useEffect(() => {
    setPage(1)
  }, [])

  const handleDeleteUser = async (id) => {
    try {
      // Call your delete user API
      const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      })

      // Check if the delete request was successful
      const responseJSON= await res.json()
      if (res.ok) {
        // Remove the deleted user from the users list
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
        toast.success(responseJSON.message)
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred while deleting user:", error)
      toast.error("Something wet wrong")
    }
  }

  const handleOpenEditModal = (user) => {
    setUserToUpdate(user)
    setShowModal(true)
  }

  const handleCloseEditModal = () => {
    console.log("handle close edit modal run------------->")
    setUserToUpdate({})
    setShowModal(false)
  }

  return (
    <main>
      <section className="flex flex-col gap-4 max-w-4xl mx-auto justify-center text-center px-2 my-20">
        <span className=" mx-auto bg-accentLightPinkDark px-2 py-1  block border border-accentRed text-black">
          View the users at our portal 🚀
        </span>
        <h1 className="text-3xl md:text-6xl">
          Trained experts in tech at{" "}
          <span className="text-accentRed font-semibold home-heading">
            {import.meta.env.VITE_SITE_TITLE}
          </span>
        </h1>
      </section>
      <section className="flex flex-col gap-4 max-w-4xl mx-auto justify-center text-center px-2 my-20">
        <CreateUser setUsers={setUsers} />
        <Filter onFilterChange={handleFilterChange} />
      </section>

      <section className="flex flex-col gap-4 max-w-6xl mx-auto justify-center text-center px-2 my-20">
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5 gap-3">
          {users.map((user, index) => {
            if (users.length === index + 1)
              return (
                <UserCard
                  key={index}
                  lastUserRef={lastUserRef}
                  user={user}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteUser={handleDeleteUser}
                  className="h-64"
                />
              )
            else
              return (
                <UserCard
                  key={index}
                  user={user}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteUser={handleDeleteUser}
                  className="h-64"
                />
              )
          })}
        </ul>
        {loading && (
          <div className="flex justify-center">
            <img
              src={LoaderIcon}
              alt="Loading..."
              className="w-20"
            />
          </div>
        )}
        {error && <p className="text-red-500">Could not load users...</p>}
        {!hasMore && <p>No more users</p>}
        {showModal && (
          <UpdateUser
            user={userToUpdate}
            users={users}
            setUsers={setUsers}
            handleCloseEditModal={() => handleCloseEditModal()}
          />
        )}
      </section>
    </main>
  )
}

export default Home
