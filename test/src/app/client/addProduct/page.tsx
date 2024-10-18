"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function addProduct() {
    const [name, setName]=useState(""); 
     const [pass, setPass]=useState(""); 
     const [dugar, setDugar]=useState(""); 

     const createProduct= async()=>{
        const newProduct = {
            name,
            pass,
            dugar
        };

        try{
            const response=await fetch('/api/products',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(newProduct)
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Product created:', result);
  
                setName("");
                setPass("");
                setDugar("");
            } else {
                const errorData = await response.json();
                console.error('Error creating product:', errorData);
            }


        }catch(err){
            console.error('Network error:', err);

        }
     }



  return (
    <div>
      <div className="text-white">ner</div>
      <input type="text" placeholder="Type something..." onChange={(e)=>setName(e.target.value)} />
      <div>ner</div>
      <input type="text" placeholder="Type something..." onChange={(e)=>setPass(e.target.value)}/>
      <div>ner</div>
      <input type="text" placeholder="Type something..."  onChange={(e)=>setDugar(e.target.value)}/>


      <Button onClick={createProduct} ></Button>
     
    </div>
  );
}
