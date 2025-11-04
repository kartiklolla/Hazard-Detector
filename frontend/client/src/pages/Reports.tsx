import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { useState } from "react";
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

const reports = [
  {
    id: 1,
    title: "Q3 2024 Safety Audit Report",
    type: "Safety Audit",
    date: "2024-10-15",
    status: "completed",
    incidents: 45,
    compliance: 89,
  },
  {
    id: 2,
    title: "Jharkhand Regional Analysis",
    type: "Regional Analysis",
    date: "2024-10-10",
    status: "completed",
    incidents: 78,
    compliance: 85,
  },
  {
    id: 3,
    title: "Methane Incident Deep Dive 2021-2024",
    type: "Incident Analysis",
    date: "2024-09-28",
    status: "completed",
    incidents: 127,
    compliance: 92,
  },
  {
    id: 4,
    title: "Equipment Failure Trends Report",
    type: "Equipment Analysis",
    date: "2024-09-15",
    status: "completed",
    incidents: 67,
    compliance: 88,
  },
  {
    id: 5,
    title: "Annual Compliance Review 2023",
    type: "Compliance Review",
    date: "2024-01-30",
    status: "completed",
    incidents: 298,
    compliance: 91,
  },
];

export default function Reports() {
  const [open, setOpen] = useState(false);

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-primary" />
              <Badge>Automated</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">156</h3>
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <p className="text-xs text-muted-foreground mt-1">Since 2016</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <Badge variant="secondary">Average</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold font-mono mb-2">89%</h3>
            <p className="text-sm text-muted-foreground">Compliance Score</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+4% vs last year</p>
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
            <h3 className="text-2xl font-bold font-mono mb-2">2.3hrs</h3>
            <p className="text-sm text-muted-foreground">Avg. Generation Time</p>
            <p className="text-xs text-muted-foreground mt-1">95% faster than manual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
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
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {report.incidents} incidents
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {report.compliance}% compliance
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary">{report.type}</Badge>
                  <Button variant="outline" size="sm" className="gap-2" data-testid={`button-download-${report.id}`}>
                    <Download className="h-3 w-3" /> PDF
                  </Button>
                </div>
              </div>
            ))}
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
