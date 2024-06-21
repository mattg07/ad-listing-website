"use server";

import mongoose from "mongoose";
import { AdModel } from "../../models/Ad";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

async function connect() {
  return mongoose.connect(process.env.MONGODB_URL as string);
}

export async function createAd(formData: FormData) {
  const { location, files, ...data } = Object.fromEntries(formData);
  await connect();
  const session = await getServerSession(authOptions);
  const newAdData = {
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
    userEmail: session?.user?.email,
  };
  const newAdDoc = await AdModel.create(newAdData);
  return JSON.parse(JSON.stringify(newAdDoc));
}

export async function UpdatedAd(formData: FormData) {
  const { _id, location, files, ...data } = Object.fromEntries(formData);
  await connect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("User not authenticated");
  }

  const adDoc = await AdModel.findById(_id);
  
  if (!adDoc) {
    throw new Error("Ad not found");
  }

  if (adDoc.userEmail !== session.user.email) {
    throw new Error("Unauthorized to edit this ad");
  }

  const AdData = {
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
  };

    const updatedAdDoc = await AdModel.findByIdAndUpdate(_id, AdData, { new: true });
    revalidatePath('/ad/'+_id)
  
  if (!updatedAdDoc) {
    throw new Error("Failed to update ad");
  }

  return JSON.parse(JSON.stringify(updatedAdDoc));
}
