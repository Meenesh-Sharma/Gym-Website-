

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Flower, GanttChart, Sun, HeartPulse } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Yoga & Mobility",
      description:
        "Improve flexibility, focus, and core strength with our various yoga disciplines.",
      icon: <Flower className="w-8 h-8 text-black" />,
    },
    {
      title: "High-Intensity Boxing",
      description:
        "Full-body workout mastering footwork, power, and conditioning.",
      icon: <GanttChart className="w-8 h-8 text-black" />,
    },
    {
      title: "Strength & Power",
      description:
        "Access to premium equipment and progressive training programs.",
      icon: <Sun className="w-8 h-8 text-black" />,
    },
    {
      title: "Cardio Performance",
      description:
        "Rowers, treadmills, ellipticals, and spin bikes with virtual reality integration.",
      icon: <HeartPulse className="w-8 h-8 text-black" />,
    },
  ];

  return (
    <section
      id="services"
      className="w-full py-10
      bg-gradient-to-b from-black via-[#0A192F] to-black text-white"
    >
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full px-4 sm:px-6 lg:px-12">

        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 md:mb-4">
          Our <span className="text-cyan-400">Core Services</span>
        </h2>
         <p className="text-lg text-gray-300 leading-relaxed text-center mb-10">
            Our core services are designed to help you achieve your fitness goals with expert guidance.
          </p>

        {/* GRID (UNCHANGED STRUCTURE) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-[#0F223A] p-6 rounded-xl text-center 
              border border-cyan-500/20 shadow-xl
              hover:bg-[#17365D] hover:scale-[1.03] 
              transition duration-300"
            >
              <CardHeader className="flex flex-col items-center space-y-4">

                {/* ICON */}
                <div className="p-4 inline-block bg-cyan-400 rounded-full 
                shadow-md group-hover:scale-110 transition">
                  {service.icon}
                </div>

                {/* TITLE */}
                <CardTitle className="text-xl font-bold text-cyan-400">
                  {service.title}
                </CardTitle>

                {/* DESC */}
                <CardDescription className="text-gray-300 text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}