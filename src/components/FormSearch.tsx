import { useRef, useState } from "react";
import { categories } from "@/libs/Helpers";
import RadioButtonLabel from "@/components/RadioLabelButton";
import { Storefront } from "@mui/icons-material";
import DistancePicker from "./DistancePicker";
import { Location } from "./LocationPicker";
export default function FormSearch({
  action,
}: {
  action: (data: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (location) {
      formData.set("lat", String(location.lat));
      formData.set("lng", String(location.lng));
    }
    if (radius) {
      formData.set("radius", String(radius));
    }
    action(formData);
  }

  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <input name="phrase" type="text" placeholder="Search products"></input>
      <div className="flex flex-col gap-0 mt-4">
        <RadioButtonLabel
          name={"category"}
          value={""}
          icon={Storefront}
          onClick={() => formRef.current?.requestSubmit()}
          label={"All categories"}
          defaultChecked={true}
        />
        {categories.map(({ key: categoryKey, label, icon: Icon }) => (
          <RadioButtonLabel
            key={categoryKey}
            name={"category"}
            value={categoryKey}
            label={label}
            icon={Icon}
            onClick={() => formRef.current?.requestSubmit()}
          />
        ))}
      </div>
      <div className="pt-2">
        <label>Filter by price</label>
        <div className="flex gap-4">
          <input name="min" type="number" placeholder="min" />
          <input name="max" type="number" placeholder="max" />
        </div>
      </div>
      <div className="mt-2">
        <DistancePicker
          onLocationChange={(loc) => setLocation(loc)}
          onRadiusChange={(rad) => setRadius(rad)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 mt-2 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}
