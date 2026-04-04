
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface GymClass {
  day: string;
  name: string;
  time: string;
}


const schedules = {
  mixed: [
    {
      day: "Monday / Wednesday",
      name: "Full Body HIIT",
      time: "6:00 AM / 6:00 PM",
    },
    {
      day: "Tuesday / Thursday",
      name: "Power Flow Yoga",
      time : "10:00 AM",
    },
  ],
  women: [
    {
      day: "Wednesday",
      name: "Glute & Core Sculpt",
      time: "5:00 PM",
    },
  ],
  men: [
    {
      day: "Friday",
      name: "Advanced Olympic Lifts",
      time: "7:00 PM",
    },
  ],
};

export default function Schedule() {
  const router = useRouter();

  const tabs: (keyof typeof schedules)[] = ["mixed", "women", "men"];

  return (
    <section className="w-full md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12">

        <div className="text-center mb-6 md:mb-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Class <span className="text-cyan-400">Schedule</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed text-center">
            Stay consistent with our flexible training sessions.
          </p>
        </div>

    
        <div className="max-w-8xl mx-auto bg-[#0F223A]/80 backdrop-blur-md 
        p-5 rounded-2xl shadow-xl border border-cyan-500/20">

          <Tabs defaultValue="mixed" className="space-y-5  space-x-5">

            <TabsList className="grid grid-cols-3 bg-[#132A46] p-1 rounded-2xl gap-2  mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-lg py-2 text-sm font-semibold 
                  data-[state=active]:bg-cyan-400 
                  data-[state=active]:text-black capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

        
            {tabs.map((key) => (
              <TabsContent key={key} value={key}>
                <div className="overflow-x-auto">

                  <table className="w-full text-sm text-left">

                    <thead className="bg-[#132A46] text-gray-300 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Day</th>
                        <th className="px-4 py-3">Class</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {schedules[key].map((cls, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-700/30 hover:bg-[#17365D] transition"
                        >
                          <td className="px-4 py-3 text-cyan-400 font-medium">
                            {cls.day}
                          </td>
                          <td className="px-4 py-3">{cls.name}</td>
                          <td className="px-4 py-3">{cls.time}</td>
                          <td className="px-4 py-3 text-center">

                            <Button
                              className="text-xs px-4 py-2 rounded-full 
                              bg-cyan-400 text-black hover:bg-cyan-300 transition"
                              onClick={() => router.push("/schedule")}
                            >
                              Enroll
                            </Button>

                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}