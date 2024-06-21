"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Gallery from "@/components/Gallery";
import MapDisplay from "@/components/MapDisplay";
import { connect } from "@/libs/Helpers";
import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
};

export default async function SingleAdPage(args: Props) {
  connect();
  const adDoc = await AdModel.findById(args.params.id);
  if (!adDoc) {
    return "Not Found!";
  }
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" w-full h-[550px]  md:w-3/5 bg-gray-100 flex flex-col">
        <Gallery files={adDoc.files} />
      </div>
      <div className="w-full md:w-2/5 p-4 md:p-8">
        <h1 className="text-lg font-bold">{adDoc.title}</h1>
        {session && session?.user?.email === adDoc.userEmail && (
          <div className="mt-2 flex gap-2">
          <Link href={`/edit/${adDoc._id}`} className="rounded-md border border-blue-600 text-blue-600 px-3 py-1 flex items-center justify-center"> <span className="text-xs"> <EditIcon/> </span>Edit</Link>
          <DeleteButton id={adDoc._id} /> 
          </div>
        )}
        <h2 className="text-md text-graysm">
          {" "}
          {adDoc.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
        <label>Category</label>
        <p>{adDoc.category}</p>
        <label>Description</label>
        <p className="text-md">{adDoc.description}</p>
        <label>Contact</label>
        <p>{adDoc.contact}</p>
        <label>Location</label>
        <MapDisplay lat={adDoc.location.lat} lng={adDoc.location.lng} />
      </div>
    </div>
  );
}
