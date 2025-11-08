"use client";

import { useEffect, useState, useMemo } from "react";
import {
  GoogleMap as Map,
  Marker,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import Spinner from "./UI/Spinner/Spinner";

type Location = {
  lat: number;
  lng: number;
  name?: string;
};

type Props = {
  locations: Location[];
  className?: string;
};

type UserLocation = {
  lat: number;
  lng: number;
} | null;

export default function PlacesMap({ locations = [], className }: Props) {
  const [userLocation, setUserLocation] = useState<UserLocation>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("User location access denied:", err);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const center = useMemo(() => {
    if (userLocation) return userLocation;
    if (locations.length > 0) {
      return {
        lat: locations[0].lat,
        lng: locations[0].lng,
      };
    }
  }, [userLocation, locations]);

  if (!isLoaded)
    return (
      <div className="text-center py-10">
        <Spinner />
      </div>
    );

  return (
    <div className={className}>
      <Map
        center={center}
        zoom={12}
        mapContainerClassName="w-full h-full rounded-2xl"
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/*  User marker */}
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              title="You are here"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
            <Circle
              center={userLocation}
              radius={1000}
              options={{
                fillColor: "#007bff33",
                strokeColor: "#007bff",
                strokeOpacity: 0.5,
              }}
            />
          </>
        )}

        {/*  Business markers */}
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={{ lat: loc.lat, lng: loc.lng }}
            title={loc.name || "Business"}
          />
        ))}
      </Map>
    </div>
  );
}
