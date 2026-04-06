

"use client";

import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="w-full py-12 
      bg-gradient-to-b from-[#0A192F] to-black text-white"
    >
      {/* FULL WIDTH (same as hero/about) */}
      <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center md:text-left">

        {/* LEFT */}
        <div className="space-y-4">
          <div className="text-4xl font-extrabold tracking-widest uppercase">
            <span className="text-cyan-400">Arya</span>GYM
          </div>

          <p className="text-sm text-gray-400">
            &copy; 2024 Aryagym Fitness Center. All rights reserved.
          </p>
        </div>

        {/* MIDDLE */}
        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">
            Quick Links
          </h4>

          <ul className="space-y-2 text-gray-400">
            {[
              "home",
              "about",
              "services",
              "schedule",
              "plans",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="hover:text-cyan-400 hover:pl-2 transition-all duration-300"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">
            Connect With Us
          </h4>

          <div className="flex justify-center md:justify-start space-x-6">
            {[
              { Icon: Instagram },
              { Icon: Twitter },
              { Icon: Youtube },
              { Icon: Facebook },
            ].map(({ Icon }, i) => (
              <a
                key={i}
                href="#"
                className="p-3 rounded-xl bg-[#0F223A] text-gray-400 
                hover:text-cyan-400 hover:bg-cyan-500/10 
                hover:scale-110 transition-all duration-300"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM LINE */}
      <div className="mt-10 border-t border-gray-700/30 pt-6 text-center text-gray-500 text-sm">
        Built with 💪 for a stronger you.
      </div>
    </footer>
  );
}