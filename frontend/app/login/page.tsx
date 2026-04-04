
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (!email || !password) {
      alert("Please fill all fields ❗");
      return;
    }

    setLoading(true);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        email,
        password,
      }
    );

    //  STORE DATA
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userName", res.data.user.name);
    localStorage.setItem("userId", res.data.user._id);

    //  SUCCESS UI
    setOpenDialog(true);

  } catch (error: any) {
    const message = error.response?.data?.message;

    //  HANDLE EXPECTED ERRORS (NO CONSOLE ERROR)
    if (message === "Invalid credentials") {
      alert("Wrong email or password ❌");
    } else if (message === "User not found") {
      alert("User not found ❗");
    } else {
      alert("Something went wrong ⚠️");
    }

    //  OPTIONAL: log only in dev
    if (process.env.NODE_ENV === "development") {
      console.log("Login error:", message);
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
        <div className="flex w-full max-w-3xl shadow-xl rounded-3xl overflow-hidden flex-col md:flex-row">
          {/* LEFT: LOGIN FORM */}
          <div className="flex-1 bg-white p-10 flex flex-col justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full bg-green-500"
                disabled={loading} >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-green-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="hidden md:flex flex-1 bg-[#0A192F] p-10 flex-col justify-center items-center text-white rounded-b-3xl md:rounded-r-3xl md:rounded-tl-none">
            <Dumbbell className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-center text-lg max-w-xs">
              Log in to crush your fitness goals! Track workouts and stay consistent 💪
            </p>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-b from-black via-[#0A192F] to-black text-white border-none">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-green-400">
              Login Successful 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              Welcome back! Redirecting to home...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
