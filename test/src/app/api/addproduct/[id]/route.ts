import { DB } from "@/src/app/lib/db";
import { ObjectId } from "mongodb";

interface Params {
    id: string; 
  }

export async function PUT(request:Request, {params}:{params:Params}){
    const {id}=params;
    try{
        const collection=DB.collection('example');
        const updatedProduct=await request.json();
        const result=await collection.updateOne({_id:new ObjectId(id)}, {$set:{name:updatedProduct.name, price:updatedProduct.price}})
        if(result.matchedCount===0){
            return Response.json({error:'not found'}, {status:404})
        }else{
            return Response.json({message:'successfully edited'}, {status:200})
        }
    }catch(err){
        return Response.json({status:500})
    }
}

export async function DELETE (request:Request, {params}:{params:Params}){
    const {id}=params;
    try{
        const collection=DB.collection('example');
        const result=await collection.deleteOne({_id:new ObjectId(id)});
        if(result.deletedCount===0){
            return Response.json({error:'not found '}, {status:404})
        }else{
            return Response.json({message:'successfully deleted'}, {status:200})
        }

    }catch{
        return Response.json({status:500})

    }

}
