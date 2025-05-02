import "../globals.css";
import { useState, useEffect } from "react";

export default function FilterBar({ filters, updateFilters, onClear }) {
  const [gender, setGender] = useState(filters.gender || '');
  const [availability, setAvailability] = useState(filters.availability || '');

  useEffect(() => {
    // sync local state with parent filters when cleared
    setGender(filters.gender || '');
    setAvailability(filters.availability || '');
  }, [filters]);

  const handleFilterChange = () => {
    updateFilters({
      gender,
      availability
    });
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        className="p-2 border border-gray-600 text-gray-600"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        className="p-2 border border-gray-600 text-gray-600"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      >
        <option value="">Select Availability</option>
        <option value="Tomorrow">Tomorrow</option>
        <option value="Next-Week">Next-week</option>
      </select>

      <button className="p-2 border border-gray-600 text-gray-600" onClick={handleFilterChange}>
        Apply filters
      </button>

      <button className="p-2 border border-red-400 text-red-400" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
