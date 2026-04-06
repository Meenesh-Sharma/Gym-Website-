
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Product = {
  _id?: string;
  name: string;
  price: string;
  description: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FitnessStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API_URL}/orders`, {
        productId: selectedProduct?._id,
        productName: selectedProduct?.name,
        price: selectedProduct?.price,
        customerName: form.name,
        phone: form.phone,
      });

      // CLOSE FORM & OPEN SUCCESS POPUP
      setOpen(false);
      setSuccessOpen(true);

      setForm({ name: "", phone: "" });

      // AUTO REDIRECT
      setTimeout(() => {
        setSuccessOpen(false);
        router.push("/");
      }, 6000);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12">

        {/* HEADING */}
        <div className="text-center mb-6 md:mb-8 space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-3xl font-extrabold">
            Fitness <span className="text-cyan-400">Store</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Premium gym gear & supplements to boost your performance.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 min-w-max px-2">

              {products.map((product) => (
                <Card
                  key={product._id}
                  className="bg-[#0F223A] border border-cyan-500/20 rounded-xl p-5 shadow-lg 
                h-[260px] w-full max-w-[200px] mx-auto
                flex flex-col justify-between 
                hover:shadow-cyan-500/20 hover:scale-[1.03] 
                transition duration-300"
                >
                  <CardContent className="flex flex-col h-full">

                    <div className="flex flex-col h-full text-center">

                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">
                          {product.name}
                        </h4>

                        <p className="text-gray-400 text-sm line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto space-y-3">
                        <p className="text-cyan-400 font-bold text-lg">
                          ₹ {product.price}
                        </p>

                        <Button
                          className="w-full rounded-full bg-cyan-400 text-black hover:bg-cyan-300 transition"
                          onClick={() => handleBuyClick(product)}
                        >
                          Buy Now
                        </Button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}

            </div></div>
        )}

        {/* ORDER FORM POPUP */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0F223A] text-white border border-cyan-500/20 max-w-sm w-full rounded-xl">
            <DialogHeader>
              <DialogTitle>Enter Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                className="h-9 text-sm"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                className="h-9 text-sm"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value;

                  // Regex for Indian phone numbers
                  const indianPhoneRegex = /^(\+91|91)?[6-9]\d{0,9}$/;

                  // Only update if matches pattern (allows typing)
                  if (indianPhoneRegex.test(value) || value === "") {
                    setForm({ ...form, phone: value });
                  }
                }}
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-cyan-400 text-black hover:bg-cyan-300"
              >
                {submitting ? "Processing..." : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* SUCCESS POPUP */}
        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent className="bg-[#0F223A] text-white border border-cyan-500/20 max-w-sm w-full rounded-xl text-center">

            <DialogHeader>
              <DialogTitle className="text-xl text-cyan-400">
                Order Successful 🎉
              </DialogTitle>
            </DialogHeader>

            <div className="py-4 text-gray-300 text-sm">
              You can get your item from <span className="text-cyan-400 font-semibold">Aryagym branch</span>
            </div>

          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}