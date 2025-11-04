import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const emptyStateData: any[] = [];
const emptyTypeData: any[] = [];
const emptyYearlyTrend: any[] = [];
const emptyRiskProfile: any[] = [];

export default function Analytics() {
  const [stateData, setStateData] = useState(emptyStateData);
  const [typeData, setTypeData] = useState(emptyTypeData);
  const [yearlyTrend, setYearlyTrend] = useState(emptyYearlyTrend);
  const [riskProfile, setRiskProfile] = useState(emptyRiskProfile);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) return;
        const json = await res.json();
        setStateData(json.stateData ?? []);
        setTypeData(json.typeData ?? []);
        setYearlyTrend(json.yearlyTrend ?? []);
        setRiskProfile(json.riskProfile ?? []);
      } catch (e) {
        console.error("Failed to load analytics", e);
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Deep insights and pattern analysis</p>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList data-testid="tabs-analytics">
          <TabsTrigger value="trends" data-testid="tab-trends">Trends</TabsTrigger>
          <TabsTrigger value="patterns" data-testid="tab-patterns">Patterns</TabsTrigger>
          <TabsTrigger value="predictions" data-testid="tab-predictions">Predictions</TabsTrigger>
          <TabsTrigger value="comparisons" data-testid="tab-comparisons">Comparisons</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incidents by State</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="state" className="text-xs" angle={-45} textAnchor="end" height={80} />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="incidents" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yearly Trend (2016-2022)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Line type="monotone" dataKey="incidents" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ↓ 55% decrease in incidents over 7 years
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Incident Distribution by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="type" type="category" className="text-xs" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Profile Analysis</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={riskProfile}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="category" className="text-xs" />
                    <PolarRadiusAxis className="text-xs" />
                    <Radar
                      name="Risk Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detected Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">Seasonal Correlation</h4>
                      <Badge variant="destructive">High Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Methane incidents increase by 34% during monsoon season (June-September)
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">Equipment Age Factor</h4>
                      <Badge>Medium Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Equipment failures spike after 8 years of service across all mine types
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">Geographic Clustering</h4>
                      <Badge variant="destructive">High Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      72% of critical incidents occur in underground coal mines in eastern states
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">Shift Pattern</h4>
                      <Badge variant="secondary">Low Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Night shift incidents reduced by 28% after improved lighting implementation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-destructive bg-destructive/5 rounded">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold">High Risk Alert - Jharkhand Region</h4>
                    <Badge variant="destructive">87% Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Predicted increase in methane incidents in Q4 2024 based on historical patterns and current ventilation reports
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Recommendation:</strong> Increase ventilation inspections and monitoring frequency
                  </div>
                </div>

                <div className="p-4 border-l-4 border-l-chart-2 bg-chart-2/5 rounded">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold">Equipment Maintenance Alert</h4>
                    <Badge>73% Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    12 excavators approaching critical service hours threshold across 5 locations
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Recommendation:</strong> Schedule preventive maintenance within 30 days
                  </div>
                </div>

                <div className="p-4 border-l-4 border-l-chart-3 bg-chart-3/5 rounded">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold">Compliance Risk Forecast</h4>
                    <Badge variant="secondary">65% Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    3 sites may exceed regulatory incident thresholds if current trend continues
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Recommendation:</strong> Implement enhanced safety protocols immediately
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Underground vs Surface Mines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Underground</span>
                      <span className="text-sm font-mono">187 incidents</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "62%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Surface</span>
                      <span className="text-sm font-mono">113 incidents</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-chart-2" style={{ width: "38%" }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Underground mines account for 62% of total incidents despite representing only 40% of active mining sites
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coal vs Non-Coal Mines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Coal Mines</span>
                      <span className="text-sm font-mono">234 incidents</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-destructive" style={{ width: "78%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Non-Coal Mines</span>
                      <span className="text-sm font-mono">66 incidents</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-chart-5" style={{ width: "22%" }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Coal mining operations show 3.5x higher incident rate, primarily due to methane and fire hazards
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
