
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UserCheck, Dumbbell, PersonStanding, Zap } from "lucide-react";

export default function About() {
  const cards = [
    {
      title: "Certified Experts",
      description:
        "All trainers are nationally certified and dedicated to building your personalized road map to success.",
      icon: <UserCheck className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "Dedicated Zones",
      description:
        "Spacious, specialized areas for free weights, cardio, and high-intensity functional training.",
      icon: <Dumbbell className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "Inclusive Environment",
      description:
        "Includes dedicated sections and Women's-Only Hours for maximum comfort and focus.",
      icon: <PersonStanding className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "Cutting-Edge Tech",
      description:
        "Integrated virtual class options and modern, well-maintained equipment.",
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
    },
  ];

  return (
    <section
      id="about"
      className=" w-full 
      bg-gradient-to-b from-black via-[#0A192F] to-black text-white"
    >
     <div className="text-center mb-6 md:mb-8 space-y-4">
       <h1 className="text-2xl sm:text-4xl lg:text-3xl font-extrabold leading-tight">
        Discover{" "}
        <span className="text-cyan-400">Our Aryagym</span> Philosophy
      </h1>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* DESCRIPTION */}
        <p className="text-lg text-gray-300 leading-relaxed text-center">
          At Aryagym, we believe fitness is personal, which is why we've created a
          supportive, inclusive environment for everyone. Our facility is designed
          to meet diverse needs, offering specialized zones and expert guidance.
        </p>

        {/* SAME GRID (unchanged) */}
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="bg-[#0F223A] border-l-4 border-cyan-400 
              hover:bg-[#17365D] shadow-xl 
              transition duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="flex items-start space-x-4">
                {card.icon}
                <div>
                  <CardTitle className="text-xl font-bold text-cyan-400 mb-1">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {card.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent />
            </Card>
          ))}
        </div>

        {/* BUTTON */}
        {/* <div className="text-center pt-8">
          <a
            href="#become-member"
            className="inline-block px-12 py-4 text-xl font-bold uppercase 
            rounded-xl text-black bg-cyan-400 
            shadow-lg hover:bg-cyan-300 
            hover:scale-[1.03] transition-transform duration-300"
          >
            Join This Moment
          </a>
        </div> */}
      </div>
     </div>
     
    </section>
  );
}