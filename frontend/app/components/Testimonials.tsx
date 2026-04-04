

"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  message: string;
  approved: boolean;
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<Message[]>([]);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  //  Fetch approved messages
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/messages`
        );

        //  Filter only approved
        const approvedMessages = res.data.filter(
          (msg: Message) => msg.approved
        );

        setTestimonials(approvedMessages);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="w-full md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 relative">

        {/*  PROFESSIONAL HEADING */}
        <div className="text-center mb-6 md:mb-8 space-y-4">
          <div className="flex justify-center items-center gap-2 text-cyan-400 text-sm uppercase tracking-widest">
            <Star className="w-4 h-4" />
            Testimonials
            <Star className="w-4 h-4" />
          </div>

          <h2 className="text-4xl font-extrabold text-center mb-6 md:mb-4">
            What Our <span className="text-cyan-400">Members Say</span>
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed text-center">
            Real stories from people who transformed their lives with ZYM.
          </p>
        </div>

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar  snap-x snap-mandatory"
        >
          {testimonials.map((t, i) => (
            <Card
              key={t._id}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-start
              bg-[#0F223A] p-6 rounded-xl shadow-xl 
              border border-cyan-500/20
              hover:bg-[#17365D] hover:scale-[1.02] 
              transition duration-300"
            >
              <CardHeader className="p-0">

                {/* QUOTE ICON */}
                <Quote className="w-8 h-8 text-cyan-400 mb-3" />

                {/* TEXT */}
                <p className="text-sm text-gray-300 italic mb-4 leading-relaxed">
                  "{t.message}"
                </p>

                {/* AUTHOR */}
                <p className="text-cyan-400 font-semibold text-sm">
                  — {t.name}
                </p>

              </CardHeader>

              <CardContent className="p-0 mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-cyan-400" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}