import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Incidents from "@/pages/Incidents";
import Analytics from "@/pages/Analytics";
import Chat from "@/pages/Chat";
import Reports from "@/pages/Reports";
import Scraper from "@/pages/Scraper";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function DashboardRouter() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/incidents" component={Incidents} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/chat" component={Chat} />
      <Route path="/reports" component={Reports} />
      <Route path="/scraper" component={Scraper} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/incidents">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/analytics">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/chat">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/reports">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/scraper">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route path="/settings">
        {() => <AppLayout><DashboardRouter /></AppLayout>}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-2 p-2 border-b flex-shrink-0">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
