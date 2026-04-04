"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BecomeMember() {
    return (
        <section id="become-member" className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#132A46] rounded-2xl shadow-2xl grid md:grid-cols-2">
                {/* Left: Form */}
                <div className="p-8 lg:p-12 space-y-6">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Become A <span className="accent-color">Member</span> Today!
                    </h2>
                    <p className="text-gray-400">
                        Fill out the quick form and we'll contact you within 24 hours to schedule your free trial session.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="member-name" className="text-gray-300">
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                id="member-name"
                                placeholder="Enter your full name"
                                className="bg-[#0A192F] border-gray-700 focus:border-accent focus:ring-accent"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="member-email" className="text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                id="member-email"
                                placeholder="Enter your email"
                                className="bg-[#0A192F] border-gray-700 focus:border-accent focus:ring-accent"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="member-goal" className="text-gray-300">
                                Primary Goal
                            </Label>
                            <Select defaultValue="weightloss">
                                <SelectTrigger id="member-goal" className="bg-[#0A192F] border-gray-700 focus:border-accent focus:ring-accent">
                                    <SelectValue placeholder="Select your goal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weightloss">Weight Loss</SelectItem>
                                    <SelectItem value="muscle">Muscle Gain</SelectItem>
                                    <SelectItem value="endurance">Endurance</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="flex items-center justify-center text-sm px-4 py-2 
               text-gray-900 bg-green-500 rounded-full hover:bg-emerald-200 transition">
                            Get Your Free Trial
                        </Button>
                    </form>
                </div>

                {/* Right: Image */}
                <div className="h-96 md:h-auto rounded-r-2xl overflow-hidden hidden md:block">
                    <img
                        src="https://placehold.co/800x800/22C55E/ffffff?text=Energetic+Gym+View"
                        alt="Dynamic image of a gym floor"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
