import { useEffect, useState } from "react";
import Badge from "./Badge";
import { fetchRocketById } from "../api/spacex";

const LaunchCard = ({ launch, isFavorite, onToggleFavorite, onViewDetails }) => {
  const launchDate = new Date(launch.date_utc);

  const [rocketName, setRocketName] = useState("");


  useEffect(() => {
    const fetchRocketName = async () => {
      if (!launch?.rocket) return;
      try {
        const rocketData = await fetchRocketById(launch.rocket);
        setRocketName(rocketData.name);
      } catch (error) {
        console.error("Failed to fetch rocket details:", error);
        setRocketName("Unknown Rocket");
      }
    };

    if (launch) {
      fetchRocketName();
    }
  }, [launch]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
          {launch.name}
        </h3>
        <button
          onClick={() => onToggleFavorite(launch.id)}
          className={`
              inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex-shrink-0 cursor-pointer
              ${isFavorite
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300"
              : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
            }
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
          `}
        >
          {/* fav */}
          <span className="text-lg">
            {isFavorite ? "★" : "☆"}
          </span>
          <span>
            {isFavorite ? "Remove Favourite" : "Favourite"}
          </span>
        </button>
      </div>

      {/* date and rocket */}
      <div className="text-sm text-gray-600 mb-3 space-y-1">
        <div>
          {launchDate.toLocaleDateString()}, {launchDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
        </div>
        <div>Rocket: {rocketName || "Unknown Rocket"}</div>
      </div>

      <div className="mb-3">
        <Badge variant={launch.success ? "success" : "failure"}>
          {launch.success ? "✅ Success" : "❌ Failure"}
        </Badge>
      </div>

      <div className="flex gap-2 mb-4">
        <Badge>{launchDate.getFullYear()}</Badge>
      </div>

      <button
        onClick={() => onViewDetails(launch)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        View details
      </button>
    </div>
  );
};

export default LaunchCard;