import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { OrderTrackingPage } from "@/pages/OrderTrackingPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/tracking" component={OrderTrackingPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/:section" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-16 flex-1">
        <Router />
      </main>
      <Footer />
      
      {/* Floating cart button - only show on non-admin pages */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* This could be moved to a separate component if needed */}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
