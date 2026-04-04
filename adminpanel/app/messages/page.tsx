
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  approved: boolean;
}

export default function AdminMessagesPage() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/messages`
      );

      setMessages(res.data);

    } catch (err) {
      console.error(err);
      setSuccess("Failed to fetch messages ❗");
      setTimeout(() => setSuccess(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const approveMessage = async (id: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/approve/${id}`
      );

      setSuccess("Message approved successfully!");
      setTimeout(() => setSuccess(""), 2000);

      fetchMessages();

    } catch (err) {
      console.error(err);
      setSuccess("Approval failed ❗");
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/${id}`
      );

      setSuccess("Message deleted!");
      setTimeout(() => setSuccess(""), 2000);

      fetchMessages();

    } catch (err) {
      console.error(err);
      setSuccess("Delete failed ❗");
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  return (

    <div className="p-10 space-y-6">

      <Card>

        <CardHeader>
          <CardTitle className="text-2xl">
            User Messages
          </CardTitle>
        </CardHeader>

        <CardContent>

          {success && (
            <Alert className="mb-4">
              <AlertDescription>
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/*  Card Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {messages.map((msg) => (

              <Card key={msg._id} className="shadow-md">

                <CardHeader>
                  <CardTitle className="text-lg">
                    {msg.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {msg.email}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">

                  <p className="text-sm text-gray-700">
                    {msg.message}
                  </p>

                  <div>
                    {msg.approved ? (
                      <Badge className="bg-green-500">
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Pending
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">

                    {!msg.approved && (
                      <Button
                        size="sm"
                        onClick={() => approveMessage(msg._id)}
                      >
                        Approve
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </Button>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}