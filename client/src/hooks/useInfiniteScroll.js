import { useEffect, useState } from "react"

export default function useInfiniteScroll(url, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    setLoading(true)
    setError(false)
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${url}?page=${pageNumber}&limit=8`, {
          method: "GET",
        })
        const responseJSON = await res.json()
        console.log(responseJSON, "response json----------------")
        if (!res.ok) setError(true)
        else {
          setUsers((prev) => [...prev, ...responseJSON.data.users])
          setHasMore(responseJSON.data.users.length > 0)
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [url, pageNumber])
  return { loading, error, users, hasMore }
}
