
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import {
    User, Activity, Trophy, Settings,
    CreditCard, Flame, Dumbbell,
    CheckCircle2, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;


export default function GymProfilePage() {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<any>({});
    const [stats, setStats] = useState({
        workouts: 0,
        streak: 0,
        level: "Beginner",
        hours: 0
    });

    const [workout, setWorkout] = useState<any>({});
    const [isEditing, setIsEditing] = useState(false);
    const [originalUser, setOriginalUser] = useState<any>({});
    const handleCancel = () => {
        setUser(originalUser);
        setIsEditing(false);
    };


    const handleSave = async () => {
        const token = localStorage.getItem("token");

      await axios.put(`${API}/user/${user._id}`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setOriginalUser(user);
        setIsEditing(false);
    };

    // FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // PROFILE
                const { data } = await axios.get(`${API}/user/profile`, config);
                setUser(data);




                // SUBSCRIPTION (UNCHANGED)
                const subRes = await axios.get(
                    `${API}/subscriptions/user/${data._id}`,
                    config
                );

                setUser((prev: any) => ({
                    ...prev,
                    plan: subRes.data.plan,
                    status: subRes.data.status,
                    startDate: subRes.data.startDate,
                    expiryDate: subRes.data.endDate,
                }));

                // WORKOUT PLAN
                const workoutRes = await axios.get(`${API}/workout/my`, config);
                const plan = workoutRes.data?.plan || {};
                setWorkout(plan);

                //  STATS CALCULATION
                const selectedKeys = Object.keys(plan).filter((k) => plan[k]);

                const totalWorkouts = selectedKeys.length;

                const uniqueDays = new Set(
                    selectedKeys.map((k) => k.split("-")[1])
                ).size;

                const hours = Math.floor(totalWorkouts * 0.5);

                let level = "Beginner";
                if (totalWorkouts > 20) level = "Advanced";
                else if (totalWorkouts > 10) level = "Intermediate";

                setStats({
                    workouts: totalWorkouts,
                    streak: uniqueDays,
                    level,
                    hours
                });

            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-white text-center">Loading...</p>;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <header className="relative group">
                    <div className="h-48 w-full rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-90 shadow-2xl shadow-indigo-500/10" />

                    <div className="absolute -bottom-0 left-8 flex flex-col md:flex-row items-end gap-6 mb-4">
                        <div className="relative">
                            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-[6px] border-[#020617] shadow-xl rounded-3xl">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-slate-800 text-2xl">
                                    {user?.name
                                        ? user.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
                                        : "NA"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl border-4 border-[#020617]">
                                <CheckCircle2 size={20} className="text-white" />
                            </div>
                        </div>

                        <div className="pb-4 space-y-1">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user.name}</h1>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium px-2 py-0.5 rounded bg-white/10 text-indigo-300">
                                    Fitness Member
                                </span>
                                <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">
                                    Iron Fitness Elite
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* STATS GRID */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Workouts", value: stats.workouts, icon: Dumbbell, color: "text-blue-400" },
                        { label: "Streak", value: `${stats.streak} Days`, icon: Flame, color: "text-orange-500" },
                        { label: "Level", value: stats.level, icon: Trophy, color: "text-yellow-400" },
                        { label: "Hours", value: stats.hours, icon: Clock, color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <Card key={i} className="bg-slate-900/50 border-slate-800 backdrop-blur-md">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* TABS */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start h-auto p-1 bg-slate-900/80 border border-slate-800 rounded-2xl mb-8 backdrop-blur-md overflow-x-auto">
                        <TabsTrigger value="overview">
                            <User size={18} className="mr-2" /> Overview
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            <Settings size={18} className="mr-2" /> Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* OVERVIEW */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* PLAN CARD (UNCHANGED EXACTLY) */}
                            <Card className="md:col-span-1 bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CreditCard size={80} />
                                </div>

                                <CardHeader>
                                    <p className="text-indigo-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                        Plan Status
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <h3 className="text-2xl font-bold italic">
                                        {user.plan || "No Plan"}
                                    </h3>

                                    <div className="text-xs text-emerald-400 font-bold">
                                        {user.status || "N/A"}
                                    </div>

                                    <div className="text-xs text-slate-400">
                                        Start:{" "}
                                        <span className="text-indigo-300 font-mono">
                                            {user.startDate
                                                ? new Date(user.startDate).toDateString()
                                                : "N/A"}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Expiry:{" "}
                                        {user.expiryDate
                                            ? new Date(user.expiryDate).toDateString()
                                            : "N/A"}
                                    </div>
                                </CardContent>
                            </Card>

                            {/*  REAL WORKOUT (ALL DATA) */}
                            <Card className="md:col-span-2 bg-slate-900/50 border-slate-800">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">Recent Training</CardTitle>
                                    <Activity size={20} className="text-indigo-500" />
                                </CardHeader>

                                <CardContent className="overflow-x-auto">

                                    {Object.keys(workout).filter((k) => workout[k]).length === 0 ? (
                                        <p className="text-center text-slate-500 py-6">
                                            No workouts selected yet
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-8 gap-3 items-center text-sm">

                                            {/* DAYS HEADER */}
                                            <div></div>
                                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                                <div key={day} className="text-center font-semibold text-slate-400">
                                                    {day}
                                                </div>
                                            ))}

                                            {/* ONLY SELECTED EXERCISES */}
                                            {Array.from(
                                                new Set(
                                                    Object.keys(workout)
                                                        .filter((k) => workout[k])
                                                        .map((k) => k.split("-")[0])
                                                )
                                            ).map((exercise) => (
                                                <div key={exercise} className="contents">

                                                    {/* Exercise Name */}
                                                    <div className="font-medium text-slate-200">
                                                        {exercise}
                                                    </div>

                                                    {/* DAYS CELLS */}
                                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                                                        const key = `${exercise}-${day}`;
                                                        const isChecked = workout[key];

                                                        return (
                                                            <div
                                                                key={key}
                                                                className={`flex justify-center items-center rounded-lg h-8
                    ${isChecked ? "bg-green-400" : "bg-white/5"}
                  `}
                                                            >

                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}

                                        </div>
                                    )}

                                </CardContent>
                            </Card>

                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card className="bg-slate-900/50 border-slate-800 w-xl">
                            <CardHeader>
                                <CardTitle>View Profile</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <Input
                                    value={user.name || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />

                                <Input
                                    value={user.email || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <Button onClick={handleSave}>Save</Button>
                                        <Button variant="outline" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}