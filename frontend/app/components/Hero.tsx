
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeHero() {
  const [heroContent, setHeroContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/content/hero`
        );

        if (res.data.success && res.data.data.length > 0) {
          setHeroContent(res.data.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-black via-[#0A192F] to-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid items-center gap-4 md:gap-6 md:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center md:text-left">

            <h1 className="text-2xl sm:text-4xl lg:text-3xl font-extrabold leading-tight">
              <span className="text-cyan-400">IGNITE</span> Your Potential.
              <br />
              Transform Your Life.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto md:mx-0">
              Join Aryagym, where state-of-the-art facilities meet personalized
              coaching to help you crush your fitness goals. Your prime physique
              awaits.
            </p>

            <Link href="#plans">
              <Button
                size="lg"
                className="bg-cyan-500 mt-4 px-8 py-3 text-sm font-bold uppercase 
    rounded-xl text-black shadow-lg hover:bg-cyan-400 
    hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
              </Button>
            </Link>

          </div>

          {/*  RIGHT SIDE CARD (FIXED DATA) */}
          <div
            className="relative h-56 sm:h-72 md:h-80 lg:h-96 
            overflow-hidden rounded-2xl shadow-2xl border border-cyan-500/30 
            group bg-gradient-to-b from-black via-[#0A192F] to-black text-white p-5 flex flex-col justify-between"
          >
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : heroContent ? (
              <>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-2">
                    Latest Update
                  </h2>
                  <div className="relative mt-2">
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-xl" />

                    {/* Message box */}
                    <div className="relative bg-gradient-to-r from-cyan-50 to-white border border-cyan-200 rounded-xl p-4 shadow-sm mt-14 pt-8 pb-8">

                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-semibold">
                          Announcement
                        </span>

                        <span className="text-[10px] bg-cyan-500 text-white px-2 py-0.5 rounded-md">
                          NEW
                        </span>
                      </div>

                      {/* Message → MULTI LINE + STYLED */}
                      <div className="text-gray-800 text-sm font-medium leading-relaxed space-y-1">
                        {heroContent.message?.split("\n").map((line: string, i: number) => (
                          <p key={i} className="flex items-start gap-2">

                            <span>{line}</span>
                          </p>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>

              </>
            ) : (
              <p className="text-gray-500 text-sm">
                No content available
              </p>
            )}

            {/* Hover effect same as before */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}