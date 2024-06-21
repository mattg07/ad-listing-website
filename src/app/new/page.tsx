"use client";
import AdListingForm from "@/components/AdListingForm";

const locationDefault = {
  lat: 59.432226005726896,
  lng: 18.057839558207103,
};

export default function newAdPage() {

  return (
    <AdListingForm defLocation={locationDefault}/>
  );
}
