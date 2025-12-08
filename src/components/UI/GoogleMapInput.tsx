"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LuMapPin } from "react-icons/lu";
import {
  useJsApiLoader,
  StandaloneSearchBox,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import Input from "./Input";
import Spinner from "./Spinner/Spinner";

type Props = {
  apiKey: string;
  name: string;
  label?: string;
  placeholder?: string;
  mapHeight?: string;
  error?: string;
  defaultValue?: string;
};

const LIBRARIES: ("places" | "maps")[] = ["places", "maps"];

function GoogleMapInputWithUserLocation({
  apiKey,
  error,
  defaultValue,
  name,
  label = "Location / Address",
  placeholder = "Enter your address",
  mapHeight = "200px",
}: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const [address, setAddress] = useState(defaultValue || "");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition({ lat: latitude, lng: longitude });
      },
      (err) => console.warn("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (!places || !places.length) return;

    const place = places[0];
    const location = place.geometry?.location;

    setAddress(place.formatted_address || place.name || "");
    if (location) {
      setPosition({ lat: location.lat(), lng: location.lng() });
    }
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  }, []);

  const mapContainerStyle = { width: "100%", height: mapHeight };

  if (!isLoaded)
    return (
      <div className="text-center animate-pulse">
        <Spinner />
      </div>
    );

  if (loadError)
    return (
      <p className="text-red-500 font-medium text-sm">
        Error loading Google Maps
      </p>
    );

  return (
    <div className="w-full space-y-4">
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <Input
          type="text"
          label={label}
          error={error}
          name={name}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={placeholder}
          icon={<LuMapPin className="text-[#949494]" />}
        />
      </StandaloneSearchBox>

      {(position || userPosition) && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position || userPosition!}
          zoom={position ? 15 : 14}
          onClick={handleMapClick}
        >
          {!position && userPosition && (
            <Marker
              position={userPosition}
              label={{ text: "You", color: "white", fontSize: "12px" }}
            />
          )}
          {position && <Marker position={position} />}
        </GoogleMap>
      )}
    </div>
  );
}

export default GoogleMapInputWithUserLocation;
