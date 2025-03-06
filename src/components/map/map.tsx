"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface VetClinic {
  lat: number;
  lng: number;
  name: string;
}

export default function Map({ city }: { city: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [clinics, setClinics] = useState<VetClinic[]>([]);

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

            setClinics(clinicData);

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

  return (
    <div
      ref={mapRef}
      className="flex justify-center items-center w-[700px] h-[700px]"
    />
  );
}
