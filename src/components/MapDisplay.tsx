'use client';
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Location } from "./LocationPicker";

export default function MapDisplay({lat, lng}: Location) {
    
    const mapRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        loadMap()
    })
    async function loadMap() {

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        });
        const { Map } = await loader.importLibrary("maps");
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");
        const map = new Map(mapRef.current as HTMLDivElement, {
            mapId: "map",
            center: {lat, lng},
            zoom: 7,
            mapTypeControl: false,
            streetViewControl: false,
        });
        const pin = new AdvancedMarkerElement({
            map,
            position: {lat, lng},
        });
    }
    return (
 <div ref={mapRef} className="rounded-md w-3/4 h-40 mt-2"/>
    )
}