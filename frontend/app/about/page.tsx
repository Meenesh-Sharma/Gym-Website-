"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  UserCheck,
  Dumbbell,
  PersonStanding,
  Zap,
} from "lucide-react";

export default function About() {
  const cards = [
    {
      title: "Certified Experts",
      description:
        "Our trainers are nationally certified, focused on crafting personalized fitness journeys for every member.",
      icon: UserCheck,
    },
    {
      title: "Dedicated Zones",
      description:
        "Spacious areas for cardio, strength, and functional training designed for maximum performance.",
      icon: Dumbbell,
    },
    {
      title: "Inclusive Environment",
      description:
        "A welcoming space for everyone, including dedicated sections and women-only hours.",
      icon: PersonStanding,
    },
    {
      title: "Cutting-Edge Tech",
      description:
        "Modern equipment and virtual fitness programs to keep you ahead of your goals.",
      icon: Zap,
    },
  ];

  return (
    <section
      id="about"
      className="py-10 md:py-8 px-4 bg-gradient-to-b from-black via-[#0A192F] to-black text-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About <span className="text-cyan-400">ZYM</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We believe fitness is more than a routine — it's a lifestyle.
            Our mission is to build a strong, confident, and healthy community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-400 transition duration-300 hover:shadow-xl hover:shadow-cyan-500/10 rounded-2xl"
              >
                <CardHeader className="flex flex-col items-start gap-4">

                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <CardTitle className="text-lg font-semibold text-cyan-400">
                    {card.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent />
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Ready to Transform Yourself?
            </h3>
            <p className="text-gray-400 mb-6">
              Join our community and start your fitness journey today.
            </p>

            <a
              href="/S"
              className="inline-block px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition transform hover:scale-105"
            >
              Join Now 🚀
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}