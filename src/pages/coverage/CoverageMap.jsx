import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// 🧭 Leaflet icon config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✈️ Smooth fly to location
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 12, {
      duration: 1.5,
    });
  }
  return null;
};

const CoverageMap = ({ warehouseData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();

    // সার্চ মিলে গেলে: city, district বা covered_area
    const found = warehouseData.find((wh) =>
      wh.city.toLowerCase().includes(term) ||
      wh.district.toLowerCase().includes(term) ||
      wh.covered_area.some((area) => area.toLowerCase().includes(term))
    );

    if (found) {
      setSelectedCoords([found.latitude, found.longitude]);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 my-4">
        <input
          className="bg-base-300 w-full lg:w-96 h-12 rounded-xl px-4"
          type="text"
          placeholder="Search city, district or area"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-secondary text-primary h-12" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="w-full h-[800px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedCoords && <FlyToLocation coords={selectedCoords} />}

          {warehouseData.map((wh, index) => (
            <Marker key={index} position={[wh.latitude, wh.longitude]}>
              <Popup>
                <strong>{wh.city}</strong>, {wh.district}
                <br />
                Covered: {wh.covered_area.join(", ")}
                <br />
                <a href={wh.flowchart} target="_blank" rel="noreferrer">
                  Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
