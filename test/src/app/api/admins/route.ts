import { DB } from "../../lib/db";

export async function GET(){
    try{
        const collection=DB.collection('seller');
        const result=await collection.find({name}).toArray();
        return Response.json(result);
    }catch(error){
        console.log(error)
    }
}