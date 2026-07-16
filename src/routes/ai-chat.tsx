import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2, User, Terminal } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker } from "@/components/engineering-bg";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant — TNEA.ai" },
      { name: "description", content: "Chat with an AI assistant about TNEA colleges, cutoffs, placements, fees, hostels, counselling rules and seat availability." },
    ],
  }),
  component: ChatPage,
});

interface Msg { role: "user" | "assistant"; content: string; }

const STARTERS = [
  "Compute the optimal placement-to-fee ratio for CSE in Chennai",
  "Analyze historical TNEA counselling rounds and allocation algorithms",
  "Extract the highest recorded package at PSG Tech",
  "Compare structural differences between BC and MBC reservation quotas",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "System online. Neural assistant initialized.\n\nI am equipped to analyze TNEA data matrices including institutional profiles, historical cutoffs, placement statistics, and official counselling protocols. Awaiting your query parameter." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => { 
    if (!loading) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    
    // Simulate thinking delay for effect
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) {
        if (res.status === 429) toast.error("Rate limit exceeded. System throttling.");
        else if (res.status === 402) toast.error("Compute credits exhausted.");
        else toast.error("Neural linkage failed.");
        setLoading(false);
        return;
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: assistant };
          return copy;
        });
      }
    } catch (e) {
      toast.error("Network protocol error. Retrying connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-12 md:py-16 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <CoordinateMarker label="AI.CHAT" className="mb-4" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Neural Interface</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">Query the unified TNEA database using natural language. Our AI synthesizes complex data points into actionable insights.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-8 md:py-10 max-w-5xl">
        <AnimatedSection direction="up" delay={0.1}>
          <Card className="rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-elegant overflow-hidden flex flex-col relative" style={{ height: "calc(100vh - 350px)", minHeight: "500px" }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
            
            <div className="flex items-center justify-between p-4 border-b border-border/60 bg-muted/20">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                <span className="technical-label">Active Session: TNEA-AI-v2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">System Online</span>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-3 md:gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`grid size-8 md:size-10 place-items-center rounded-xl shrink-0 shadow-sm border ${m.role === "user" ? "bg-card border-border/60 text-foreground" : "bg-primary text-primary-foreground border-primary/20"}`}>
                      {m.role === "user" ? <User className="size-4 md:size-5" /> : <Sparkles className="size-4 md:size-5" />}
                    </div>
                    <div className={`rounded-2xl px-5 py-4 max-w-[85%] md:max-w-[75%] text-[15px] whitespace-pre-wrap leading-relaxed shadow-sm border ${
                      m.role === "user" 
                        ? "bg-foreground text-background border-foreground rounded-tr-sm font-medium" 
                        : "bg-card border-border/60 text-foreground rounded-tl-sm"
                    }`}>
                      {m.content || (loading && i === messages.length - 1 ? (
                        <div className="flex gap-1 items-center h-5">
                          <span className="size-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="size-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="size-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : "")}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 md:gap-4"
                >
                  <div className="grid size-8 md:size-10 place-items-center rounded-xl shrink-0 bg-primary/20 text-primary border border-primary/30 shadow-sm">
                    <Loader2 className="size-4 md:size-5 animate-spin" />
                  </div>
                  <div className="rounded-2xl px-5 py-4 bg-muted/40 border border-border/40 text-sm rounded-tl-sm inline-flex items-center gap-3 font-mono text-muted-foreground uppercase tracking-wider">
                    Processing Query...
                  </div>
                </motion.div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 md:px-6 pb-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Terminal className="size-3" /> Suggested Queries
                </div>
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((s) => (
                    <button 
                      key={s} 
                      onClick={() => send(s)} 
                      className="text-xs font-mono px-3 py-2 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all text-left max-w-full bg-card"
                    >
                      &gt; {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 md:p-6 bg-muted/10 border-t border-border/60">
              <div className="flex gap-3 items-end relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur duration-500 pointer-events-none" />
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  placeholder="Enter query parameters..."
                  rows={1}
                  className="resize-none rounded-xl min-h-[52px] max-h-40 bg-card border-border/80 focus-visible:ring-primary/50 text-base py-3.5 relative z-10 shadow-sm"
                  disabled={loading}
                />
                <Button 
                  onClick={() => send()} 
                  disabled={loading || !input.trim()} 
                  className="rounded-xl h-[52px] w-[52px] shrink-0 p-0 shadow-sm relative z-10 group/btn" 
                  aria-label="Send query"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 rounded-xl" />
                  {loading ? <Loader2 className="size-5 animate-spin relative z-10" /> : <Send className="size-5 relative z-10" />}
                </Button>
              </div>
              <div className="text-[10px] text-muted-foreground mt-3 text-center font-mono uppercase tracking-widest opacity-60">
                Notice: AI synthesized data may contain variances. Cross-reference with official DoTE publications.
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </section>
    </AppShell>
  );
}
