
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Flower, GanttChart, Sun, HeartPulse } from "lucide-react";

type Service = {
  _id?: string;
  title: string;
  description: string;
  icon: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services`
        );

        // Safe API handling
        setServices(res.data.data || res.data || []);
      } catch (err) {
        console.log(err);

        // fallback data
        setServices([
          {
            title: "Yoga & Mobility",
            description:
              "Improve flexibility, focus, and core strength with our yoga programs.",
            icon: "yoga",
          },
          {
            title: "High-Intensity Boxing",
            description:
              "Full-body workout mastering power, stamina, and agility.",
            icon: "boxing",
          },
          {
            title: "Strength & Power",
            description:
              "Train with premium equipment and structured programs.",
            icon: "strength",
          },
          {
            title: "Cardio Performance",
            description:
              "Advanced cardio machines with immersive training.",
            icon: "cardio",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ICON MAP
  const iconMap: Record<string, any> = {
    yoga: Flower,
    boxing: GanttChart,
    strength: Sun,
    cardio: HeartPulse,
  };

  return (
    <section className="py-10 md:py-8 px-4 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-cyan-400">Services</span>
          </h2>
          <p className="text-gray-400">
            Explore a wide range of fitness programs designed to push your limits
            and transform your lifestyle.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-400">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Flower;

              return (
                <Card
                  key={service._id || service.title}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 
                  hover:border-cyan-400 transition duration-300 rounded-2xl 
                  hover:shadow-xl hover:shadow-cyan-500/20 
                  flex flex-col hover:-translate-y-1"
                >
                  <CardHeader className="flex flex-col items-center text-center gap-4 flex-1">

                    {/* ICON */}
                    <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* TITLE */}
                    <CardTitle className="text-lg font-semibold text-white">
                      {service.title}
                    </CardTitle>

                    {/* DESCRIPTION */}
                    <CardDescription className="text-gray-400 text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Optional footer space for alignment */}
                  <CardContent />
                </Card>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Start Your Fitness Journey Today
            </h3>
            <p className="text-gray-400 mb-6">
              Choose your program and take the first step toward transformation.
            </p>

            {/* FIXED LINK */}
            <Link
              href="/#plans"
              className="inline-block px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition transform hover:scale-105"
            >
              Get Started 🚀
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}