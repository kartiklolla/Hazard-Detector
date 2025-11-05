import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultReports: any[] = [];

export default function Reports() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState(defaultReports);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/reports");
        if (!res.ok) return;
        const json = await res.json();
        const raw = json ?? [];
        // sort by date (newest first). Handle unparsable dates by treating them as very old.
        const sorted = raw.slice().sort((a: any, b: any) => {
          const da = Date.parse(a?.date);
          const db = Date.parse(b?.date);
          const na = Number.isFinite(da) ? da : -8640000000000000;
          const nb = Number.isFinite(db) ? db : -8640000000000000;
          return nb - na;
        });
        setReports(sorted);
      } catch (e) {
        console.error("Failed to load reports", e);
      }
    })();
  }, []);

  const handleGenerate = () => {
    console.log("Generating new report...");
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">Safety Reports</h1>
          <p className="text-muted-foreground mt-1">Automated safety audit reports and analysis</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-generate-report">
              <Plus className="h-4 w-4" /> Generate New Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Safety Report</DialogTitle>
              <DialogDescription>
                Configure parameters for your automated safety audit report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-title">Report Title</Label>
                <Input
                  id="report-title"
                  placeholder="Q4 2024 Safety Audit"
                  data-testid="input-report-title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="safety">
                  <SelectTrigger id="report-type" data-testid="select-report-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety Audit</SelectItem>
                    <SelectItem value="regional">Regional Analysis</SelectItem>
                    <SelectItem value="incident">Incident Analysis</SelectItem>
                    <SelectItem value="equipment">Equipment Analysis</SelectItem>
                    <SelectItem value="compliance">Compliance Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select defaultValue="q4">
                  <SelectTrigger id="date-range" data-testid="select-date-range">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q4">Q4 2024</SelectItem>
                    <SelectItem value="q3">Q3 2024</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="region" data-testid="select-region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel-report">
                Cancel
              </Button>
              <Button onClick={handleGenerate} data-testid="button-confirm-generate">
                Generate Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-primary" />
              <Badge>Automated</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">{reports.length}</h3>
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <p className="text-xs text-muted-foreground mt-1">Since 2016</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(
              (showAll ? reports : reports.slice(0, 6))
            ).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-lg hover-elevate"
                data-testid={`report-${report.id}`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1">{report.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary">{report.type}</Badge>
                  {report.url ? (
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      data-testid={`button-download-${report.id}`}
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-3 w-3" /> PDF
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-2" data-testid={`button-download-${report.id}`}>
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {reports.length > 6 && (
              <div className="flex justify-center mt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAll((s) => !s)}>
                  {showAll ? "Show less" : `Show more (${reports.length - 6})`}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Report Contents</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Executive summary and key findings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Incident analysis and categorization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Trend identification and patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Root cause analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Compliance assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Recommendations and action items</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">AI-Powered Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Automated data aggregation and analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Natural language generation for summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Pattern detection across datasets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Risk scoring and prioritization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Regulatory compliance checking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Visualization and chart generation</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
