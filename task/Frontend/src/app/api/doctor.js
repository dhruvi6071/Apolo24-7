const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://apolo24-7-1.onrender.com/api/doctor/list-doctor-with-filter",
        {
          params: filters,
        }
      );
      console.log("Doctors fetched:", res.data); // Log to check shape of data
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };
  
