
"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  Users,
  Clipboard,
  UserCheck,
  CreditCard,
  FileText,
  Bell,
  MessageCircle,
  Package,
  Dumbbell
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const modules = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "exercise", label: "Exercise", icon: Dumbbell },
  { key: "members", label: "Members", icon: Users },
  { key: "classes", label: "Classes", icon: Clipboard },
  { key: "staff", label: "Staff", icon: UserCheck },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "content", label: "Content", icon: FileText },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "products", label: "Products", icon: Package }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  //  FIXED ACTIVE MODULE LOGIC
  const activeModule =
    pathname === "/" || pathname === "/dashboard"
      ? "dashboard"
      : pathname.split("/")[1];

  //  AUTO CLOSE SIDEBAR ON ROUTE CHANGE (MOBILE FIX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm px-4 py-3 flex justify-between items-center z-50">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>

        <h1 className="font-bold text-indigo-600">Gym Admin</h1>

        <Bell
          className="w-6 h-6 cursor-pointer"
          onClick={() => router.push("/notifications")}
        />
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:relative z-40 inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          GYM ADMIN
        </div>

        <ul className="p-4 space-y-2 flex-1">
          {modules.map((mod) => {
            const Icon = mod.icon;

            return (
              <li key={mod.key}>
                <Link
                  href={mod.key === "dashboard" ? "/" : `/${mod.key}`}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${activeModule === mod.key
                      ? "bg-indigo-600"
                      : "hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {mod.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="p-4 text-xs text-gray-400 border-t border-gray-700">
          Logged in as: Admin@Gym.com
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-6 pb-16 lg:pb-6 px-4">

        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex flex-col mb-6">

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {activeModule}
            </h1>

            <div className="flex items-center gap-4">
              <div
                className="relative cursor-pointer"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="w-6 h-6 text-gray-700" />

              </div>

              <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                A
              </div>
            </div>
          </div>

          {/* DASHBOARD CONTENT ONLY */}
          {activeModule === "dashboard" && (
            <>
              {/* CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                <Link href="/members">
                  <div className="p-5 bg-indigo-500 text-white rounded-lg shadow hover:scale-105 transition cursor-pointer">
                    <Users className="mb-2" />
                    <h3 className="font-semibold">Members</h3>
                  </div>
                </Link>

                <Link href="/classes">
                  <div className="p-5 bg-green-500 text-white rounded-lg shadow hover:scale-105 transition cursor-pointer">
                    <Clipboard className="mb-2" />
                    <h3 className="font-semibold">Classes</h3>
                  </div>
                </Link>

                <Link href="/messages">
                  <div className="p-5 bg-yellow-500 text-white rounded-lg shadow hover:scale-105 transition cursor-pointer">
                    <MessageCircle className="mb-2" />
                    <h3 className="font-semibold">Messages</h3>
                  </div>
                </Link>

                <Link href="/billing">
                  <div className="p-5 bg-red-500 text-white rounded-lg shadow hover:scale-105 transition cursor-pointer">
                    <CreditCard className="mb-2" />
                    <h3 className="font-semibold">Billing</h3>
                  </div>
                </Link>

              </div>

              {/* WELCOME */}
              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                <h2 className="text-xl font-bold mb-2">
                  Welcome to Admin Dashboard
                </h2>
                <p className="text-gray-600">
                  Manage your gym efficiently from here.
                </p>
              </div>
            </>
          )}
        </div>

        {/* PAGE CONTENT */}
        <div>{children}</div>
      </main>

      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50">
        {modules.slice(0, 5).map((mod) => {
          const Icon = mod.icon;

          return (
            <Link
              key={mod.key}
              href={mod.key === "dashboard" ? "/" : `/${mod.key}`}
              className={`flex flex-col items-center text-xs ${activeModule === mod.key
                  ? "text-indigo-600"
                  : "text-gray-500"
                }`}
            >
              <Icon className="w-5 h-5" />
              {mod.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}