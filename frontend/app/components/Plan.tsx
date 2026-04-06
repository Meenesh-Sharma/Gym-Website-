

"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const [plansLoading, setPlansLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true); //  important

  // FETCH PLANS AND SUBSCRIPTIONS
  const initializeData = async () => {
    setPlansLoading(true);
    setSubscriptionLoading(true);

    try {
      const res = await axios.get(`${API}/content/pricing`);
      setPlans(res.data.data || []);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
    setPlansLoading(false);

    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("userName");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserName(storedUser || "");

      try {
        const statusRes = await axios.get(
          `${API}/subscriptions/user/${storedUserId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        const subscriptions = statusRes.data || [];
        const now = new Date();

        const activeSub =
          subscriptions?.status?.toLowerCase() === "active" &&
            new Date(subscriptions.endDate) > now
            ? subscriptions
            : null;

        if (activeSub) {
          setHasActiveSubscription(true);
          setSubscriptionEnd(activeSub.endDate);
        } else {
          setHasActiveSubscription(false);
          setSubscriptionEnd(null);
        }
      } catch (err) {
        console.error("Subscription fetch error:", err);
        setHasActiveSubscription(false);
        setSubscriptionEnd(null);
      }
    } else {
      setHasActiveSubscription(false);
      setSubscriptionEnd(null);
    }

    setSubscriptionLoading(false); //  mark subscription check done
  };

  useEffect(() => {
    initializeData();
  }, []);

  // AUTO REFRESH WHEN SUBSCRIPTION ENDS
  useEffect(() => {
    if (!subscriptionEnd) return;

    const now = new Date();
    const end = new Date(subscriptionEnd);

    if (end > now) {
      const timeout = end.getTime() - now.getTime();
      const timer = setTimeout(() => {
        setHasActiveSubscription(false);
        setSubscriptionEnd(null);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [subscriptionEnd]);

  const handleSubscribeClick = (plan: any) => {
    if (!token) {
      alert("Please login first ❗");
      return;
    }
    setSelectedPlan(plan);
    setOpenDialog(true);
  };

  const handleConfirmSubscription = async () => {
    try {
      const res = await axios.post(
        `${API}/subscriptions`,
        { planName: selectedPlan.name, price: selectedPlan.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newSub = res.data;
      setHasActiveSubscription(true);
      setSubscriptionEnd(newSub.endDate);
      setOpenDialog(false);
      alert("Subscription successful 🎉");
    } catch (error: any) {
      const message = error.response?.data?.message;
      alert(message || "Subscription failed");
    }
  };

  return (
    <>
      <section className="w-full py-10 bg-gradient-to-b from-black via-[#0A192F] to-black text-white" id="plans">
        <div className="px-4 sm:px-6 lg:px-12">
          <h1 className="text-center text-3xl font-bold mb-8">
            Choose Your <span className="text-cyan-400">Membership</span>
          </h1>

          {hasActiveSubscription && !subscriptionLoading && (
            <p className="text-center text-green-400 mb-4">
              Active plan running till {new Date(subscriptionEnd!).toLocaleDateString()}
            </p>
          )}

          {plansLoading ? (
            <p className="text-center text-gray-400 mt-4">Loading plans...</p>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-6 min-w-max px-2">
                {plans.map((plan, idx) => (
                  <Card
                    key={idx}
                    className="bg-[#0F223A] p-4 text-center transition duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col w-full max-w-[280px] flex-shrink-0"
                  >
                    <CardHeader>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <p className="text-2xl font-extrabold text-cyan-400">
                        ₹ {plan.price}/Monthly
                      </p>
                    </CardHeader>

                    <CardContent className="text-left space-y-2 flex-1">
                      {plan.features?.map((f: string, i: number) => (
                        <div key={i} className="flex gap-2 items-center text-sm">
                          <Check className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </CardContent>

                    <CardFooter className="mt-auto">
                      {!subscriptionLoading && (
                        <Button
                          disabled={hasActiveSubscription}
                          className={`w-full ${hasActiveSubscription
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-cyan-400 text-black hover:bg-cyan-300"
                            }`}
                          onClick={() => handleSubscribeClick(plan)}
                        >
                          {hasActiveSubscription ? "Plan Active" : "Get Started"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div></div>
          )}
        </div>
      </section>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-b from-black via-[#0A192F] to-black text-white border-none">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-center">
              Confirm Subscription
            </DialogTitle>

            <DialogDescription className="text-center text-gray-300">
              {userName}, you are subscribing to{" "}
              <span className="text-cyan-400">{selectedPlan?.name}</span>
            </DialogDescription>
          </DialogHeader>

          <Button
            className="w-full bg-cyan-400 text-black hover:bg-cyan-300"
            onClick={handleConfirmSubscription}
          >
            Confirm & Pay
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}