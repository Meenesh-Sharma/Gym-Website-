"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Plus } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminExercisePage() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchExercises = async () => {
    try {
      const res = await axios.get(`${API}/exercise`);
      setExercises(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // ADD
  const handleAdd = async () => {
    if (!name || !kcal) return alert("Fill all fields");

    try {
      setLoading(true);
      await axios.post(`${API}/exercise`, {
        name,
        kcal,
      });

      setName("");
      setKcal("");
      setOpen(false);
      fetchExercises();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding exercise");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this exercise?")) return;

    await axios.delete(`${API}/exercise/${id}`);
    fetchExercises();
  };

  return (
    <div className="p-6 md:p-10 space-y-8 ">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Exercise Manager</h1>
          <p className="text-sm text-gray-400">
            Manage all workout exercises and calorie data
          </p>
        </div>

        {/* ADD BUTTON */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-400 text-black hover:bg-cyan-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#0F223A] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Add New Exercise</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <Input
                placeholder="Exercise Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10"
              />

              <Input
                type="number"
                placeholder="Calories (kcal)"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-cyan-400 text-black hover:bg-cyan-300"
                onClick={handleAdd}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Exercise"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* CONTENT */}
      <Card className=" border border-white/10">
        <CardHeader>
          <CardTitle>All Exercises</CardTitle>
          <CardDescription className="text-black">
            Total: {exercises.length} exercises
          </CardDescription>
        </CardHeader>

        <CardContent>
          {exercises.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No exercises found</p>
              <p className="text-sm">Start by adding a new exercise 🚀</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exercises.map((ex) => (
                <Card
                  key={ex._id}
                  className="p-4 bg-black/40 border border-white/10 hover:scale-[1.03] transition duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{ex.name}</h3>
                      <p className="text-sm text-black">
                        {ex.kcal} kcal
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(ex._id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}