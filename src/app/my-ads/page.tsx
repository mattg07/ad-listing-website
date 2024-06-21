'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { connect } from "@/libs/Helpers";
import { AdModel } from "@/models/Ad";
import ListingCard from "@/components/ListingCard";

export default async function MyAdsPage() {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return 'Error finding user email'
    }
    await connect();
    const adDocs = await AdModel.find({ userEmail: email });

    return (
        <div>
        <h2 className="font-bold text-2xl text-center text-blue-600">Your ads</h2>
        <div className="grid grid-cols-2 m-auto">{adDocs?.map(ad => (
            <ListingCard key={ad._id} ad={ad}/>
        )) }</div></div>
    )
}