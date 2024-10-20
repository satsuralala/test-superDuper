"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";

export default function Bid(){
    const [bids, setBids]=useState("");
    const addBid= async()=>{
        try{
            const Response= await fetch('/api/bids',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    user:"bi",
                    bids:Number(bids)
                })

            })
            if(Response.ok){
                console.log('sucess')
            }else{
                console.log('failed')
            }

        }catch(error){
            console.error('error in bid')

        }
    }
    return(
        <div>
            <Input placeholder="bid ee orouulna uu" onChange={(e)=>setBids(e.target.value)}/>
            <Button onClick={addBid}>add</Button>
        </div>
    )
}