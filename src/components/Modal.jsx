import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { fetchRocketById } from "../api/spacex";

export default function LaunchDetailsModal({ launch, onClose }) {
  const [rocketName, setRocketName] = useState("");
  const [loadingRocket, setLoadingRocket] = useState(false);

  // Fetch rocket name when modal opens
  useEffect(() => {
    const fetchRocketName = async () => {
      if (!launch?.rocket) return;
      
      setLoadingRocket(true);
      try {
        const rocketData = await fetchRocketById(launch.rocket);
        setRocketName(rocketData.name);
      } catch (error) {
        console.error("Failed to fetch rocket details:", error);
        setRocketName("Unknown Rocket");
      } finally {
        setLoadingRocket(false);
      }
    };

    if (launch) {
      fetchRocketName();
    }
  }, [launch]);

  // handle Escape + body scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (launch) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [launch, onClose]);

  if (!launch) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{launch.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Mission Patch */}
          {launch.links?.patch?.small && (
            <div className="mb-6 text-center">
              <img
                src={launch.links.patch.small}
                alt={`${launch.name} mission patch`}
                className="mx-auto h-24 w-24 object-contain"
              />
            </div>
          )}

          <div className="space-y-4">
            {/* Mission Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Mission Details
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {launch.details || "No mission details available."}
              </p>
            </div>

            {/* Launch Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Launch Information
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(launch.date_utc).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Rocket:</span>{" "}
                  {loadingRocket ? (
                    <span className="text-gray-400">Loading...</span>
                  ) : (
                    rocketName || "Unknown Rocket"
                  )}
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge
                    variant={launch.success ? "success" : "failure"}
                    className="ml-2"
                  >
                    {launch.success ? "Success" : "Failure"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-4">
              {launch.links?.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  📖 Wikipedia
                </a>
              )}
              {launch.links?.webcast && (
                <a
                  href={launch.links.webcast}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  📺 Watch
                </a>
              )}
              <button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}