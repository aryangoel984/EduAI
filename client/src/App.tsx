import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import AITutor from "@/pages/AITutor";
import Assessments from "@/pages/Assessments";
import Analytics from "@/pages/Analytics";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-edu-light">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ai-tutor" component={AITutor} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
