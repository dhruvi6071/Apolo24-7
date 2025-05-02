const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/doctor/list-doctor-with-filter",
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
  