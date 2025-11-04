import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, TrendingUp, TrendingDown, MessageSquare, Newspaper, Download, FileText, Send, Calendar, MapPin, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Link } from "wouter";

export default function Dashboard() {
  const [chatInput, setChatInput] = useState("");
  const [incidentData, setIncidentData] = useState([
    { month: "Jan", incidents: 12 },
    { month: "Feb", incidents: 8 },
    { month: "Mar", incidents: 15 },
    { month: "Apr", incidents: 6 },
    { month: "May", incidents: 11 },
    { month: "Jun", incidents: 9 },
  ]);

  const severityData = [
    { name: "Critical", value: 45, color: "hsl(var(--destructive))" },
    { name: "High", value: 89, color: "hsl(var(--chart-4))" },
    { name: "Medium", value: 112, color: "hsl(var(--chart-2))" },
    { name: "Low", value: 54, color: "hsl(var(--chart-5))" },
  ];

  const newsUpdates = [
    { id: 1, title: "DGMS releases new safety guidelines for underground coal mines", date: "2024-11-02", source: "DGMS Portal" },
    { id: 2, title: "Jharkhand region reports 15% decrease in incidents in Q3", date: "2024-11-01", source: "Regional News" },
    { id: 3, title: "New ventilation technology reduces methane risks by 30%", date: "2024-10-30", source: "Mining Tech News" },
    { id: 4, title: "Annual safety compliance audit scheduled for December", date: "2024-10-28", source: "DGMS Portal" },
  ];

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    console.log("Chat query:", chatInput);
    setChatInput("");
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report...");
  };

  const handleDataInput = (monthIndex: number, value: number) => {
    const newData = [...incidentData];
    newData[monthIndex].incidents = value;
    setIncidentData(newData);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Mining Safety Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring and AI-powered insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-primary" data-testid="text-total-incidents">
              {incidentData.reduce((sum, item) => sum + item.incidents, 0)}
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
            <div className="text-3xl font-bold font-mono text-secondary" data-testid="text-active-alerts">8</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-destructive" />
              <span className="text-destructive">3 new</span> in last 24h
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-accent" data-testid="text-compliance-rate">87%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">5% increase</span> from Q3
            </p>
          </CardContent>
        </Card>

        <Card className="border-chart-5/20 bg-gradient-to-br from-chart-5/10 to-chart-5/5">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations Monitored</CardTitle>
            <MapPin className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-chart-5" data-testid="text-locations">127</div>
            <p className="text-xs text-muted-foreground mt-1">Across 18 states</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Interactive Analytics</CardTitle>
            <Button variant="outline" size="sm" onClick={handleGeneratePDF} data-testid="button-generate-pdf">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Adjust incident data to see real-time chart updates:</p>
              <div className="grid grid-cols-6 gap-2">
                {incidentData.map((item, index) => (
                  <div key={item.month} className="space-y-1">
                    <label className="text-xs font-medium">{item.month}</label>
                    <Input
                      type="number"
                      value={item.incidents}
                      onChange={(e) => handleDataInput(index, parseInt(e.target.value) || 0)}
                      className="h-8 text-xs"
                      data-testid={`input-${item.month}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            
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

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={200}>
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Safety Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ask questions about incident patterns, compliance, or safety recommendations.
            </p>
            
            <div className="space-y-2">
              <Textarea
                placeholder="Ask: 'Show methane incidents in Jharkhand' or 'What are the top safety risks?'"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="min-h-[100px] resize-none"
                data-testid="input-chat-query"
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                  className="flex-1"
                  data-testid="button-send-chat"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
                <Link href="/chat">
                  <Button variant="outline" data-testid="button-full-chat">
                    Full Chat
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <p className="text-xs font-medium text-muted-foreground">QUICK QUERIES:</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-auto py-2"
                onClick={() => setChatInput("Show all methane incidents in 2024")}
                data-testid="button-quick-query-1"
              >
                Show methane incidents in 2024
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-auto py-2"
                onClick={() => setChatInput("Which mines need urgent inspection?")}
                data-testid="button-quick-query-2"
              >
                Which mines need urgent inspection?
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <div className="space-y-3">
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
            </div>
            
            <Link href="/scraper">
              <Button variant="outline" className="w-full mt-4" data-testid="button-view-all-news">
                View All News Sources
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Generate Incident Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Export detailed PDF reports for specific incidents, date ranges, or locations.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start" data-testid="button-report-monthly">
                    <Calendar className="h-4 w-4 mr-2" />
                    Monthly Summary
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start" data-testid="button-report-location">
                    <MapPin className="h-4 w-4 mr-2" />
                    By Location
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start" data-testid="button-report-severity">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    By Severity
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start" data-testid="button-report-custom">
                    <FileText className="h-4 w-4 mr-2" />
                    Custom Range
                  </Button>
                </div>
              </div>

              <Button onClick={handleGeneratePDF} className="w-full" data-testid="button-generate-full-pdf">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>

              <Link href="/reports">
                <Button variant="outline" className="w-full" data-testid="button-view-reports">
                  View All Reports
                </Button>
              </Link>
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
