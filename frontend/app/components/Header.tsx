

"use client";

import { useState, useEffect } from "react";
import { Menu, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  //  CHECK LOGIN (UPDATED)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userName");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  //  LOGOUT (UPDATED)
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("plan");

    setIsLoggedIn(false);
    setUserName("");
  };

  const navLink =
    "px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Left Nav */}
        <nav className="hidden lg:flex space-x-6">
          <a href="/" className={navLink}>Home</a>
          <a href="about" className={navLink}>About</a>
          <a href="services" className={navLink}>Services</a>
        </nav>

        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-white">
          <span className="text-cyan-400">Z</span>YM
        </div>

        {/* Right Nav */}
        <nav className="hidden lg:flex items-center space-x-4">
          <a href="schedule" className={navLink}>Schedule</a>
          <a href="#contact" className={navLink}>Contact</a>

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-md text-sm text-white border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-md text-sm bg-cyan-500 text-white hover:bg-cyan-600 transition shadow-md"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-white hover:bg-white/10 transition">
                <User className="w-5 h-5" />
                <span className="text-sm">{userName}</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-36 bg-white/10 backdrop-blur-lg border border-white/10 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Profile
                </Link>
                  <Link
                  href="/workout"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  WorkOut
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 backdrop-blur-lg bg-white/10 border-t border-white/10">
          <a href="#home" className="block text-center py-2 text-white">Home</a>
          <a href="#about" className="block text-center py-2 text-white">About</a>
          <a href="#services" className="block text-center py-2 text-white">Services</a>
          <a href="#schedule" className="block text-center py-2 text-white">Schedule</a>
          <a href="#contact" className="block text-center py-2 text-white">Contact</a>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="block text-center py-2 text-white border border-white/20 rounded-md">
                Login
              </Link>
              <Link href="/signup" className="block text-center py-2 bg-cyan-500 rounded-md text-white">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="block text-center py-2 text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center py-2 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}