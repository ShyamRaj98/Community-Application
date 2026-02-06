import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function IssueMap({ lat, lng }) {
  if (!lat || !lng) return null;

  return (
    <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">
          Issue Location
        </h3>
        <p className="text-xs text-gray-500">
          Exact location reported by user
        </p>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={15}
        className="h-60 sm:h-72 w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>Reported Issue Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
