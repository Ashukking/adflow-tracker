
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Clock, FileText, FolderGit2, UserCheck } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Request location on load
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location recorded",
            description: "Your attendance has been logged successfully.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not record location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  const quickActions = [
    {
      title: "New Quotation",
      icon: FileText,
      description: "Create predefined or custom quotations",
      color: "bg-slate text-slate-foreground",
    },
    {
      title: "Record Attendance",
      icon: UserCheck,
      description: "Log your daily attendance with location",
      color: "bg-sage text-sage-foreground",
    },
    {
      title: "Initialize Project",
      icon: FolderGit2,
      description: "Set up new project repository",
      color: "bg-slate text-slate-foreground",
    },
    {
      title: "Send to Designer",
      icon: Clock,
      description: "Record design handoff timestamp",
      color: "bg-sage text-sage-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 fade-in">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Sales Management System</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Manage quotations, track attendance, and initialize projects efficiently
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="glass-card hover-scale p-6 space-y-4 border-none"
            >
              <div className={`rounded-full w-12 h-12 ${action.color} flex items-center justify-center`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-slate-900">{action.title}</h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-50">
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        {location && (
          <Card className="glass-card p-4 max-w-md mx-auto text-center">
            <p className="text-sm text-slate-600">
              Location recorded: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
