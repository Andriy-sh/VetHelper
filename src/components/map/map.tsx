"use client";
import { useEffect, useRef } from "react";
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
          return;
        }

        const cityLocation = results[0].geometry.location;
        const mapOptions: google.maps.MapOptions = {
          center: cityLocation,
          zoom: 13,
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
          }
        });
      });
    };

    initMap();
  }, [city]);

  const sortedClinics = [...cityClinics]
    .map((clinic) => {
      const ratings = Array.isArray(clinic.ClinicReview)
        ? clinic.ClinicReview.map((review) => parseFloat(String(review.rating || "0")))
        : [];
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : "No rating";

      return { ...clinic, avgRating };
    })
    .sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating));

  return (
    <div className="flex space-x-6 p-4">
      <div
        ref={mapRef}
        className="w-[700px] h-[500px] rounded-lg shadow-lg border border-gray-300 overflow-hidden"
      />
      <div className="w-[400px] space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Vet Clinics in {city}
        </h2>
        {sortedClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-lg font-bold">{clinic.name}</h3>
            <p className="text-gray-600">{clinic.address}</p>
            <p className="text-yellow-500 font-semibold">
              ⭐ {clinic.avgRating}
            </p>
            {clinic.phone && <p className="text-gray-500">📞 {clinic.phone}</p>}
            {clinic.website && (
              <a
                href={clinic.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
