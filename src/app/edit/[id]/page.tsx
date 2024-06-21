import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdListingForm from "@/components/AdListingForm";
import { connect } from "@/libs/Helpers";
import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
};

export default async function Edit(props: Props) {
  const id = props.params.id || props.searchParams.id;
  

  
  await connect();
  const session = await getServerSession(authOptions);
  
  

  const adDoc = await AdModel.findById(id);
  

  if (!adDoc) {
    return <h1>404 Not Found</h1>;
  }

  if (session?.user?.email !== adDoc.userEmail) {
    return <h1>Cannot edit other ads</h1>;
  }

  return (
    <AdListingForm 
      id={adDoc.id}
      defaultTexts={{
        title: adDoc.title,
        price: adDoc.price,
        category: adDoc.category,
        description: adDoc.description,
        contact: adDoc.contact,
      }}
      defaultFiles={adDoc.files}
      defLocation={adDoc.location}
    />
  );
}
