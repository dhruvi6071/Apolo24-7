"use client";

import { useEffect, useState } from "react";
import DoctorsCard from "@/app/components/DoctorsCard";
import FilterBar from "@/app/components/FilterBar";
import axios from "axios";

export default function GeneralPhysicianPage() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const queryParams = {
        ...filters,
        page
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== '')
      );

      const res = await axios.get("http://localhost:5000/api/doctors/list-doctor-with-filter", {
        params: cleanParams,
      });

      setDoctors(res.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        General Physician / Internal Medicine
      </h2>

      <FilterBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={handleClearFilters}
      />

      {loading ? (
        <p>Loading...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <>
          <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorsCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded"
            >
              Previous
            </button>
            <span className="px-4 py-2 border rounded">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
