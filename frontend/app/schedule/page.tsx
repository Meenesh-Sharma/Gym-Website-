

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Check, Clock } from "lucide-react";

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<any>({
    mixed: [],
    women: [],
    men: [],
  });

  const [loading, setLoading] = useState(true);

  const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/classes/schedule`
        );
        setSchedule(res.data);
      } catch (err) {
        console.error("Error fetching schedule", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);


  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">

        {/* HEADER */}
        <div className="grid grid-cols-10 bg-white/10 backdrop-blur-lg border border-white/10 rounded-t-xl text-sm font-semibold text-gray-300">
          <div className="p-3 col-span-2">Class</div>
          {days.map((day, i) => (
            <div key={i} className="p-3 text-center">{day}</div>
          ))}
        
        </div>

        {/* ROWS */}
        {data.map((cls: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-10 border-b border-white/10 hover:bg-white/5 transition"
          >
            {/* Class Info */}
            <div className="col-span-2 p-3">
              <p className="font-semibold text-white">{cls.name}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {cls.time}
              </p>
              <p className="text-xs text-cyan-400">{cls.trainer}</p>
              <p className="text-[10px] text-gray-500">
                {cls.eligibility}
              </p>
            </div>

            {/* Days */}
            {cls.days.map((active: number, i: number) => (
              <div key={i} className="flex items-center justify-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-md border
                  ${
                    active
                      ? "bg-cyan-500 text-white border-cyan-600"
                      : "border-white/20"
                  }`}
                >
                  {active ? <Check size={14} /> : ""}
                </div>
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );

  return (
   <section className="min-h-screen py-10 md:py-8 px-4 text-white bg-gradient-to-b from-black via-[#0A192F] to-black">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Class <span className="text-cyan-400">Schedule</span>
          </h2>
          <p className="text-gray-400">
            View weekly training schedule and enroll in your favorite classes.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <Tabs defaultValue="mixed">

            {/* Tabs Header */}
            <TabsList className="grid grid-cols-3 mb-6 bg-transparent gap-4">
              <TabsTrigger value="mixed" className="bg-white/10 data-[state=active]:bg-cyan-500">
                Mixed
              </TabsTrigger>
              <TabsTrigger value="women" className="bg-white/10 data-[state=active]:bg-cyan-500">
                Women
              </TabsTrigger>
              <TabsTrigger value="men" className="bg-white/10 data-[state=active]:bg-cyan-500">
                Men
              </TabsTrigger>
            </TabsList>

            {/* Content */}
            {loading ? (
              <p className="text-center text-gray-400">Loading schedule...</p>
            ) : (
              <>
                <TabsContent value="mixed">
                  {renderTable(schedule.mixed)}
                </TabsContent>

                <TabsContent value="women">
                  {renderTable(schedule.women)}
                </TabsContent>

                <TabsContent value="men">
                  {renderTable(schedule.men)}
                </TabsContent>
              </>
            )}

          </Tabs>
        </div>
      </div>
    </section>
  );
}