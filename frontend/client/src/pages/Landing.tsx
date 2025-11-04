import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Brain, TrendingUp, FileCheck, AlertTriangle, MapPin, Clock, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 backdrop-blur-lg bg-primary/20 border-primary/30" data-testid="badge-hero">
              <AlertTriangle className="h-3 w-3 mr-1" />
              DGMS India Mining Safety Platform
            </Badge>
            
            <h1 className="text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI-Powered Safety Intelligence
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Analyze 300+ DGMS incident records (2016-2022) with autonomous AI agents. Real-time pattern detection, automated safety audits, and regulatory compliance monitoring for mining operations across India.
            </p>
            
            <div className="flex gap-4 justify-center mb-12 flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  <Sparkles className="h-5 w-5" />
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="gap-2 backdrop-blur-lg" data-testid="button-ai-officer">
                  <Brain className="h-4 w-4" /> Try AI Assistant
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="backdrop-blur-lg bg-card/50 p-6 rounded-lg border border-primary/20">
                <div className="text-4xl font-bold font-mono text-primary mb-1">300+</div>
                <div className="text-sm text-muted-foreground">Incident Records</div>
              </div>
              <div className="backdrop-blur-lg bg-card/50 p-6 rounded-lg border border-secondary/20">
                <div className="text-4xl font-bold font-mono text-secondary mb-1">2016-2022</div>
                <div className="text-sm text-muted-foreground">Years Analyzed</div>
              </div>
              <div className="backdrop-blur-lg bg-card/50 p-6 rounded-lg border border-accent/20">
                <div className="text-4xl font-bold font-mono text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">AI Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">Platform Capabilities</h2>
            <p className="text-xl text-muted-foreground">Comprehensive tools for mining safety analysis</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover-elevate border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track incident patterns, trends, and anomalies across locations and time periods with interactive visualizations.
              </p>
            </Card>
            
            <Card className="p-6 hover-elevate border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">AI Safety Officer</h3>
              <p className="text-sm text-muted-foreground">
                Natural language interface to query incident data, identify patterns, and receive intelligent recommendations.
              </p>
            </Card>
            
            <Card className="p-6 hover-elevate border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Automated Reports</h3>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive safety audit reports with AI-powered analysis and compliance assessments in seconds.
              </p>
            </Card>
            
            <Card className="p-6 hover-elevate border-chart-5/20 bg-gradient-to-br from-chart-5/10 to-chart-5/5">
              <div className="h-12 w-12 rounded-lg bg-chart-5/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-chart-5" />
              </div>
              <h3 className="font-semibold mb-2">Location Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Monitor 127+ locations across 18 states with geographic incident mapping and regional analysis.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" data-testid="badge-autonomous">
                <Shield className="h-3 w-3 mr-1" />
                Autonomous Monitoring
              </Badge>
              <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">Continuous Safety Surveillance</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AI agents automatically scan DGMS updates, mine inspection reports, and news sources. Incidents are classified in real-time with intelligent hazard detection and proactive alert generation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Automatic incident classification and severity assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Real-time hazard detection with intelligent alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Targeted inspection recommendations for operators</span>
                </li>
              </ul>
            </div>
            
            <Card className="p-8 border-2 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Pattern Recognition</h4>
                    <p className="text-sm text-muted-foreground">AI identifies hidden correlations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">95% Faster Analysis</h4>
                    <p className="text-sm text-muted-foreground">vs. traditional manual methods</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">87% Compliance Rate</h4>
                    <p className="text-sm text-muted-foreground">Across monitored operations</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-8 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
            Transform Mining Safety Operations
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start analyzing incident data with AI-powered insights and automated compliance monitoring
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" data-testid="button-cta-start">
                <Sparkles className="h-5 w-5 mr-2" />
                Launch Dashboard
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" data-testid="button-cta-demo">
                <Brain className="h-4 w-4 mr-2" />
                Try AI Assistant
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>300+ Records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Automated Reports</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
