// Function to fetch all domains
export const getAllDomains = async () => {
    try {
      const response = await fetch("/api/v1/users/domains");
      if (!response.ok) {
        throw new Error("Failed to fetch domains");
      }
      const res = await response.json();
      console.log(res.data, "domains data")
      return res.data;
    } catch (error) {
      console.error("Error fetching domains:", error);
      return [];
    }
  };
  
  // Function to fetch all genders
  export const getAllGenders = async () => {
    try {
      const response = await fetch("/api/v1/users/genders", {
        method: "GET"
      });
      console.log(response, "response")
      if (!response.ok) {
        throw new Error("Failed to fetch genders");
      }
      const res = await response.json();
      console.log(res.data, "genders")
      return res.data;
    } catch (error) {
      console.error("Error fetching genders:", error);
      return [];
    }
  };
  