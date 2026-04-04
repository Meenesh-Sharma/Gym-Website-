// import Image from "next/image";

// import { HomeHero } from "./components/Hero";
// import Header from "./components/Header";
// import About from "./components/About";
// import Services from "./components/Service";
// import Coaches from "./components/Coaches";
// import Testimonials from "./components/Testimonials";
// import Schedule from "./components/Schedule";
// import { Plane } from "lucide-react";
// import Plans from "./components/Plan";
// import Motivation from "./components/Motivation";
// import FitnessStore from "./components/FitnessStore";
// import Footer from "./components/Footer";
// import ContactSection from "./components/ContactSection";
// import BecomeMember from "./components/BecomeMember";

// export default function Home() {
//   return (
//     <> <div className="bg-[#0A192F] text-white"><Header />
//     <HomeHero />
//     <About />
//     <Services />
//     <Coaches />
//     <Testimonials />
//     <Schedule />
//     <Plans />
//     <Motivation />
//     <FitnessStore />
//     {/* <BecomeMember /> */}
//     <ContactSection />

//     <Footer />

//     </div>
    
//     </>
//   );
// }



"use client";

import Header from "./components/Header";
import { HomeHero } from "./components/Hero";
import About from "./components/About";
import Services from "./components/Service";
import Coaches from "./components/Coaches";
import Testimonials from "./components/Testimonials";
import Schedule from "./components/Schedule";
import Plans from "./components/Plan";
import Motivation from "./components/Motivation";
import FitnessStore from "./components/FitnessStore";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// export default function Home() {
//   return (
//     <div className="bg-[#0A192F] text-white overflow-x-hidden">

//       {/*  HEADER */}
//       <Header />

//       {/*  HERO */}
//       <HomeHero />

//       {/*  SOCIAL PROOF FIRST (VERY IMPORTANT) */}
//       <Testimonials />

//       {/*  ABOUT */}
//       <About />

//       {/*  SERVICES */}
//       <Services />

//       {/*  COACHES */}
//       <Coaches />

//       {/*  SCHEDULE */}
//       <Schedule />

//       {/*  PRICING (MAIN CONVERSION SECTION) */}
//       <Plans />

//       {/*  MOTIVATION (EMOTIONAL PUSH) */}
//       <Motivation />

//       {/*  STORE (UPSELL) */}
//       <FitnessStore />

//       {/*  CONTACT */}
//       <ContactSection />

//       {/*  FOOTER */}
//       <Footer />
//     </div>
//   );
// } 


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A192F] to-black text-white overflow-x-hidden">

      <Header />
      <HomeHero />
      <About />

      <Services />
      <Coaches />

      <Schedule />
      <Plans />
       <Testimonials />
      <Motivation />
      <FitnessStore />
      <ContactSection />
      <Footer />

    </div>
  );
}