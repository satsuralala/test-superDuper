import { ObjectId } from "mongodb";
import { DB } from "../../lib/db";

export async function GET() {
  try {
    const collection = DB.collection("example");
    const newProduct = await collection.find({}).toArray();
    return Response.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("error in get");
  }
}

export async function POST(request: Request) {
  try {
    const collection = DB.collection("example");
    const newProduct = await request.json(); //new iig yad ashiglaj bolkun
    const result = await collection.insertOne(newProduct);
    return Response.json(result, {status:201});
  } catch (error) {
    console.error('error in post')
  }
}



