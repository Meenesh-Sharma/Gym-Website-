// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";

// const exercises = [
//     { name: "Push Ups", kcal: 50 },
//   { name: "Squats", kcal: 70 },
//   { name: "Running", kcal: 120 },
//   { name: "Plank", kcal: 40 },
//   { name: "Jump Rope", kcal: 100 },
//   { name: "Burpees", kcal: 110 },
//   { name: "Lunges", kcal: 60 },
//   { name: "Cycling", kcal: 90 },
//   { name: "Mountain Climbers", kcal: 80 },
//   { name: "Sit Ups", kcal: 45 },
//   { name: "Pull Ups", kcal: 85 },
//   { name: "Deadlift", kcal: 130 },
//   { name: "Bench Press", kcal: 95 },
//   { name: "Yoga", kcal: 30 },
//   { name: "Stretching", kcal: 20 },
// ];

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export default function WorkoutPage() {
//     const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

//     const handleCheck = (exercise: string, day: string) => {
//         const key = `${exercise}-${day}`;
//         setChecked((prev) => ({
//             ...prev,
//             [key]: !prev[key],
//         }));
//     };

//     const totalKcal = Object.keys(checked).reduce((acc, key) => {
//         if (checked[key]) {
//             const exerciseName = key.split("-")[0];
//             const exercise = exercises.find((e) => e.name === exerciseName);
//             return acc + (exercise?.kcal || 0);
//         }
//         return acc;
//     }, 0);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-black via-[#0A192F] to-black text-white p-6">
//             <h1 className="text-3xl font-bold mb-6">Workout Tracker</h1>

//             <div className="grid grid-cols-12 gap-6">

//                 {/* LEFT - Exercise List */}
//                 <Card className="col-span-3 bg-black/40 border border-white/10">
//                     <CardContent className="p-4 space-y-4">
//                         <h2 className="text-xl font-semibold">Exercises</h2>
//                         {exercises.map((ex) => (
//                             <div key={ex.name} className="flex justify-between text-sm">
//                                 <span>{ex.name}</span>
//                                 <span className="text-gray-400">{ex.kcal} kcal</span>
//                             </div>
//                         ))}
//                     </CardContent>
//                 </Card>

//                 {/* MIDDLE - Days with Checkboxes */}
//                 <Card className="col-span-6 bg-black/40 border border-white/10 overflow-x-auto">
//                     <CardContent className="p-4">
//                         <h2 className="text-xl font-semibold mb-4">Weekly Plan</h2>

//                         <div className="grid grid-cols-8 gap-4 items-center">
//                             <div></div>
//                             {days.map((day) => (
//                                 <div key={day} className="text-center text-sm font-medium">
//                                     {day}
//                                 </div>
//                             ))}

//                             {exercises.map((ex) => (
//                                 <div key={ex.name} className="contents">
//                                     <div className="text-sm font-medium">
//                                         {ex.name}
//                                     </div>

//                                     {days.map((day) => {
//                                         const key = `${ex.name}-${day}`;
//                                         return (
//                                             <div key={key} className="flex justify-center">
//                                                 <Checkbox
//                                                     checked={checked[key] || false}
//                                                     onCheckedChange={() => handleCheck(ex.name, day)}
//                                                 />
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* RIGHT - Calories */}
//                 <Card className="col-span-3 bg-black/40 border border-white/10">
//                     <CardContent className="p-4 space-y-6">
//                         <h2 className="text-xl font-semibold">Calories</h2>

//                         <div className="space-y-2">
//                             <p className="text-gray-400 text-sm">Total Burned</p>
//                             <p className="text-3xl font-bold text-green-400">
//                                 {totalKcal} kcal
//                             </p>
//                         </div>

//                         <div className="space-y-2">
//                             <p className="text-gray-400 text-sm">Earned Energy</p>
//                             <p className="text-2xl font-semibold text-blue-400">
//                                 {Math.floor(totalKcal * 0.8)} kcal
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>

//             </div>
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const API = process.env.NEXT_PUBLIC_API_URL;



const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkoutPage() {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<any[]>([]);

  //  Fetch existing plan
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/workout/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setChecked(res.data.plan || {});
          setIsLocked(res.data.isLocked);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    fetchWorkout();
  }, []);

  useEffect(() => {
  const fetchExercises = async () => {
    const res = await axios.get(`${API}/exercise`);
    setExercises(res.data);
  };

  fetchExercises();
}, []);

  const handleCheck = (exercise: string, day: string) => {
    if (isLocked) return;

    const key = `${exercise}-${day}`;
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //  Calculate kcal
  const totalKcal = Object.keys(checked).reduce((acc, key) => {
    if (checked[key]) {
      const exerciseName = key.split("-")[0];
      const exercise = exercises.find((e) => e.name === exerciseName);
      return acc + (exercise?.kcal || 0);
    }
    return acc;
  }, 0);

  //  Save Plan
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/workout/create`,
        { plan: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLocked(true);
      alert("Workout saved for this week ");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving plan");
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A192F] to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6"> Personal Workout Tracker Goal</h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <Card className="col-span-3 bg-black/40 border border-white/10">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Exercises</h2>

            {exercises.map((ex) => (
              <div key={ex.name} className="flex justify-between text-sm">
                <span>{ex.name}</span>
                <span className="text-gray-400">{ex.kcal} kcal</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* MIDDLE */}
        <Card className="col-span-6 bg-black/40 border border-white/10 overflow-auto max-h-[600px]">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Weekly Plan</h2>

            <div className="grid grid-cols-8 gap-4 items-center">
              <div></div>

              {days.map((day) => (
                <div key={day} className="text-center text-sm font-medium">
                  {day}
                </div>
              ))}

              {exercises.map((ex) => (
                <div key={ex.name} className="contents">
                  <div className="text-sm font-medium">
                    {ex.name}
                  </div>

                  {days.map((day) => {
                    const key = `${ex.name}-${day}`;
                    return (
                      <div key={key} className="flex justify-center">
                        <Checkbox
                          disabled={isLocked}
                          checked={checked[key] || false}
                          onCheckedChange={() =>
                            handleCheck(ex.name, day)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* SAVE BUTTON */}
            <div className="mt-6 flex justify-end">
              <button
                disabled={isLocked}
                onClick={handleSave}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isLocked
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLocked ? "Plan Locked 🔒" : "Save Weekly Plan"}
              </button>
            </div>

          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card className="col-span-3 bg-black/40 border border-white/10">
          <CardContent className="p-4 space-y-6">
            <h2 className="text-xl font-semibold">Calories</h2>

            <div>
              <p className="text-gray-400 text-sm">Total Burned</p>
              <p className="text-3xl font-bold text-green-400">
                {totalKcal} kcal
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Earned Energy</p>
              <p className="text-2xl font-semibold text-blue-400">
                {Math.floor(totalKcal * 0.8)} kcal
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}