import { DB } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(request:Request){
    const ACCESS_TOKEN_SECRET=process.env. ACCESS_TOKEN_SECRET ||"";
    try{
        const collection=DB.collection('example-tsatsa');
        const body=await request.json();
        const {email,password}=body;
        const user=await collection.findOne({email});
        if(!user) return Response.json({status:404});
        const isSame= await bcrypt.compare(String(password), user.password)

       if(isSame){

        const accessToken=jwt.sign(
            {userId: user._id, email},
                    ACCESS_TOKEN_SECRET,
                {
                    expiresIn:"12h",
                }
        )
        console.log(accessToken)
       
        const response= new Response(null,{status:201});
        response.headers.append('Set-cookie', `token=${accessToken}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`);
        return response;
       }else{
        return new Response(null,{status:404})
       }
       

    }catch(error){
        return Response.json({status:404})
    }
}