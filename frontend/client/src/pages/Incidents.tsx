import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultIncidents: any[] = [];

export default function Incidents() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [incidents, setIncidents] = useState(defaultIncidents);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/incidents");
        if (!res.ok) return;
        const json = await res.json();
        setIncidents(json ?? []);
      } catch (e) {
        console.error("Failed to load incidents", e);
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">Incidents Database</h1>
          <p className="text-muted-foreground mt-1">Complete record of DGMS incident data (2016-2022)</p>
        </div>
        <Button className="gap-2" data-testid="button-export-data">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location, type, or ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-incidents"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]" data-testid="select-severity">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]" data-testid="select-state">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="jharkhand">Jharkhand</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="west-bengal">West Bengal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" data-testid="button-more-filters">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-sm">
                    <th className="text-left p-3 font-medium">S.No</th>
                    <th className="text-left p-3 font-medium">Location</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Severity</th>
                    <th className="text-left p-3 font-medium">Casualties</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => (
                    <>
                      <tr
                        key={incident.id}
                        className={`border-t hover-elevate ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        data-testid={`row-incident-${incident.id}`}
                      >
                        <td className="p-3">
                          <span className="font-mono text-sm">{index + 1}</span>
                        </td>
                        <td className="p-3">
                          <div className="text-sm font-medium">{incident.location}</div>
                          <div className="text-xs text-muted-foreground">{incident.state}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{incident.incidentType}</div>
                          <div className="text-xs text-muted-foreground">{incident.mineType}</div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              incident.severity === "Critical"
                                ? "destructive"
                                : incident.severity === "High"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {incident.severity}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm font-mono">
                            {incident.fatalities > 0 && (
                              <span className="text-destructive">{incident.fatalities} fatal</span>
                            )}
                            {incident.injuries > 0 && (
                              <span className="text-muted-foreground">
                                {incident.fatalities > 0 && ", "}
                                {incident.injuries} injured
                              </span>
                            )}
                            {incident.fatalities === 0 && incident.injuries === 0 && (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedRow(expandedRow === incident.id ? null : incident.id)}
                            data-testid={`button-expand-${incident.id}`}
                          >
                            {expandedRow === incident.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </td>
                      </tr>
                      {expandedRow === incident.id && (
                        <tr className="border-t bg-card">
                          <td colSpan={6} className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground mb-4">{incident.description}</p>
                                
                                <h4 className="font-semibold mb-2">Root Cause</h4>
                                <p className="text-sm text-muted-foreground">{incident.rootCause}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Details</h4>
                                <dl className="text-sm space-y-2">
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Mine Type:</dt>
                                    <dd className="font-medium">{incident.mineType}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">State:</dt>
                                    <dd className="font-medium">{incident.state}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Incident Type:</dt>
                                    <dd className="font-medium">{incident.incidentType}</dd>
                                  </div>
                                </dl>
                                
                                <div className="mt-4 flex gap-2">
                                  <Button size="sm" variant="outline" data-testid={`button-view-details-${incident.id}`}>
                                    View Full Report
                                  </Button>
                                  <Button size="sm" variant="outline" data-testid={`button-similar-${incident.id}`}>
                                    Find Similar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {incidents.length} incidents
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled data-testid="button-prev-page">
                Previous
              </Button>
              <Button variant="outline" size="sm" data-testid="button-next-page">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
