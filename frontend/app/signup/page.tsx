
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dumbbell } from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [openDialog, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#])[A-Za-z0-9@#]{8,}$/;

    if (!name.trim()) return alert("Please enter your name");
    if (!age || Number(age) < 10) return alert("Please enter a valid age");
    if (!gender) return alert("Please select gender");

    if (!emailRegex.test(email)) return alert("Please enter a valid email");
    if (!phoneRegex.test(phone))
      return alert("Please enter a valid phone number");
    if (!address.trim()) return alert("Please enter your address");

    if (!passwordRegex.test(password))
      return alert(
        "Password must include uppercase, number & special character"
      );

    if (password !== confirmPassword)
      return alert("Passwords do not match!");

    try {
      setLoading(true);

    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          name,
          age,
          gender,
          email,
          phone,
          address,
          password,
        }
      );

    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);

      setOpenDialog(true);

    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4 mt-15">
        <div className="flex w-full max-w-4xl shadow-xl rounded-3xl overflow-hidden">

          {/* LEFT FORM */}
          <div className="flex-1 bg-white p-10 flex flex-col justify-center rounded-l-3xl">

            <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">

              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

              <select
                className="w-full border rounded-md p-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>

              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <Button type="submit" className="w-full bg-green-500" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>

            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-green-700 font-medium">
                Login
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex flex-1 bg-[#0A192F] p-10 flex-col justify-center items-center text-white rounded-r-3xl">
            <Dumbbell className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-center">
              Welcome to Aryagym Fitness
            </h2>
            <p className="text-center text-lg max-w-xs">
              Start your fitness journey today 🚀
            </p>
          </div>

        </div>
      </div>

      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-b from-black via-[#0A192F] to-black text-white border-none">

          <DialogHeader>
            <DialogTitle className="text-xl text-center text-green-400">
              Signup Successful 🎉
            </DialogTitle>

            <DialogDescription className="text-center text-gray-300">
              Your account has been created successfully. <br />
              Redirecting to home...
            </DialogDescription>
          </DialogHeader>


        </DialogContent>
      </Dialog>
    </>
  );
}