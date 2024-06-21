'use client';
import { Ad } from "@/models/Ad";
import UploadThumbnail from "./UploadThumbnail";
import Link from "next/link";

export default function ListingCard({ ad }: { ad: Ad }) {

  return (
    <div
      key={ad._id}
      className="flex flex-col  items-center rounded-lg w-4/5 ml-2 mt-2 p-2 overflow-hidden bg-whitesmoke h-48 sm:h-46"
    >
      <div className="h-26 md:h-20 sm:h-24 flex flex-col items-center justify-between">
        <div className="flex-1 flex items-center justify-center w-full">
          <Link
            href={`/ad/${ad._id}`}
            className="text-center font-semibold text-sm sm:text-md overflow-hidden w-full text-wrap sm:text-wrap overflow-ellipsis"
          >
            {ad.title}
          </Link>
        </div>
        <h2 className="text-md text-graysm">
          {ad.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
      </div>
      {ad.files?.length > 0 && (
        <div className="rounded-xl overflow-hidden relative">
          <UploadThumbnail file={ad.files[0]} size="large" />
          <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
        </div>
      )}
    </div>
  );
}
