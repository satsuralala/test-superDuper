"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
}

export default function Add() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProduct] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const get = async () => {
    try {
      const res = await fetch("/api/addproduct");
      const data = await res.json();
      setProduct(data);
    } catch {
      console.log("Error happened in get");
    }
  };

  const create = async () => {
    try {
      const res = await fetch("/api/addproduct", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });

      if (res.ok) {
        get();
        setName("");
        setPrice("");
      } else {
        console.error("Failed to create product:", res.statusText);
      }
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  const handleUpdate = (id: string) => {
    const productToEdit = products.find((product) => product._id === id);
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setEditingId(id);
    }
  };

  const saveEdit = async () => {
    if (editingId) {
      try {
        const res = await fetch(`/api/addproduct/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        });

        if (res.ok) {
          setName("");
          setPrice("");
          setEditingId(null);
          get();
        } else {
          console.error("Failed to update product");
        }
      } catch (error) {
        console.error("Failed to save edited product", error);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/addproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        get();
      } else {
        console.error("Failed to delete product");
      }
    } catch {
      console.error("Failed to delete product");
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <Input
        placeholder="Ner oruulna uu"
        value={name} // Bind input to name state
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Une oruulna uu"
        value={price} // Bind input to price state
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button onClick={editingId ? saveEdit : create}>
        {editingId ? "SAVE" : "ADD"}
      </Button>

      <div className="ml-5">
        {products.map((product: Product) => (
          <div className="flex gap-3 pl-5" key={product._id}>
            <div>PRODUCT DETAILS</div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <Button onClick={() => handleUpdate(product._id)}>Update</Button>
            <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
