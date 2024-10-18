import { DB } from '../../lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('products');
    const result = await collection.find({ name: 'badral' }).toArray();
    return Response.json(result);
  } catch (err) {
    console.error(err);
  }
}
export async function POST(request: Request) {

    try {
      const collection = DB.collection('products');
      const newProduct=request.json;
      const result=collection.insertOne(newProduct);
      return Response.json(result, {status:200});
    } catch (err) {
        return Response.json({ error: 'Failed to create seller' }, { status: 500 });
    }
  }
