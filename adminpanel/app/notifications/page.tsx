


"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Bell } from "lucide-react";

interface Notification {
  _id: string;
  type: "BILL" | "USER" | "STAFF" | "ORDER";
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "ALL" | "BILL" | "USER" | "STAFF" | "ORDER"
  >("ALL");

  const categories = ["ALL", "BILL", "USER", "STAFF", "ORDER"];

  const API = process.env.NEXT_PUBLIC_API_URL;

  //  FETCH FROM BACKEND
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/notifications?type=${activeTab}`
      );

      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 FETCH ON TAB CHANGE
  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  //  MARK AS READ
  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`${API}/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🧠 GROUP BY DATE
  const groupByDate = (list: Notification[]) => {
    const today: Notification[] = [];
    const yesterday: Notification[] = [];
    const older: Notification[] = [];

    const now = new Date();

    list.forEach((n) => {
      const diff =
        (now.getTime() - new Date(n.createdAt).getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff < 1) today.push(n);
      else if (diff < 2) yesterday.push(n);
      else older.push(n);
    });

    return { today, yesterday, older };
  };

  const grouped = groupByDate(notifications);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Bell className="w-6 h-6 text-gray-600" />
      </div>

      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="mb-4">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
              {cat !== "ALL" && (
                <Badge variant="secondary" className="ml-2">
                  {
                    notifications.filter(
                      (n) => n.type === cat && !n.isRead
                    ).length
                  }
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            {loading ? (
              <p className="text-center text-gray-500">
                Loading...
              </p>
            ) : (
              <>
                {Object.entries(grouped).map(([key, group]) =>
                  group.length > 0 ? (
                    <div key={key} className="mb-6">
                      <h2 className="text-gray-500 font-semibold mb-2 capitalize">
                        {key}
                      </h2>

                      <div className="space-y-2">
                        {group.map((n) => (
                          <Card
                            key={n._id}
                            onClick={() => markAsRead(n._id)}
                            className={`p-4 cursor-pointer flex justify-between items-center ${
                              n.isRead
                                ? "bg-white"
                                : "bg-indigo-50"
                            }`}
                          >
                            <CardContent className="flex justify-between w-full">
                              <span>{n.message}</span>
                              {!n.isRead && (
                                <Badge variant="destructive">
                                  Read
                                </Badge>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}

                {notifications.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">
                    No notifications
                  </p>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}