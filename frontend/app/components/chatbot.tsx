

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bot, User, Send, MessageCircle } from "lucide-react";

// type Message = {
//   id: number;
//   sender: "bot" | "user";
//   text: string;
// };

// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       sender: "bot",
//       text: "💪 Welcome to FitBot! Type 'hi' or choose an option below:",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [showOptions, setShowOptions] = useState(true); // options visibility

//   const handleSend = (text: string) => {
//     if (!text.trim()) return;

//     const newMessage: Message = { id: Date.now(), sender: "user", text };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");

//     // Bot Reply
//     setTimeout(() => {
//       let botReply = "I’m here to assist your fitness journey 💪";

//       if (/feedback/i.test(text)) {
//         botReply = "📝 Please share your feedback with us. We value your opinion!";
//       } else if (/store/i.test(text)) {
//         botReply = "🛒 Our Fitness Store has protein powders, gym gear, and more!";
//       } else if (/plans/i.test(text)) {
//         botReply =
//           "📋 Your Plans:\n- Weight Loss Plan\n- Muscle Gain Plan\n- Personal Trainer Plan";
//       } else if (/schedule/i.test(text)) {
//         botReply =
//           "📅 Class Schedule:\n- Monday: HIIT (7 AM), Yoga (6 PM)\n- Tuesday: Cardio Blast (7 AM), Zumba (6 PM)\n- Wednesday: Strength Training (7 AM), Pilates (6 PM)\n- Thursday: Boxing (7 AM), CrossFit (6 PM)\n- Friday: Mobility (7 AM), Dance Fitness (6 PM)\n- Saturday: Bootcamp (8 AM)\n- Sunday: Rest & Recovery 🧘";
//       } else if (/coaches/i.test(text)) {
//         botReply =
//           "🏋️ Our Coaches:\n- John (Strength)\n- Sarah (Yoga)\n- Mike (Boxing)\n- Emma (Nutrition)";
//       } else if (/hi/i.test(text)) {
//         botReply = "👋 Hello! Choose an option below to get started.";
//         setShowOptions(true); // show options again only on "hi"
//       }

//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now() + 1, sender: "bot", text: botReply },
//       ]);
//     }, 800);

//     // Hide options after selecting one
//     if (!/hi/i.test(text)) {
//       setShowOptions(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {isOpen ? (
//         <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-xl rounded-2xl border border-gray-700 bg-gray-900 text-white">
//           {/* Header */}
//           <CardHeader className="bg-red-600 text-white rounded-t-2xl p-3 flex justify-between items-center">
//             <span className="font-bold flex items-center gap-2 text-sm">
//               <Bot className="w-5 h-5" /> FitBot
//             </span>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white hover:text-gray-200"
//             >
//               ✕
//             </button>
//           </CardHeader>

//           {/* Messages */}
//           <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex items-start gap-2 ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.sender === "bot" && (
//                   <div className="bg-red-500/20 p-2 rounded-full">
//                     <Bot className="w-4 h-4 text-red-400" />
//                   </div>
//                 )}
//                 <div
//                   className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm whitespace-pre-line ${
//                     msg.sender === "user"
//                       ? "bg-red-600 text-white rounded-br-none"
//                       : "bg-gray-800 text-gray-100 rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//                 {msg.sender === "user" && (
//                   <div className="bg-red-500/20 p-2 rounded-full">
//                     <User className="w-4 h-4 text-red-400" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </CardContent>

//           {/* Fixed Options */}
//           {showOptions && (
//             <div className="p-3 border-t border-gray-700 bg-gray-800 space-y-2">
//               <p className="text-gray-300 font-semibold text-xs">
//                 ⚡ Quick Actions:
//               </p>
//               <div className="grid grid-cols-2 gap-2">
//                 <Button
//                   className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
//                   onClick={() => handleSend("Feedback")}
//                 >
//                   📝 Feedback
//                 </Button>
//                 <Button
//                   className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
//                   onClick={() => handleSend("Store")}
//                 >
//                   🛒 Store
//                 </Button>
//                 <Button
//                   className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
//                   onClick={() => handleSend("Plans")}
//                 >
//                   📋 Plans
//                 </Button>
//                 <Button
//                   className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
//                   onClick={() => handleSend("Schedule")}
//                 >
//                   📅 Schedule
//                 </Button>
//                 <Button
//                   className="col-span-2 bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
//                   onClick={() => handleSend("Coaches")}
//                 >
//                   🏋️ Coaches
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Input */}
//           <div className="flex items-center gap-2 border-t border-gray-700 p-2 bg-gray-900">
//             <Input
//               placeholder="Type your message..."
//               className="bg-gray-800 text-white border-gray-700"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
//             />
//             <Button
//               size="icon"
//               onClick={() => handleSend(input)}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </div>
//         </Card>
//       ) : (
//         // Floating button
//         <Button
//           onClick={() => setIsOpen(true)}
//           className="rounded-full w-14 h-14 bg-red-600 shadow-lg hover:bg-red-700"
//         >
//           <MessageCircle className="w-6 h-6" />
//         </Button>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, MessageCircle } from "lucide-react";
import axios from "axios";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "💪 Welcome to FitBot! Type 'hi' or choose an option below:",
    },
  ]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    if (!/hi/i.test(text)) {
      setShowOptions(false);
    }

    try {
      let botReply = "I’m here to assist your fitness journey 💪";

   
     

      // 🔹 STORE (Products API)
    if (/store/i.test(text)) {
        const res = await fetch(`${API}/products`);
        const data = await res.json();

        if (data?.length) {
          botReply =
            "🛒 Available Products:\n" +
            data
              .slice(0, 5)
              .map((p: any) => `${p.name}${p.price ? ` - ₹${p.price}` : ""}`)
              .join("\n") +
            "\n\n👉 Visit Store page for <Buy></Buy>.";
        } else {
          botReply = "🛒 No products available right now.";
        }
      }

      // 🔹 PLANS (Pricing API)
      else if (/plans/i.test(text)) {
        const res = await axios.get(`${API}/content/pricing`);
        const data = res.data.data || [];

        if (data.length > 0) {
          botReply =
            "📋 Available Plans:\n" +
            data.map((p: any) => `- ${p.name} - ₹${p.price ?? "N/A"}`).join("\n") +
            "\n\n👉 Visit Plans page for full details.";
        } else {
          botReply = "📋 No plans found.";
        }
      }

      // 🔹 SCHEDULE (Classes API)
      else if (/schedule/i.test(text)) {
        const res = await axios.get(`${API}/classes/schedule`);
        const data = res.data;

        // Combine all categories (like your page tabs)
        const allClasses = [
          ...(data.mixed || []),
          ...(data.women || []),
          ...(data.men || []),
        ];

        if (allClasses.length > 0) {
          botReply =
            "📅 Upcoming Classes:\n" +
            allClasses
              .slice(0, 5)
              .map(
                (c: any) =>
                  `- ${c.name} (${c.time})`
              )
              .join("\n") +
            "\n\n👉 Visit Schedule page for full timetable.";
        } else {
          botReply = "📅 No schedule available.";
        }
      }

      // 🔹 COACHES (Trainer API)
      else if (/coaches/i.test(text)) {
        const res = await axios.get(`${API}/staff?role=Trainer`);
        const data = res.data || [];

        if (Array.isArray(data) && data.length > 0) {
          botReply =
            "🏋️ Our Trainers:\n" +
            data
              .map(
                (c: any) =>
                  `- ${c.name} (${c.speciality || "Trainer"})`
              )
              .join("\n") +
            "\n\n👉 Visit Coaches page to know more.";
        } else {
          botReply = "🏋️ No trainers found.";
        }
      }

      // 🔹 HI (reset options)
      else if (/hi/i.test(text)) {
        botReply = "👋 Hello! Choose an option below to get started.";
        setShowOptions(true);
      }

      // 🔹 DEFAULT RESPONSE
      else {
        botReply =
          "🤖 I couldn't fully understand that.\n👉 Please visit the website pages for detailed information.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "⚠️ Something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-xl rounded-2xl border border-gray-700 bg-gray-900 text-white">
          {/* Header */}
          <CardHeader className="bg-red-600 text-white rounded-t-2xl p-3 flex justify-between items-center">
            <span className="font-bold flex items-center gap-2 text-sm">
              <Bot className="w-5 h-5" /> FitBot
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                {msg.sender === "bot" && (
                  <div className="bg-red-500/20 p-2 rounded-full">
                    <Bot className="w-4 h-4 text-red-400" />
                  </div>
                )}

                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm whitespace-pre-line ${msg.sender === "user"
                    ? "bg-red-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="bg-red-500/20 p-2 rounded-full">
                    <User className="w-4 h-4 text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>

          {/* Options */}
          {showOptions && (
            <div className="p-3 border-t border-gray-700 bg-gray-800 space-y-2">
              <p className="text-gray-300 font-semibold text-xs">
                ⚡ Quick Actions:
              </p>

              <div className="grid grid-cols-2 gap-2">
              
                <Button
                  className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
                  onClick={() => handleSend("Store")}
                >
                  🛒 Store
                </Button>

                <Button
                  className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
                  onClick={() => handleSend("Plans")}
                >
                  📋 Plans
                </Button>

                <Button
                  className="bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
                  onClick={() => handleSend("Schedule")}
                >
                  📅 Schedule
                </Button>

                <Button
                  className=" bg-gray-700 hover:bg-red-600 text-white text-xs rounded-lg"
                  onClick={() => handleSend("Coaches")}
                >
                  🏋️ Coaches
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-700 p-2 bg-gray-900">
            <Input
              placeholder="Type your message..."
              className="bg-gray-800 text-white border-gray-700"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend(input)
              }
            />

            <Button
              size="icon"
              onClick={() => handleSend(input)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-red-600 shadow-lg hover:bg-red-700"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}