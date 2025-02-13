"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ✅ Correctly Dynamically Import Three.js Scene
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

export default function Home() {
    const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

    useEffect(() => {
        // Load Google API (example: Maps, Places, or Earth Engine)
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
        script.async = true;
        script.onload = () => setGoogleApiLoaded(true);
        document.body.appendChild(script);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold my-6">Google API + Three.js</h1>

            {/* Show if Google API is loaded */}
            {googleApiLoaded ? (
                <p className="text-green-400">✅ Google API Loaded</p>
            ) : (
                <p className="text-yellow-400">⏳ Loading Google API...</p>
            )}

            {/* Render Three.js Scene */}
            <div className="w-full h-screen">
                <ThreeScene />
            </div>
        </div>
    );
}