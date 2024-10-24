
import { DB } from "../../lib/db";
import bcrypt from "bcrypt";

export async function POST(request:Request){
    const AUTH_SALT=process.env.AUTH_SALT || "";
    try{
        const collection=DB.collection('example-tsatsa');
        const body=await request.json();
        const {firstname, lastname,email,password}=body;
        if(!firstname || !lastname || !email || !password) return Response.json('dutu',{status:400})
        const hashedPassword=await bcrypt.hash(String(password),Number(AUTH_SALT))
        const res=await collection.insertOne({firstname,lastname,email,password:hashedPassword});
        return Response.json(res, {status:201})
    }catch(err){
        return Response.json(err, {status:400})

    }
}