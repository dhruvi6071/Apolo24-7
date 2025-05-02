export default function DoctorsCard({ doctor }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4">
  
        {/* Doctor Info */}
        <div className="flex-1">
          <h2 className="text-lg font-bold">{doctor?.name || "Unknown Doctor"}</h2>
          <p className="text-sm text-gray-600">{doctor?.specialization || "N/A"}</p>
          <p className="text-sm text-purple-700 font-medium">
            {doctor?.experience || "0"} YEARS • {doctor?.qualification || "MBBS"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Available on: {Array.isArray(doctor?.available_on) ? doctor.available_on.join(", ") : "N/A"}
          </p>
          <p className="text-sm text-gray-500">location: {doctor?.location || "N/A"}</p>
          <p className="text-sm text-gray-500">gender: {doctor?.gender || "N/A"}</p>
        
        
        </div>
  
        {/* Fees and Action */}
        <div className="flex flex-col justify-between text-right sm:text-left">
          <div className="text-lg font-semibold text-black">₹{doctor?.fee || "N/A"}</div>
          <button className="mt-2 bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
            Consult Online
          </button>
        </div>
      </div>
    );
  }
  