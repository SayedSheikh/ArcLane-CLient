import React from "react";
import { FaSchool, FaBus, FaHospital, FaShoppingCart } from "react-icons/fa";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const benefits = [
  {
    icon: <FaSchool className="text-indigo-600 text-xl" />,
    title: "Nearby Schools",
    description: "Top-rated schools are within walking distance.",
  },
  {
    icon: <FaHospital className="text-red-500 text-xl" />,
    title: "Hospitals",
    description: "Multiple clinics and hospitals within 2 km radius.",
  },
  {
    icon: <FaBus className="text-green-600 text-xl" />,
    title: "Public Transport",
    description: "Easy access to metro, bus, and ride-sharing.",
  },
  {
    icon: <FaShoppingCart className="text-yellow-600 text-xl" />,
    title: "Shopping Centers",
    description: "Malls and groceries just around the corner.",
  },
];

const Location = () => {
  const position = [23.8103, 90.4125]; // Example: Dhaka, Bangladesh

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Heading and description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Apartment Location
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the perfect blend of comfort and convenience in our
            prime-location apartment. Easily accessible and surrounded by
            essential amenities.
          </p>
        </div>

        {/* Map and benefits section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <div
            data-aos="zoom-out"
            className="w-full h-[300px] md:h-[350px] rounded overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 z-0">
            <MapContainer
              center={position}
              zoom={15}
              style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>Our Apartment Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            {benefits.map((item, idx) => (
              <div
                data-aos="zoom-in-left"
                key={idx}
                className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
