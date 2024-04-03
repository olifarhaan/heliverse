import { useEffect, useState } from "react";

export default function useInfiniteScroll(
  url,
  pageNumber,
  domains,
  genders,
  searchName,
  available
) {
  console.log(searchName, "serach nae in infinite scroll")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true); 
    setError(false); 
    const fetchUsers = async () => {
      try {
        // Construct the API URL with the provided filters and pagination parameters
        let apiUrl = `${url}?page=${pageNumber}&limit=8`;
        if (domains.length > 0) {
          const domainValues = domains.map((domain) => domain.value);
          apiUrl += `&domain=${domainValues.join(",")}`;
        }
        if (genders.length > 0) {
          const genderValues = genders.map((gender) => gender.value);
          apiUrl += `&gender=${genderValues.join(",")}`;
        }
        if (available !== "") {
          apiUrl += `&available=${available}`;
        }
        if (searchName) {
          apiUrl += `&search=${searchName}`;
        }

        const res = await fetch(apiUrl, {
          method: "GET",
        });
        const responseJSON = await res.json();

        if (!res.ok) {
          setError(true); 
        } else {
          setUsers((prev) => [...prev, ...responseJSON.data.users]); 
          setHasMore(responseJSON.data.users.length > 0); 
        }
      } catch (error) {
        setError(true); 
      } finally {
        setLoading(false); 
      }
    };
    fetchUsers(); 
  }, [url, pageNumber, domains, genders, searchName, available]); 

  return { loading, error, users, setUsers, hasMore };
}
