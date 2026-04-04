

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

interface Staff {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  speciality?: string;
  experience?: string;
  description?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    speciality: "",
    experience: "",
    description: "",
  });

  //  FETCH STAFF
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_URL}/staff`);
      setStaff(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  //  FILTER
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  //  CREATE / UPDATE
  const handleSaveStaff = async () => {
    if (!form.name || !form.role || !form.email || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingStaffId) {
        await axios.put(`${API_URL}/staff/${editingStaffId}`, form);
      } else {
        await axios.post(`${API_URL}/staff`, form);
      }

      await fetchStaff();

      setForm({
        name: "",
        role: "",
        email: "",
        phone: "",
        address: "",
        speciality: "",
        experience: "",
        description: "",
      });

      setEditingStaffId(null);
      setIsDialogOpen(false);
      setSuccessAlert(true);

      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  //  EDIT
  const handleEdit = (s: Staff) => {
    setForm({
      name: s.name,
      role: s.role,
      email: s.email,
      phone: s.phone,
      address: s.address,
      speciality: s.speciality || "",
      experience: s.experience || "",
      description: s.description || "",
    });

    setEditingStaffId(s._id);
    setIsDialogOpen(true);
  };

  //  DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${API_URL}/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/*  SUCCESS ALERT */}
      {successAlert && (
        <Alert className="bg-green-100 border-green-400 text-green-800">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {editingStaffId
              ? "Staff updated successfully."
              : "Staff added successfully."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-indigo-600">Staff</CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-2 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4" />
                {editingStaffId ? "Edit Staff" : "Add Staff"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingStaffId ? "Edit Staff" : "Add New Staff"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Select
                  value={form.role}
                  onValueChange={(value) =>
                    setForm({ ...form, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trainer">Trainer</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Cleaner">Cleaner</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>

                {form.role === "Trainer" && (
                  <>
                    <Select
                      value={form.speciality}
                      onValueChange={(value) =>
                        setForm({ ...form, speciality: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Speciality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Zumba">Zumba</SelectItem>
                        <SelectItem value="HIIT">HIIT</SelectItem>
                        <SelectItem value="Crossfit">Crossfit</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Experience (e.g., 5 years)"
                      value={form.experience}
                      onChange={(e) =>
                        setForm({ ...form, experience: e.target.value })
                      }
                    />

                    <Textarea
                      placeholder="Description"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </>
                )}

                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <Input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <Input
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveStaff}>
                  {editingStaffId ? "Update Staff" : "Create Staff"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStaff.map((s) => (
                <Card
                  key={s._id}
                  className="border border-gray-200 shadow hover:shadow-lg transition p-4 flex flex-col justify-between bg-gradient-to-tr from-indigo-50 to-white"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-indigo-600">
                      {s.name}
                    </h3>

                    <p>
                      <span className="font-semibold">Role:</span> {s.role}
                    </p>

                    {s.role === "Trainer" && (
                      <>
                        <p>
                          <span className="font-semibold">
                            Speciality:
                          </span>{" "}
                          {s.speciality || "-"}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Experience:
                          </span>{" "}
                          {s.experience || "-"}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Description:
                          </span>{" "}
                          {s.description || "-"}
                        </p>
                      </>
                    )}

                    <p>
                      <span className="font-semibold">Email:</span> {s.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {s.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {s.address}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(s)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(s._id)}
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