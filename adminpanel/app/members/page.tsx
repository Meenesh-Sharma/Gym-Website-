
"use client";

import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const API = process.env.NEXT_PUBLIC_API_URL;

type Member = {
  _id?: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
  email: string;
  address: string;

  plan?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    email: "",
    address: "",
    password: "",
  });

  //  FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API}/user/with-subscription`);
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  //  SAVE MEMBER
  const handleSaveMember = async () => {
    try {
      if (editingMember) {
        await axios.put(`${API}/user/${editingMember._id}`, {
          ...form,
          age: Number(form.age),
        });
      } else {
        await axios.post(`${API}/user/register`, {
          ...form,
          age: Number(form.age),
        });
      }

      fetchMembers();
      setIsDialogOpen(false);
      setEditingMember(null);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);

      setForm({
        name: "",
        phone: "",
        age: "",
        gender: "",
        email: "",
        address: "",
        password: "",
      });

    } catch (err) {
      console.error("Save error", err);
    }
  };

  //  DELETE
 const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API}/user/${id}`);
    fetchMembers();
  } catch (err) {
    console.error("Delete error", err);
  }
};

  //  EDIT
  const handleEdit = (member: Member) => {
    setEditingMember(member);

    setForm({
      name: member.name,
      phone: member.phone,
      age: member.age.toString(),
      gender: member.gender,
      email: member.email,
      address: member.address,
      password: "",
    });

    setIsDialogOpen(true);
  };

  //  STATS
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "Active").length;
  const expiredMembers = members.filter(m => m.status === "Expired").length;

  //  FILTER
  const filteredMembers = members
    .filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((m) => {
      if (activeTab === "active") return m.status === "Active";
      if (activeTab === "expired") return m.status === "Expired";
      return true;
    });

  return (
    <div className="space-y-4">

      {successAlert && (
        <Alert className="bg-green-100 border-green-400 text-green-800">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {editingMember ? "Member updated" : "Member added"}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Members Dashboard</CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> {editingMember ? "Edit" : "Add"}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Edit Member" : "Add Member"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3">
                <Input placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <Input type="number" placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />

                <Input placeholder="Gender"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />

                <Input placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />

                {!editingMember && (
                  <Input type="password" placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                )}
              </div>

              <DialogFooter>
                <Button onClick={handleSaveMember}>
                  {editingMember ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>

          {/*  STATS */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div className="bg-blue-100 p-3 rounded">
              <p className="text-lg font-bold">{totalMembers}</p>
              <p>Total</p>
            </div>

            <div className="bg-green-100 p-3 rounded">
              <p className="text-lg font-bold">{activeMembers}</p>
              <p>Active</p>
            </div>

            <div className="bg-red-100 p-3 rounded">
              <p className="text-lg font-bold">{expiredMembers}</p>
              <p>Expired</p>
            </div>
          </div>

          {/*  TABS */}
          <div className="flex gap-2 mb-4">
            <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
              All
            </Button>

            <Button variant={activeTab === "active" ? "default" : "outline"} onClick={() => setActiveTab("active")}>
              Active
            </Button>

            <Button variant={activeTab === "expired" ? "default" : "outline"} onClick={() => setActiveTab("expired")}>
              Expired
            </Button>
          </div>

          {/* 🔍 SEARCH */}
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 👥 MEMBERS */}
          <div className="grid gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((m) => (
              <Card
                key={m._id}
                onClick={() => {
                  setSelectedMember(m);
                  setOpenDetails(true);
                }}
                className="p-3 cursor-pointer transition-all duration-300 
                hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{m.name}</h3>

                  <span
                    className={`text-[10px] px-2 py-1 rounded 
                    ${m.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"}`}
                  >
                    {m.status || "No Plan"}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1">{m.email}</p>
                <p className="text-xs">{m.phone}</p>

                <div
                  className="flex gap-2 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button size="sm" onClick={() => handleEdit(m)}>
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(m._id!)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* 🔍 DETAILS DIALOG */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Member Details
            </DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selectedMember.name}</p>
              <p><b>Email:</b> {selectedMember.email}</p>
              <p><b>Phone:</b> {selectedMember.phone}</p>
              <p><b>Age:</b> {selectedMember.age}</p>
              <p><b>Gender:</b> {selectedMember.gender}</p>
              <p><b>Address:</b> {selectedMember.address}</p>

              <hr />

              <p><b>Plan:</b> {selectedMember.plan || "No Plan"}</p>

              <p>
                <b>Start:</b>{" "}
                {selectedMember.startDate
                  ? new Date(selectedMember.startDate).toLocaleDateString()
                  : "-"}
              </p>

              <p>
                <b>End:</b>{" "}
                {selectedMember.endDate
                  ? new Date(selectedMember.endDate).toLocaleDateString()
                  : "-"}
              </p>

              <p
                className={`font-semibold mt-2 
                ${selectedMember.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"}`}
              >
                {selectedMember.status}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}