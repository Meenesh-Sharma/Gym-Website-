
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Coach {
  _id: string;
  name: string;
  speciality?: string;

  experience?: string;
  description?: string;
}

export default function Coaches() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  //  Fetch Trainers Only
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/staff?role=Trainer`
        );
        setCoaches(res.data);
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <section className="w-full md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 md:mb-4">
          Meet Our <span className="text-cyan-400">Expert Coaches</span>
        </h2>
         <p className="text-lg text-gray-300 leading-relaxed text-center mb-10">
           Meet our coach and build a plan tailored just for you.
          </p>

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar  snap-x snap-mandatory"
        >
          {loading ? (
            <p className="text-center w-full">Loading...</p>
          ) : coaches.length === 0 ? (
            <p className="text-center w-full">No trainers found</p>
          ) : (
            coaches.map((coach) => (
              <Card
                key={coach._id}
                className="min-w-[200px] max-w-[200px] flex-shrink-0 snap-start
                bg-[#0F223A] p-4 rounded-xl shadow-xl 
                border border-cyan-500/20
                hover:bg-[#17365D] hover:scale-[1.03] 
                transition duration-300"
              >
                <CardHeader className="p-0 text-center flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-3">
                    <AvatarFallback className="bg-cyan-400 text-black font-bold">
                      {coach.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-sm font-bold text-cyan-400">
                    {coach.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-300 ">
                    {coach.speciality || "Trainer"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 text-center">
                  <p className="text-xs text-cyan-300 font-semibold">
                    {coach.experience || "Experience: N/A"}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                    {coach.description || "No description available."}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}