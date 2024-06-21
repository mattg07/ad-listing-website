import {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";

export type Location = {
  lat: number;
  lng: number;
};

export default function LocationPicker({
  defaultLocation,
  onChange,
  gpsCords,
}: {
  defaultLocation: Location;
  onChange: (location: Location) => void;
  gpsCords: Location|null;
}) {
  const divRef = createRef<HTMLDivElement>();
  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });
    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    const map = new Map(divRef.current as HTMLDivElement, {
      mapId: "map",
      center: defaultLocation,
      zoom: 7,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const pin = new AdvancedMarkerElement({
      map,
      position: defaultLocation,
    });
    map.addListener("click", (ev: any) => {
      pin.position = ev.latLng;
      const lat = ev.latLng.lat();
      const lng = ev.latLng.lng();
      onChange({ lat, lng });
      console.log(lat, lng)
    });
  }

  useEffect(() => {
    loadMap();
  }, [gpsCords]);

  return (
    <>
      <div ref={divRef} className="w-[270px] h-[200px]" id="mapElem"></div>
    </>
  );
}
