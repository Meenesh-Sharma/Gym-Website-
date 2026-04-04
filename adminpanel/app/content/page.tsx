
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContentType = "hero" | "blog" | "pricing";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/content`;

export default function ContentPage() {
  const [type, setType] = useState<ContentType>("hero");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState<any>(null);

  // FORM STATES
  const [hero, setHero] = useState({ message: "", image: null as File | null });
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    author: "",
    image: null as File | null,
  });
  const [pricing, setPricing] = useState({
    name: "",
    price: "",
    featuresText: "",
  });

  // FETCH
  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const data = res.data;
      setItems(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // FILTER
  const filteredItems = items.filter((item) => item.type === type);

  // CREATE
  const handleSubmit = async () => {
    try {
      let res;

      if (type === "hero") {
        const formData = new FormData();
        formData.append("type", "hero");
        formData.append("message", hero.message);
        if (hero.image) formData.append("image", hero.image);
        res = await axios.post(API_URL, formData);
      }

      if (type === "blog") {
        const formData = new FormData();
        formData.append("type", "blog");
        formData.append("title", blog.title);
        formData.append("description", blog.description);
        formData.append("author", blog.author);
        if (blog.image) formData.append("image", blog.image);
        res = await axios.post(API_URL, formData);
      }

      if (type === "pricing") {
        const features = pricing.featuresText.split("\n");
        res = await axios.post(API_URL, {
          type: "pricing",
          name: pricing.name,
          price: pricing.price,
          features: pricing.featuresText,
        });
      }

      await fetchContent();
      setOpen(false);

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchContent();
  };

  // EDIT OPEN
  const handleEdit = (item: any) => {
    setEditItem(item);
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editItem._id}`, editItem);
      setEditItem(null);
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Content Manager</CardTitle>

          {/* ADD CONTENT */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Content</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Content</DialogTitle>
              </DialogHeader>

              {/* SELECT */}
              <select
                className="border p-2 rounded"
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
              >
                <option value="hero">Hero</option>
                <option value="blog">Blog</option>
                <option value="pricing">Pricing</option>
              </select>

              {/* HERO */}
              {type === "hero" && (
                <>
                  <Textarea
                    placeholder="Message"
                    onChange={(e) =>
                      setHero({ ...hero, message: e.target.value })
                    }
                  />
                </>
              )}

              {/* BLOG */}
              {type === "blog" && (
                <>
                  <Input
                    placeholder="Title"
                    onChange={(e) =>
                      setBlog({ ...blog, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Description"
                    onChange={(e) =>
                      setBlog({ ...blog, description: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Author"
                    onChange={(e) =>
                      setBlog({ ...blog, author: e.target.value })
                    }
                  />
                </>
              )}

              {/* PRICING */}
              {type === "pricing" && (
                <>
                  <Input
                    placeholder="Name"
                    onChange={(e) =>
                      setPricing({ ...pricing, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Price"
                    onChange={(e) =>
                      setPricing({ ...pricing, price: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Features (one per line)"
                    onChange={(e) =>
                      setPricing({ ...pricing, featuresText: e.target.value })
                    }
                  />
                </>
              )}

              <DialogFooter>
                <Button onClick={handleSubmit}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="space-y-6">

          {/*  TABS */}
          <Tabs value={type} onValueChange={(v) => setType(v as ContentType)}>
            <TabsList>
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
          </Tabs>

          {/*  CARDS */}
          {loading ? (
            <p>Loading...</p>
          ) : filteredItems.length === 0 ? (
            <p>No content</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item._id} className="p-4 space-y-3">

                  <h3 className="font-bold">
                    {item.title || item.name || "No Title"}
                  </h3>

                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {item.message || item.description}
                  </p>

                  <div className="flex gap-2">
                    <Button size="icon" onClick={() => handleEdit(item)}>
                      <Pencil size={16} />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteItem(item._id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

      {/*  EDIT MODAL */}
      {editItem && (
        <Dialog open={true} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">

              {/* HERO */}
              {editItem.type === "hero" && (
                <Textarea
                  value={editItem.message || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, message: e.target.value })
                  }
                />
              )}

              {/* BLOG (FIXED AUTHOR ADDED) */}
              {editItem.type === "blog" && (
                <>
                  <Input
                    placeholder="Title"
                    value={editItem.title || ""}
                    onChange={(e) =>
                      setEditItem({ ...editItem, title: e.target.value })
                    }
                  />

                  <Textarea
                    placeholder="Description"
                    value={editItem.description || ""}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        description: e.target.value,
                      })
                    }
                  />

                  {/*  FIX: AUTHOR FIELD ADDED */}
                  <Input
                    placeholder="Author"
                    value={editItem.author || ""}
                    onChange={(e) =>
                      setEditItem({ ...editItem, author: e.target.value })
                    }
                  />
                </>
              )}

              {/*  PRICING (FIXED FULL FORM) */}
              {editItem.type === "pricing" && (
                <>
                  <Input
                    placeholder="Plan Name"
                    value={editItem.name || ""}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Price"
                    value={editItem.price || ""}
                    onChange={(e) =>
                      setEditItem({ ...editItem, price: e.target.value })
                    }
                  />

                  {/* FEATURES */}
                  <Textarea
                    placeholder="Features (one per line)"
                    value={(editItem.features || []).join("\n")}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        features: e.target.value.split("\n"),
                      })
                    }
                  />
                </>
              )}

            </div>

            <DialogFooter>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}