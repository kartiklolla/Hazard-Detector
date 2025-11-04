import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Globe, Play, Pause, RefreshCw, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const sources = [
  {
    id: 1,
    name: "DGMS Official Portal",
    url: "https://dgms.gov.in",
    status: "active",
    lastRun: "2 hours ago",
    itemsCollected: 23,
  },
  {
    id: 2,
    name: "Regional Mine Inspections",
    url: "https://example-inspections.gov.in",
    status: "active",
    lastRun: "5 hours ago",
    itemsCollected: 15,
  },
  {
    id: 3,
    name: "Mining News Aggregator",
    url: "https://mining-news.example.com",
    status: "paused",
    lastRun: "1 day ago",
    itemsCollected: 42,
  },
  {
    id: 4,
    name: "Safety Bulletin Board",
    url: "https://safety-bulletins.example.gov.in",
    status: "active",
    lastRun: "30 minutes ago",
    itemsCollected: 8,
  },
];

const recentActivity = [
  {
    id: 1,
    timestamp: "2024-11-03 14:23:15",
    source: "DGMS Official Portal",
    action: "Scraped 5 new incident reports",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2024-11-03 13:45:22",
    source: "Regional Mine Inspections",
    action: "Scraped 3 inspection updates",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2024-11-03 12:10:08",
    source: "Mining News Aggregator",
    action: "Failed to connect - timeout",
    status: "error",
  },
  {
    id: 4,
    timestamp: "2024-11-03 11:30:45",
    source: "Safety Bulletin Board",
    action: "Scraped 2 safety alerts",
    status: "success",
  },
];

export default function Scraper() {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSource = () => {
    console.log("Adding new scraping source...");
    setIsAdding(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">Web Scraper</h1>
          <p className="text-muted-foreground mt-1">Automated data collection from external sources</p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setIsAdding(!isAdding)}
          data-testid="button-add-source"
        >
          <Globe className="h-4 w-4" /> Add Source
        </Button>
      </div>

      {isAdding && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Configure New Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name</Label>
              <Input
                id="source-name"
                placeholder="e.g., DGMS Updates"
                data-testid="input-source-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source-url">URL</Label>
              <Input
                id="source-url"
                type="url"
                placeholder="https://example.com"
                data-testid="input-source-url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scraping-frequency">Scraping Frequency</Label>
              <Input
                id="scraping-frequency"
                placeholder="e.g., Every 6 hours"
                data-testid="input-frequency"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="selectors">CSS Selectors (Optional)</Label>
              <Textarea
                id="selectors"
                placeholder="Enter CSS selectors for data extraction..."
                className="min-h-[80px] resize-none"
                data-testid="input-selectors"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAdding(false)} data-testid="button-cancel-source">
                Cancel
              </Button>
              <Button onClick={handleAddSource} data-testid="button-save-source">
                Save Source
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Globe className="h-8 w-8 text-primary" />
              <Badge>Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">4</h3>
            <p className="text-sm text-muted-foreground">Data Sources</p>
            <p className="text-xs text-muted-foreground mt-1">3 active, 1 paused</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <RefreshCw className="h-8 w-8 text-muted-foreground" />
              <Badge variant="secondary">Today</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">88</h3>
            <p className="text-sm text-muted-foreground">Items Collected</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
              <Badge variant="secondary">Status</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">97%</h3>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configured Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-lg hover-elevate"
                data-testid={`source-${source.id}`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{source.name}</h4>
                      <Badge
                        variant={source.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {source.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1 truncate">{source.url}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {source.lastRun}
                      </span>
                      <span>{source.itemsCollected} items collected</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {source.status === "active" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      data-testid={`button-pause-${source.id}`}
                    >
                      <Pause className="h-3 w-3" /> Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      data-testid={`button-resume-${source.id}`}
                    >
                      <Play className="h-3 w-3" /> Resume
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-testid={`button-run-${source.id}`}
                  >
                    <RefreshCw className="h-3 w-3" /> Run Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 border rounded-lg"
                data-testid={`activity-${activity.id}`}
              >
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    activity.status === "success" ? "bg-green-500" : "bg-destructive"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{activity.source}</span>
                    {activity.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
