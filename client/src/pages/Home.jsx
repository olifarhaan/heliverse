import { useCallback, useEffect, useRef, useState } from "react"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import UserCard from "../components/UserCard"
import LoaderIcon from "../assets/LoaderIcon.svg"

const Home = () => {
  const [page, setPage] = useState(1)
  const { loading, error, users, hasMore } = useInfiniteScroll(
    "/api/v1/users",
    page
  )

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

  return (
    <main>
      <section className="flex flex-col gap-4 max-w-4xl mx-auto justify-center text-center px-2 my-20">
        <span className=" mx-auto bg-accentLightPinkDark px-2 py-1  block border border-accentRed text-black">
          Read the latest Tech Blog 🚀
        </span>
        <h1 className="text-3xl md:text-6xl">
          Well researched content by experts in tech at{" "}
          <span className="text-accentRed font-semibold home-heading">
            {import.meta.env.VITE_SITE_TITLE}
          </span>
        </h1>
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
                  className="h-64"
                />
              )
            else
              return (
                <UserCard
                  key={index}
                  user={user}
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
      </section>
    </main>
  )
}

export default Home
