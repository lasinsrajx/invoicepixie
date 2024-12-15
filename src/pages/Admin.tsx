import React, { useState, useEffect } from "react";
import { AdminSettings } from "@/components/AdminSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Simple analytics state (without database)
  const [analytics, setAnalytics] = useState({
    totalVisits: parseInt(localStorage.getItem("totalVisits") || "0"),
    invoicesGenerated: parseInt(localStorage.getItem("invoicesGenerated") || "0"),
    lastVisit: localStorage.getItem("lastVisit") || "Never"
  });

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem("adminAuth") === "true";
    setIsAuthenticated(isAuth);

    // Update analytics
    const currentVisits = parseInt(localStorage.getItem("totalVisits") || "0");
    localStorage.setItem("totalVisits", (currentVisits + 1).toString());
    localStorage.setItem("lastVisit", new Date().toLocaleString());
    
    // Update analytics state
    setAnalytics({
      totalVisits: currentVisits + 1,
      invoicesGenerated: parseInt(localStorage.getItem("invoicesGenerated") || "0"),
      lastVisit: new Date().toLocaleString()
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "lasinsraj@gmail.com" && password === "Lasinsraj2024#") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully logged in as admin",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.totalVisits}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoices Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.invoicesGenerated}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Last Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{analytics.lastVisit}</p>
          </CardContent>
        </Card>
      </div>

      <AdminSettings />
    </div>
  );
};

export default Admin;