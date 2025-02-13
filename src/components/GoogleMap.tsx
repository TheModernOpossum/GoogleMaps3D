"use client";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";

const MAP_LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export default function GoogleMapComponent({ onMapLoad }: { onMapLoad: (map: google.maps.Map) => void }) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: MAP_LIBRARIES,
    });

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            onMapLoad(mapRef.current);
            setMapLoaded(true);
        }
    }, [isLoaded]);

    if (loadError) return <p className="text-red-500">Error loading maps</p>;
    if (!isLoaded) return <p>Loading Maps...</p>;

    return (
        <div className="w-full h-screen">
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                center={{ lat: 37.7749, lng: -122.4194 }} // SF Default
                zoom={10}
                onLoad={(map) => {
                    mapRef.current = map;
                    onMapLoad(map);
                }}
            />
        </div>
    );
}