"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // FETCH
  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // SAVE
  const handleSave = async () => {
    if (!form.name || !form.price) {
      alert("Fill required fields");
      return;
    }

    if (editingId) {
      await axios.put(`${API_URL}/products/${editingId}`, form);
    } else {
      await axios.post(`${API_URL}/products`, form);
    }

    setForm({ name: "", price: "", description: "" });
    setEditingId(null);
    setOpen(false);
    fetchProducts();
  };

  // EDIT
  const handleEdit = (p: Product) => {
    setForm(p);
    setEditingId(p._id);
    setOpen(true);
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`${API_URL}/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="space-y-4">

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Products</CardTitle>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Product" : "Add Product"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Input
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <DialogFooter>
                <Button onClick={handleSave}>
                  {editingId ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((p) => (
              <Card key={p._id} className="p-4 space-y-2">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-cyan-500">{p.price}</p>
                <p className="text-sm text-gray-500">
                  {p.description}
                </p>

                <div className="flex gap-2 justify-end">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(p)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(p._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}