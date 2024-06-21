import { getServerSession } from "next-auth";
import ImageKit from "imagekit";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }
  
  const ik = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IK_ENDPOINT as string,
    publicKey: process.env.NEXT_PUBLIC_IK_PUBLIC_KEY as string,
    privateKey: process.env.IK_PRIVATE_KEY as string,
  });

  const authParameters = ik.getAuthenticationParameters();
  return new Response(JSON.stringify(authParameters), { status: 200 });
};
