import { connect } from "@/libs/Helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery, PipelineStage } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
export async function GET(request: Request, res: Response) {
  await connect();
  const url = new URL(request.url);
  const filter: FilterQuery<Ad> = {};
  const category = url.searchParams.get("category");
  const phrase = url.searchParams.get("phrase") || null;
  const min = parseFloat(url.searchParams.get("min")|| "0");
  const max = parseFloat(url.searchParams.get("max") || "0");
  const lat = parseFloat(url.searchParams.get("lat") || "0");
  const lng = parseFloat(url.searchParams.get("lng") || "0");
  const radius = parseFloat(url.searchParams.get("radius") || "0");
  const aggregationSteps:PipelineStage[] = [];

  if (phrase) {
    filter.title = { $regex: ".*" + phrase + ".*", $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (min && !max) {
    filter.price = { $gte: min };
  }

  if (max && !min) {
    filter.price = { $lte: max };
  }

  if (min && max) {
    filter.price = { $gte: min, $lte: max };
  }

  if (radius) {
    aggregationSteps.push(
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lat, lng],
          },
          distanceField: 'distance',
          maxDistance: radius,
          spherical: true,
        },
      },
    );
  }
  aggregationSteps.push({
    $match: filter,
  });

  aggregationSteps.push({
    $sort : { createdAt: -1 }
  })
  
  const adDocs = await AdModel.aggregate(aggregationSteps);
  return new Response(JSON.stringify(adDocs), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  await connect();
  const adDoc = await AdModel.findById(id);
  const session = await getServerSession(authOptions);
  if (!adDoc || adDoc?.userEmail !== session?.user?.email) {
    return Response.json(false);

  }
  await AdModel.findByIdAndDelete(id);
  return Response.json(true)
}