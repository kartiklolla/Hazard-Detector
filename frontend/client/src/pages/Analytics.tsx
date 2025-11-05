import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import India from "@svg-maps/india";


const stateData = [
  { state: "Jharkhand", incidents: 78, id: "jh" },
  { state: "Odisha", incidents: 45, id: "or" },
  { state: "Chhattisgarh", incidents: 62, id: "ct" },
  { state: "West Bengal", incidents: 34, id: "wb" },
  { state: "Madhya Pradesh", incidents: 28, id: "mp" },
];

const typeData = [
  { type: "Methane", count: 45 },
  { type: "Equipment", count: 67 },
  { type: "Ground Movement", count: 52 },
  { type: "Fire", count: 38 },
  { type: "Transportation", count: 44 },
  { type: "Electrical", count: 54 },
];

const yearlyTrend = [
  { year: "2016", incidents: 58 },
  { year: "2017", incidents: 52 },
  { year: "2018", incidents: 49 },
  { year: "2019", incidents: 45 },
  { year: "2020", incidents: 38 },
  { year: "2021", incidents: 32 },
  { year: "2022", incidents: 26 },
];

const riskProfile = [
  { category: "Equipment", score: 78 },
  { category: "Personnel", score: 65 },
  { category: "Environment", score: 82 },
  { category: "Process", score: 58 },
  { category: "Compliance", score: 71 },
];

export default function Analytics() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left - pan.x,
        y: e.clientY - rect.top - pan.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPan({
        x: e.clientX - rect.left - dragStart.x,
        y: e.clientY - rect.top - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add wheel event listener with passive: false
  useEffect(() => {
    const svgElement = mapRef.current;
    if (!svgElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };
    useEffect(() => {
      console.log("India locations:", India.locations);
      if (India.locations && India.locations[0]) {
        console.log("First location:", India.locations[0]);
        console.log("Keys:", Object.keys(India.locations[0]));
      }
    }, []);
    
    svgElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      svgElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const getHeatIntensity = (incidents: number) => {
    return incidents / Math.max(...stateData.map(d => d.incidents));
  };

  const getHeatColor = (intensity: number) => {
    if (intensity > 0.8) return "#dc2626";
    if (intensity > 0.6) return "#ea580c";
    if (intensity > 0.4) return "#fbbf24";
    if (intensity > 0.2) return "#22c55e";
    return "#3b82f6";
  };

  const getLocationClassName = (location: any) => {
    const stateInfo = stateData.find(s => s.id === location.id);
    if (stateInfo) {
      const intensity = getHeatIntensity(stateInfo.incidents);
      const color = getHeatColor(intensity);
      return `svg-map__location location-${location.id}`;
    }
    return "svg-map__location";
  };

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
          <TabsTrigger value="heatmap" data-testid="tab-heatmap">HeatMap</TabsTrigger>
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

        <TabsContent value="heatmap" className="space-y-6">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
      <CardTitle>Incident Heatmap - India</CardTitle>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="relative overflow-hidden rounded-lg border bg-card p-4" style={{ width: '100%', height: '600px' }}>
        <svg
          ref={mapRef}
          width="100%"
          height="100%"
          viewBox="0 0 960 600"
          preserveAspectRatio="xMidYMid meet"
          className="cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            touchAction: "none",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          {/* Scale group to make map smaller */}
          <g transform="scale(0.6, 0.6) translate(100, 100)">
            {India.locations && India.locations.map((location: any, idx: number) => {
              const stateInfo = stateData.find(s => 
                location.id === s.id || 
                location.name?.toLowerCase().includes(s.state.toLowerCase()) ||
                s.state.toLowerCase().includes(location.name?.toLowerCase())
              );
              
              const intensity = stateInfo ? getHeatIntensity(stateInfo.incidents) : 0.15;
              const color = stateInfo ? getHeatColor(intensity) : "#f0f4f8";

              return (
                <path
                  key={`state-${idx}`}
                  d={location.path}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity={hoveredState === location.id ? 0.95 : 0.8}
                  onMouseEnter={() => setHoveredState(location.id)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:opacity-100"
                />
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur border rounded-lg p-4 z-10 shadow-lg">
          <div className="text-sm font-bold mb-3">Heat Intensity</div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: "#dc2626" }}></div>
              <span className="font-medium">High Risk (60+)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: "#ea580c" }}></div>
              <span className="font-medium">Medium-High (45-60)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: "#fbbf24" }}></div>
              <span className="font-medium">Medium (30-45)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: "#22c55e" }}></div>
              <span className="font-medium">Low-Medium (20-30)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: "#3b82f6" }}></div>
              <span className="font-medium">Low (&lt;20)</span>
            </div>
          </div>
        </div>

        {/* Tooltip on hover */}
        {hoveredState && (
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur border rounded-lg p-3 z-10 shadow-lg min-w-48">
            <div className="font-bold text-sm">{stateData.find(s => s.id === hoveredState)?.state || India.locations.find((l: any) => l.id === hoveredState)?.name || 'Region'}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="font-semibold">{stateData.find(s => s.id === hoveredState)?.incidents || 0}</span> incidents reported
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur border rounded-lg p-2 text-xs text-muted-foreground z-10 shadow-lg">
          <div className="font-semibold mb-1">Controls</div>
          <div>🔍 Scroll to zoom</div>
          <div>🖱️ Drag to pan</div>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>



      </Tabs>
    </div>
  );
}
