import React, { useState, useEffect } from "react"
import Select from "react-select"
import { getAllDomains, getAllGenders } from "../apiClient/users" // Assuming you have functions to fetch domain and gender data

const Filter = ({ onFilterChange }) => {
  const [domains, setDomains] = useState([])
  const [genders, setGenders] = useState([])
  const [selectedDomains, setSelectedDomains] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])
  const [available, setavailable] = useState("All")
  const [searchName, setSearchName] = useState("") // State for search by name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domainData = await getAllDomains()
        const genderData = await getAllGenders()

        // Transform array of strings into array of objects with value and label properties
        const domainOptions = domainData.map((domain) => ({
          value: domain,
          label: domain,
        }))
        const genderOptions = genderData.map((gender) => ({
          value: gender,
          label: gender,
        }))

        setDomains(domainOptions)
        setGenders(genderOptions)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  console.log(domains, "filter domains")

  const handleDomainChange = (selected) => {
    setSelectedDomains(selected)
    onFilterChange(selected, selectedGenders, available, searchName)
  }

  const handleGenderChange = (selected) => {
    setSelectedGenders(selected)
    onFilterChange(selectedDomains, selected, available, searchName)
  }

  const handleAvailableChange = (value) => {
    setavailable(value)
    onFilterChange(selectedDomains, selectedGenders, value, searchName)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
    onFilterChange(
      selectedDomains,
      selectedGenders,
      available,
      event.target.value
    )
  }

  console.log(searchName, "serach name")

  return (
    <div className="max-w-6xl">
      {/* Domain Filter */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        <Select
          options={domains}
          value={selectedDomains}
          onChange={handleDomainChange}
          isMulti
          placeholder="Select domains..."
          className="w-full"
        />

        {/* Gender Filter */}
        <Select
          options={genders}
          value={selectedGenders}
          onChange={handleGenderChange}
          className="w-full"
          isMulti
          placeholder="Select gender..."
        />

        {/* available Filter */}
        <select
          style={{ border: "2px", borderColor: "#CCCCCC" }}
          value={available}
          onChange={(e) => handleAvailableChange(e.target.value)}
          placeholder="Availability"
          className="w-full h-14"
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        {/* Name Search */}
        <input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          placeholder="Search by name"
          className="w-full h-14"
        />
      </div>
    </div>
  )
}

export default Filter
