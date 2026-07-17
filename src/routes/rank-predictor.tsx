import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { COMMUNITIES, type Community } from "@/lib/mock-data";
import { TrendingUp, Sparkles, Crosshair, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker } from "@/components/engineering-bg";

export const Route = createFileRoute("/rank-predictor")({
  head: () => ({
    meta: [
      { title: "Rank Predictor — TNEA.ai" },
      { name: "description", content: "Estimate your TNEA general and community rank instantly from your cutoff marks with confidence indicator." },
    ],
  }),
  component: RankPredictor,
});

// mock model: rank scales inversely with cutoff, community-adjusted
function predict(cutoff: number, community: Community) {
  const c = Math.max(100, Math.min(200, cutoff));
  const general = Math.round(Math.max(1, (200 - c) * 950 + 200));
  const commAdj: Record<Community, number> = { OC: 1, BC: 0.75, BCM: 0.6, MBC: 0.5, SC: 0.25, SCA: 0.2, ST: 0.15 };
  const community_rank = Math.round(general * commAdj[community]);
  const spread = Math.round(general * 0.08);
  const confidence = Math.max(65, Math.min(98, Math.round(60 + (c - 100) * 0.4)));
  return {
    general: [Math.max(1, general - spread), general + spread] as [number, number],
    community: [Math.max(1, community_rank - Math.round(spread * commAdj[community])), community_rank + Math.round(spread * commAdj[community])] as [number, number],
    confidence,
  };
}

function RankPredictor() {
  const [cutoff, setCutoff] = useState("190");
  const [community, setCommunity] = useState<Community>("BC");
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  const submit = () => {
    const c = parseFloat(cutoff);
    if (isNaN(c) || c < 100 || c > 200) return;
    setResult(predict(c, community));
  };

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-16 relative z-10 max-w-5xl">
          <AnimatedSection>
            <CoordinateMarker label="STAT.PREDICT" className="mb-4" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Rank Predictor</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">Input your academic scores to estimate your general and community ranks.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-12 max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <AnimatedSection direction="right" delay={0.1}>
            <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm h-full">
              <div className="flex items-center gap-2 mb-6 text-foreground/80">
                <Calculator className="size-4" />
                <span className="technical-label">Input Variables</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="cutoff" className="technical-label block mb-2 text-foreground/80">Cutoff Score [100.0 - 200.0]</Label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm duration-500" />
                    <Input 
                      id="cutoff" 
                      type="number" 
                      step="0.5" 
                      min="100" 
                      max="200" 
                      value={cutoff}
                      onChange={(e) => setCutoff(e.target.value)} 
                      className="relative h-12 text-xl font-mono bg-background border-border shadow-sm focus-visible:ring-primary/50" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="technical-label block mb-2 text-foreground/80">Community Category</Label>
                  <Select value={community} onValueChange={(v) => setCommunity(v as Community)}>
                    <SelectTrigger className="h-12 bg-background font-mono shadow-sm border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMUNITIES.map((c) => <SelectItem key={c} value={c} className="font-mono">{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={submit} className="w-full h-12 rounded-xl gap-2 mt-4 shadow-glow group relative overflow-hidden font-bold">
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                  <TrendingUp className="size-4 relative z-10" /> 
                  <span className="relative z-10 uppercase tracking-widest text-xs">Execute Prediction</span>
                </Button>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <Card className="p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden group/result shadow-elegant">
              <EngineeringBg variant="dots" className="absolute inset-0 opacity-40 mix-blend-overlay" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-primary font-bold mb-8">
                  <Sparkles className="size-5" /> 
                  <span className="uppercase tracking-widest text-sm">Prediction Results</span>
                </div>
                
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="p-5 rounded-xl bg-card border border-border/60 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Crosshair className="size-24" /></div>
                        <div className="technical-label mb-2 text-primary">Estimated General Rank</div>
                        <div className="text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-foreground mt-1">
                          {result.general[0].toLocaleString()} <span className="text-muted-foreground font-light mx-2">—</span> {result.general[1].toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="p-5 rounded-xl bg-card border border-border/60">
                        <div className="technical-label mb-2">Estimated {community} Rank</div>
                        <div className="text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-foreground/90 mt-1">
                          {result.community[0].toLocaleString()} <span className="text-muted-foreground font-light mx-2">—</span> {result.community[1].toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="technical-label">Confidence Score</span>
                          <span className="text-sm font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2 bg-muted/60" indicatorClassName="bg-primary shadow-glow" />
                      </div>
                      
                      <p className="text-xs text-muted-foreground font-mono leading-relaxed opacity-70">
                        <span className="text-warning">NOTICE:</span> Projections utilize statistical modeling. Variance is expected. Official authority ranks prevail.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <div className="grid size-16 place-items-center rounded-2xl bg-card border border-primary/20 text-primary shadow-sm relative z-10">
                          <TrendingUp className="size-6 opacity-80" />
                        </div>
                      </div>
                      <div className="font-extrabold text-2xl tracking-tight">Ready to Start</div>
                      <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
                        Input your cutoff and community on the left to estimate your rank.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </AppShell>
  );
}
