import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Location } from "./LocationPicker";

interface DistancePickerProps {
  onLocationChange: (location: Location) => void;
  onRadiusChange: (radius: number) => void;
}

const DistancePicker: React.FC<DistancePickerProps> = ({
  onLocationChange,
  onRadiusChange,
}) => {
  const locationDefault = {
    lat: 59.432226005726896,
    lng: 18.057839558207103,
  };
  const [location, setLocation] = useState<Location>(locationDefault);
  const [radius, setRadius] = useState<number>(100000);
  const mapsDiv = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const cityCircleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    updateCircle();
  }, [radius, location]);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });
    const { Map } = await loader.importLibrary("maps");
    const map = new google.maps.Map(mapsDiv.current as HTMLElement, {
      center: locationDefault,
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
    });
    mapRef.current = map;

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      const newLocation = {
        lat: e.latLng?.lat() || 0,
        lng: e.latLng?.lng() || 0,
      };
      setLocation(newLocation);
      onLocationChange(newLocation); 
    });

    cityCircleRef.current = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: location,
      radius: radius,
    });

    if (radius > 0) {
      map.fitBounds(cityCircleRef.current.getBounds() as google.maps.LatLngBounds);
    }
  }

  function updateCircle() {
    if (cityCircleRef.current) {
      cityCircleRef.current.setCenter(location);
      cityCircleRef.current.setRadius(radius);
      if (mapRef.current && radius > 0) {
        mapRef.current.fitBounds(cityCircleRef.current.getBounds() as google.maps.LatLngBounds);
      }
    }
  }

  function handleFindMyPosition() {
    navigator.geolocation.getCurrentPosition(
      (ev) => {
        const newLocation = {
          lat: ev.coords.latitude,
          lng: ev.coords.longitude,
        };
        setLocation(newLocation);
        onLocationChange(newLocation); 
      },
      console.error
    );
  }

  function handleRadiusChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newRadius = parseInt(event.target.value);
    setRadius(newRadius);
    onRadiusChange(newRadius);
  }

  return (
    <>
      <div ref={mapsDiv} className="h-56 w-full"></div>
      <button
        type="button"
        onClick={handleFindMyPosition}
        className="flex items-center justify-center gap-1 w-full py-1 border border-blue-600 text-blue-600 rounded"
      >
        <LocationSearchingIcon /> Share location
      </button>
      <input
        type="range"
        min="0"
        max="1000000"
        step="100"
        value={radius}
        onChange={handleRadiusChange}
        className="w-full"
      />
    </>
  );
};

export default DistancePicker;
