"use client";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useRef, useEffect, useCallback } from "react";

const MAP_LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export default function GoogleMapComponent({ onMapLoad }: { onMapLoad: (map: google.maps.Map) => void }) {
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: MAP_LIBRARIES,
    });

    // Optimize onMapLoad to avoid unnecessary re-renders
    const handleMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        onMapLoad(map);
    }, [onMapLoad]);

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            onMapLoad(mapRef.current);
        }
    }, [isLoaded, onMapLoad]); // ✅ Added dependency for consistency

    if (loadError) return <p className="text-red-500">Error loading maps</p>;
    if (!isLoaded) return <p>Loading Maps...</p>;

    return (
        <div className="w-full h-screen">
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                center={{ lat: 37.7749, lng: -122.4194 }} // SF Default
                zoom={10}
                onLoad={handleMapLoad} // ✅ Optimized event handler
            />
        </div>
    );
}