"use client";
import LocationPicker from "./LocationPicker";
import AdTextInput, { AdTexts } from "./AdTextInput";
import UploadMedia from "./UploadMedia";
import PublishButton from "./PublishButton";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Location } from "./LocationPicker";
import { useState } from "react";
import { UpdatedAd, createAd } from "../app/actions/addActions";
import { redirect } from "next/navigation";

type Props = {
  id?: string | null;
  defaultFiles?: UploadResponse[];
  defLocation: Location;
  defaultTexts?: AdTexts;
};

const locationDefault = {
  lat: 59.432226005726896,
  lng: 18.057839558207103,
};

export default function AdListingForm({
  id = null,
  defaultFiles = [],
  defLocation,
  defaultTexts = {},
}: Props) {
  const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
  const [location, setLocation] = useState<Location>(defLocation);
  const [gpsCords, setGpsCords] = useState<Location | null>(null);
  const [locationDef, setLocationDef] = useState<Location>(defLocation);
  function handleFindMyPosition() {
    navigator.geolocation.getCurrentPosition((ev) => {
      const location = {
        lat: ev.coords.latitude,
        lng: ev.coords.longitude,
      };
      setLocation(location);
      setGpsCords(location);
      setLocationDef(location);
      console.log(location);
    }, console.error);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("location", JSON.stringify(location));
    formData.set("files", JSON.stringify(files));
    if (id) {
      formData.set('_id', id)
    }
    const result = id ? await UpdatedAd(formData) : await createAd(formData);
    redirect('/ad/'+result._id)
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-xl mx-auto grid grid-cols-2 gap-12"
    >
      <div className="grow pt-8">
        <UploadMedia files={files} setFiles={setFiles} />
        <div className="mt-8">
          <label htmlFor="">Location</label>
          <button
            type="button"
            onClick={handleFindMyPosition}
            className="flex items-center justify-center gap-1 w-full py-1 border border-blue-600 text-blue-600 rounded"
          >
            {" "}
            <LocationSearchingIcon /> Share location
          </button>
          <div className=" mt-4 bg-gray-200 min-h-12 rounded overflow-hidden">
            <LocationPicker
              gpsCords={gpsCords}
              defaultLocation={locationDef}
              onChange={(location) => setLocation(location)}
            />
          </div>
        </div>
      </div>

      <div className="grow pt-2">
        <AdTextInput defaultValues={defaultTexts} />
        <PublishButton>{id ? "Save" : "Publish"}</PublishButton>
      </div>
    </form>
  );
}
