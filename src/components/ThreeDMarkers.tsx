"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDMarkers({ map }: { map: google.maps.Map | null }) {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!map) return;

        // Create Three.js Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Set up Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        // Create Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current = renderer;

        // Append renderer to Google Maps container
        const mapContainer = document.querySelector("div[aria-label='Map']");
        if (mapContainer) {
            mapContainer.appendChild(renderer.domElement);
        }

        // Add Cube Marker
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            renderer.dispose();
        };
    }, [map]);

    return null;
}