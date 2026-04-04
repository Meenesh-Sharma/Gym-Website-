
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, FileText, CreditCard, Plus, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Updated Interface to match MongoDB structure
interface Bill {
  _id: string; // MongoDB uses _id
  memberName: string;
  description: string;
  amount: number;
  discount: number;
  total: number;
  status: string;
}

export default function BillingPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [form, setForm] = useState({
    memberName: "",
    description: "",
    amount: "",
    discount: "",
  });

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/bills`;
  console.log("Axios API URL:", API_URL);

  // 1. Fetch Bills from Backend
  const fetchBills = async () => {
    try {
      const res = await axios.get(API_URL);
      setBills(res.data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const outstandingInvoices = bills.filter(b => b.total > 0).length;

  //  Handle Create Bill (POST)
  const handleAddBill = async () => {
    if (!form.memberName || !form.description || !form.amount) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        memberName: form.memberName,
        description: form.description,
        amount: parseFloat(form.amount),
        discount: parseFloat(form.discount) || 0,
      });

      setBills([response.data, ...bills]); // Update UI
      setForm({ memberName: "", description: "", amount: "", discount: "" });
      setIsDialogOpen(false);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (err) {
      console.error("Error adding bill:", err);
      alert("Failed to create bill.");
    }
  };

  // Handle Delete Bill (DELETE)
  const handleDeleteBill = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setBills(bills.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting bill:", err);
      alert("Failed to delete bill.");
    }
  };

  const handleReviewInvoices = () => alert("Reviewing outstanding invoices...");
  const handleExportReport = () => alert("Exporting monthly report...");
  const handleManagePayments = () => alert("Opening payment gateways...");

  if (loading) return <div className="p-10 text-center text-indigo-600 font-bold">Loading Financial Data...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {successAlert && (
        <Alert className="bg-green-100 border-green-400 text-green-800">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Bill added successfully to the database.</AlertDescription>
        </Alert>
      )}

      {/* Billing Summary Card */}
      <Card className="p-6 bg-white rounded-xl shadow-md space-y-4">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Billing & Invoices</h2>
          <p className="text-gray-500">Manage your gym’s invoices and financial reports in real-time.</p>

          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500 shadow-sm">
            <p className="font-medium text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Outstanding Invoices:{" "}
              <span className="font-bold">{outstandingInvoices}</span>
            </p>
            <Button variant="link" size="sm" className="text-red-700" onClick={handleReviewInvoices}>
              Review Now
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg flex items-center gap-2 justify-center"
              onClick={handleExportReport}
            >
              <FileText className="w-5 h-5" /> Export Monthly Report
            </Button>
            <Button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg flex items-center gap-2 justify-center"
              onClick={handleManagePayments}
            >
              <CreditCard className="w-5 h-5" /> Manage Payment Gateways
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bill Table */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-indigo-600">All Bills</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Bill</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <Input
                  placeholder="Member Name"
                  value={form.memberName}
                  onChange={(e) => setForm({ ...form, memberName: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <Input
                  placeholder="Amount"
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <Input
                  placeholder="Discount"
                  type="number"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                />
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBill}>Create Bill</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Discount (₹)</TableHead>
                <TableHead>Total (₹)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                    No bills found. Add your first bill!
                  </TableCell>
                </TableRow>
              ) : (
                bills.map((bill) => (
                  <TableRow key={bill._id} className="hover:bg-gray-50">
                    <TableCell>{bill.memberName}</TableCell>
                    <TableCell>{bill.description}</TableCell>
                    <TableCell>{bill.amount.toFixed(2)}</TableCell>
                    <TableCell>{bill.discount.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-indigo-700">{bill.total.toFixed(2)}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteBill(bill._id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}