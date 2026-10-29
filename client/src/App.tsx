import { useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trackMetaPageView } from "@/lib/metaPixel";
import Home from "@/pages/Home";
import Intake from "@/pages/Intake";
import Order from "@/pages/Order";
import Experience from "@/pages/Experience";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ReviewIntake from "@/pages/ReviewIntake";
import NotFound from "@/pages/not-found";

function MetaPixelRouteTracker() {
  const [location] = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    if (previousLocation.current === location) return;
    previousLocation.current = location;
    trackMetaPageView();
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/intake" component={Intake} />
      <Route path="/order" component={Order} />
      <Route path="/experience" component={Experience} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/review-intake" component={ReviewIntake} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MetaPixelRouteTracker />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
