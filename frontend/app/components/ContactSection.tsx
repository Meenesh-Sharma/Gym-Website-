

"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false); 

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/messages`,
        form
      );

      setSuccess("Message sent successfully");
      setForm({ name: "", email: "", message: "" });

      
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong ❗");

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full  md:py-8 bg-gradient-to-b from-black via-[#0A192F] to-black text-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">

        <div className="text-center mb-10 space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-3xl font-extrabold leading-tight">
            Get In <span className="text-cyan-400">Touch</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions? We’re here to help you start your fitness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 
        bg-[#0F223A]/80 backdrop-blur-md 
        border border-cyan-500/20 
        p-8 rounded-2xl shadow-xl">

          <div className="space-y-3 md:space-y-5">
            <h3 className="text-2xl font-bold text-cyan-400">
              Contact Information
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex items-center gap-3">
                <Phone className="text-cyan-400 w-5 h-5" />
                <span>(+91) 906842....</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400 w-5 h-5" />
                <span>info@zymfitness.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-cyan-400 w-5 h-5 mt-1" />
                <span>100 Flex Street, Power City, Agra </span>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">
              We value your feedback. Please share your thoughts with us.
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-[#0A192F] border-gray-700 focus:border-cyan-400"
                  required
                />
              </div>

              <div>
               
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="bg-[#0A192F] border-gray-700 focus:border-cyan-400"
                  required
                />
              </div>

              <div>
            
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help you?"
                  className="bg-[#0A192F] border-gray-700 focus:border-cyan-400"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full 
                bg-cyan-400 text-black 
                hover:bg-cyan-300 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {success && (
                <p className="text-center text-sm text-cyan-400">
                  {success}
                </p>
              )}

            </form>
          </div>

        </div>
      </div>

     
      {showPopup && (
        <div className="fixed top-5 right-5 bg-cyan-400 text-black px-6 py-3 rounded-lg shadow-lg">
          {success}
        </div>
      )}
    </section>
  );
}