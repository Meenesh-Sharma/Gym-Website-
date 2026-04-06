
"use client";

import * as React from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Motivation() {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  //  Fetch all blog content
  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/content/blog`
        );

        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full py-10 md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12">

        {/*  HEADING */}
        <div className="text-center mb-6 md:mb-8 space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-3xl font-extrabold leading-tight">
            A Dose of <span className="text-cyan-400">Motivation</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Discipline beats motivation. Build a mindset that never quits.
          </p>
        </div>

        {/*  MAIN CARD (same style, no image now) */}
        <Card
          className="bg-[#0F223A]/80 backdrop-blur-md 
          border border-cyan-500/20 
          rounded-2xl shadow-xl overflow-hidden"
        >
          <CardContent className="p-8 space-y-8">

            {/* LEFT HEADER SAME */}
            <div className="flex items-center gap-3 text-cyan-400">
              <Quote className="w-6 h-6" />
              <span className="uppercase tracking-widest text-sm">
                Aryagym Philosophy
              </span>
            </div>

            {/*  BLOG GRID */}
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : blogs.length > 0 ? (
              <div className="flex gap-16 overflow-x-auto no-scrollbar pb-2 scroll-smooth">

                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="min-w-[300px] max-w-[300px] h-[260px] flex-shrink-0
  relative group bg-[#0A192F] border border-cyan-500/20 
  rounded-xl p-5 shadow-md hover:shadow-cyan-500/20 
  transition duration-300 flex flex-col"
                  >
                    {/* Glow hover */}
                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-xl rounded-xl transition" />

                    <div className="relative space-y-3">
                      {/* Author */}
                      <span className="text-xs text-cyan-400 uppercase tracking-wider">
                        {blog.author || "Aryagym"}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold leading-snug">
                        {blog.title}
                      </h3>


                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <p className="text-gray-400">No blogs available</p>
            )}

          </CardContent>
        </Card>
      </div>
    </section>
  );
}