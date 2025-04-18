"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Clinic } from "@/lib/interface";

export default function Map({
  city,
  cityClinics,
}: {
  city: string;
  cityClinics: Clinic[];
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const initMap = async () => {
      if (!process.env.NEXT_PUBLIC_MAPS_API_KEY) {
        console.error("Google Maps API Key is missing!");
        return;
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");
      const { Geocoder } = await loader.importLibrary("geocoding");
      const { PlacesService } = await loader.importLibrary("places");

      if (!mapRef.current) return;

      const geocoder = new Geocoder();
      geocoder.geocode({ address: city }, async (results, status) => {
        if (status !== "OK" || !results || results.length === 0) {
          console.error("City not found:", city);
          setIsLoading(false); // Stop loading in case of error
          return;
        }

        const cityLocation = results[0].geometry.location;
        const mapOptions: google.maps.MapOptions = {
          center: cityLocation,
          zoom: 14, // Adjusted zoom level for better detail
        };

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const service = new PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
          location: cityLocation,
          radius: 5000,
          type: "veterinary_care",
        };
        service.nearbySearch(request, (results, status) => {
          if (status === "OK" && results) {
            const clinicData = results.map((place) => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name || "Vet Clinic",
            }));

            clinicData.forEach((clinic) => {
              new google.maps.Marker({
                position: { lat: clinic.lat, lng: clinic.lng },
                map,
                title: clinic.name,
              });
            });
          } else {
            console.error("Failed to load nearby clinics");
          }
          setIsLoading(false); // Stop loading after request
        });
      });
    };

    initMap();
  }, [city]);

  const sortedClinics = [...cityClinics]
    .map((clinic) => {
      const ratings = Array.isArray(clinic.ClinicReview)
        ? clinic.ClinicReview.map((review) =>
            parseFloat(String(review.rating || "0"))
          )
        : [];
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : "No rating";

      return { ...clinic, avgRating };
    })
    .sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating));

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col sm:flex-row md:flex-col space-y-6 sm:space-y-0 sm:space-x-6 p-6">
      <div
        ref={mapRef}
        className="w-full md:w-[400px] md:h-[400px] sm:w-[400px] h-[400px] sm:h-[400px] rounded-lg shadow-xl border border-gray-300 overflow-hidden"
      />

      {isLoading ? (
        <div className="w-full sm:w-[400px] flex items-center justify-center h-[600px] bg-white rounded-lg shadow-xl">
          <div className="spinner border-4 border-t-4 border-blue-600 w-16 h-16 rounded-full animate-spin" />
          <p className="text-lg text-gray-700 ml-4">Завантаження карти...</p>
        </div>
      ) : (
        <div className="w-full sm:w-[400px] space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Vet Clinics in {city}
          </h2>

          {sortedClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-6 border rounded-lg shadow-lg bg-white hover:bg-gray-50 transition duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {clinic.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {clinic.address}
              </p>
              <p className="text-yellow-500 font-semibold text-sm sm:text-base">
                ⭐ {clinic.avgRating}
              </p>
              {clinic.phone && (
                <p className="text-gray-500 text-sm sm:text-base">
                  📞 {clinic.phone}
                </p>
              )}
              {clinic.website && (
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm sm:text-base"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
