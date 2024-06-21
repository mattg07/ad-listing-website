"use client";
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import FormSearch from "@/components/FormSearch";

export default function Home() {

  
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() => {
    fetchAds();
  }, []);

  function fetchAds(params?: URLSearchParams) {
    const url = `/api/ads?${params?.toString() || ""}`;
    fetch(url).then((response) => {
      response.json().then((adsDocs) => {
        setAds(adsDocs);
      });
    });
  }

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });
    fetchAds(params);
  }

  return (
    <div className="flex w-full">
      <div className="bg-white grow w-[160px] sm:w-1/4 p-4 border-r">
        <FormSearch action={handleSearch} />
     
      </div>
      <div className="bg-white grow w-3/4 grid grid-cols-2 gap-0 sm:grid-cols-3">
        {ads.map((ad) => (
          <ListingCard key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
