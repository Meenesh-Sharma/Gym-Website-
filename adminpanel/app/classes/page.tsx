

"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface GymClass {
  _id: string;
  name: string;
  instructor: string;
  schedule: string;
  time: string;
  duration: string;
  capacity: number;
  gender: "Men" | "Women" | "All";
  days: number[]; 
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/classes`;

export default function ClassesPage() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    instructor: "",
    schedule: "",
    time: "",
    duration: "",
    capacity: "",
    gender: "All" as "Men" | "Women" | "All",
    days: [0, 0, 0, 0, 0, 0, 0], 
  });

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error("Error fetching classes", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClass = async () => {
    if (
      !form.name ||
      !form.instructor ||
      !form.schedule ||
      !form.time ||
      !form.duration ||
      !form.capacity
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        capacity: parseInt(form.capacity),
      };

      let res;

      if (editingClassId) {
        res = await fetch(`${API_URL}/${editingClassId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      await fetchClasses();

      // reset form
      setForm({
        name: "",
        instructor: "",
        schedule: "",
        time: "",
        duration: "",
        capacity: "",
        gender: "All",
        days: [0, 0, 0, 0, 0, 0, 0],
      });

      setEditingClassId(null);
      setIsDialogOpen(false);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (err) {
      console.error("Error saving class", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await fetchClasses();
    } catch (err) {
      console.error("Error deleting class", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cls: GymClass) => {
    setForm({
      name: cls.name,
      instructor: cls.instructor,
      schedule: cls.schedule,
      time: cls.time || "",
      duration: cls.duration,
      capacity: cls.capacity.toString(),
      gender: cls.gender,
      days: cls.days || [0, 0, 0, 0, 0, 0, 0], 
    });

    setEditingClassId(cls._id);
    setIsDialogOpen(true);
  };

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {successAlert && (
        <Alert className="bg-green-100 border-green-400 text-green-800">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {editingClassId
              ? "Class updated successfully."
              : "Class added successfully."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <CardTitle className="text-indigo-600">Classes</CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 text-white">
                <Plus className="w-4 h-4" />
                {editingClassId ? "Edit Class" : "Add Class"}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingClassId ? "Edit Class" : "Add New Class"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3">
                <Input
                  placeholder="Class Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Input
                  placeholder="Instructor"
                  value={form.instructor}
                  onChange={(e) =>
                    setForm({ ...form, instructor: e.target.value })
                  }
                />

                <Input
                  placeholder="Schedule (Mon/Wed/Fri)"
                  value={form.schedule}
                  onChange={(e) =>
                    setForm({ ...form, schedule: e.target.value })
                  }
                />

                <Input
                  placeholder="Time (e.g. 7:00 AM)"
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                />

                <Input
                  placeholder="Duration"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />

                <Input
                  type="number"
                  placeholder="Capacity"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                />

                {/*  DAYS CHECKBOX */}
                <div>
                  <p className="text-sm font-medium mb-1">Select Days</p>
                  <div className="flex flex-wrap gap-2">
                    {dayLabels.map((day, index) => (
                      <label key={day} className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={form.days[index] === 1}
                          onChange={(e) => {
                            const updated = [...form.days];
                            updated[index] = e.target.checked ? 1 : 0;
                            setForm({ ...form, days: updated });
                          }}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <Select
                  value={form.gender}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      gender: value as "Men" | "Women" | "All",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveClass} disabled={loading}>
                  {editingClassId ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((cls) => (
                <Card key={cls._id} className="p-4 shadow">
                  <h3 className="font-bold text-indigo-600">{cls.name}</h3>
                  <p>Instructor: {cls.instructor}</p>
                  <p>Schedule: {cls.schedule}</p>
                  <p>Time: {cls.time}</p>
                  <p>Duration: {cls.duration}</p>
                  <p>Capacity: {cls.capacity}</p>
                  <p>Gender: {cls.gender}</p>

                  {/*  SHOW DAYS */}
                  <p>
                    Days:{" "}
                    {dayLabels
                      .filter((_, i) => cls.days?.[i] === 1)
                      .join(", ")}
                  </p>

                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(cls)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(cls._id)}
                    >
                      <Trash className="w-4 h-4" />
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