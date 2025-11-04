import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, MessageSquare, Newspaper, Download, FileText, Calendar, MapPin, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Link } from "wouter";

export default function Dashboard() {
  const [incidentData, setIncidentData] = useState<any[]>([]);
  const [severityData, setSeverityData] = useState<any[]>([]);
  const [newsUpdates, setNewsUpdates] = useState<any[]>([]);
  const [overview, setOverview] = useState({ totalIncidents: 0, activeAlerts: 0, complianceRate: 0, locationsMonitored: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) return;
        const json = await res.json();
        setOverview(json.overview ?? {});
        setIncidentData(json.incidentData ?? []);
        setSeverityData(json.severityData ?? []);
        setNewsUpdates(json.newsUpdates ?? []);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    })();
  }, []);

  

  const handleGeneratePDF = () => {
    console.log("Generating PDF report...");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Mining Safety Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring and AI-powered insights</p>
      </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-primary" data-testid="text-total-incidents">
              {overview.totalIncidents || incidentData.reduce((sum, item) => sum + (item.incidents || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">12% decrease</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-secondary" data-testid="text-active-alerts">{overview.activeAlerts ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-destructive" />
              <span className="text-destructive">3 new</span> in last 24h
            </p>
          </CardContent>
        </Card>

        {/* Compliance Rate card removed as requested */}

        <Card className="border-chart-5/20 bg-gradient-to-br from-chart-5/10 to-chart-5/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations Monitored</CardTitle>
            <MapPin className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-chart-5" data-testid="text-locations">{overview.locationsMonitored ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 18 states</p>
          </CardContent>
        </Card>
      </div>

  <div className="grid gap-6 lg:grid-cols-1">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Interactive Analytics</CardTitle>
            <Button variant="outline" size="sm" onClick={handleGeneratePDF} data-testid="button-generate-pdf">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </CardHeader>
          <CardContent>
            {/* Interactive controls removed: chart is now static and driven only by backend data */}
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="incidents" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>

            {/* pie chart moved to a dedicated card on the right of News & Updates */}
          </CardContent>
        </Card>

        {/* AI Safety Assistant removed per request - Dashboard now focuses on analytics and quick access */}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-secondary" />
              Recent News & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-3">
                {newsUpdates.map((news) => (
                  <div
                    key={news.id}
                    className="p-3 border rounded-lg hover-elevate cursor-pointer"
                    data-testid={`news-${news.id}`}
                  >
                    <h4 className="font-semibold text-sm mb-2">{news.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {news.date}
                      </span>
                      <Badge variant="outline" className="text-xs">{news.source}</Badge>
                    </div>
                  </div>
                ))}

                <Link href="/scraper">
                  <Button variant="outline" className="w-full mt-4" data-testid="button-view-all-news">
                    View All News Sources
                  </Button>
                </Link>
              </div>

              
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Severity Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-56 flex items-center justify-center">
              <div className="w-44 h-44 transform translate-y-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-main-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/incidents">
              <Button variant="outline" className="w-full h-20 flex-col gap-2" data-testid="button-quick-incidents">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-xs">Incidents Database</span>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" className="w-full h-20 flex-col gap-2" data-testid="button-quick-analytics">
                <TrendingUp className="h-6 w-6" />
                <span className="text-xs">Analytics</span>
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" className="w-full h-20 flex-col gap-2" data-testid="button-quick-chat">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs">AI Chat</span>
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full h-20 flex-col gap-2" data-testid="button-quick-reports">
                <FileText className="h-6 w-6" />
                <span className="text-xs">Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
