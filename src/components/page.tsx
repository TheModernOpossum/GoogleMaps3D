"use client";

import { useState } from "react";
import GoogleMapComponent from "@/components/GoogleMap";
import ThreeDMarkers from "@/components/ThreeDMarkers";

export default function Home() {
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

    return (
        <div className="relative w-full h-screen">
            <GoogleMapComponent onMapLoad={setMapInstance} />
            {mapInstance && <ThreeDMarkers map={mapInstance} />}
        </div>
    );
}