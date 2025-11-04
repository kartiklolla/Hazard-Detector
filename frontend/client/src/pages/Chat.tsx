import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, TrendingUp, MapPin, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const suggestedQueries = [
  "Show all methane-related accidents in 2021",
  "Which mines exceeded safety thresholds in Q3 2024?",
  "Generate inspection schedule for high-risk sites",
  "Compare incident rates between Jharkhand and Odisha",
];

const mockMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your Digital Mine Safety Officer. I can help you analyze DGMS incident data, identify patterns, and provide compliance recommendations. What would you like to know?",
    timestamp: new Date(Date.now() - 3600000),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    console.log("Sending message:", input);
    
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    setTimeout(() => {
      const assistantResponse = {
        role: "assistant",
        content: "I've analyzed the DGMS data for your query. Based on the records from 2021, there were 23 methane-related incidents across underground coal mines, with the highest concentration in Jharkhand (12 incidents) and Chhattisgarh (7 incidents). Would you like me to provide more detailed breakdown or recommendations?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantResponse]);
    }, 1000);
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-80 border-r p-6 space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Safety Officer
          </h2>
          <p className="text-sm text-muted-foreground">
            Ask questions in natural language about safety incidents, patterns, and compliance
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Suggested Queries</h3>
          <div className="space-y-2">
            {suggestedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
                onClick={() => handleSuggestedQuery(query)}
                data-testid={`button-suggested-${index}`}
              >
                <span className="text-xs">{query}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Capabilities</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Pattern detection across incidents</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Location-based analysis</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Compliance recommendations</span>
            </div>
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-xs space-y-2">
              <p className="font-medium">Example Query:</p>
              <code className="block p-2 bg-card rounded text-xs border">
                "Show me all methane-related accidents in 2021 in underground coal mines"
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              data-testid={`message-${index}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border"
                } rounded-lg p-4`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Textarea
                placeholder="Ask about incidents, patterns, compliance..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="min-h-[80px] resize-none"
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                className="h-[80px] w-[80px] flex-shrink-0"
                onClick={handleSend}
                disabled={!input.trim()}
                data-testid="button-send-message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
