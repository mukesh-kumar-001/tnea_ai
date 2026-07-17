import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useColleges, useBranches } from "@/lib/api";
import { type College } from "@/lib/mock-data";
import { motion } from "motion/react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { StatCard, InlineStat } from "@/components/stat-card";
import { EngineeringBg, CoordinateMarker, EngineeringDivider } from "@/components/engineering-bg";
import {
  Sparkles, GraduationCap, TrendingUp, ListChecks, LineChart,
  Compass, ArrowRight, ShieldCheck, Database, BadgeCheck, MessageSquare,
  Activity
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant" },
      { name: "description", content: "Personalized college and branch recommendations for TNEA. Explore colleges, predict rank, analyse cutoffs and file smarter choices." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Compass, title: "College Explorer", desc: "Filter 460+ colleges by district, NAAC grade, fees, placement and branch.", to: "/colleges" as const },
  { icon: TrendingUp, title: "Rank Predictor", desc: "Estimate general and community rank instantly from your TNEA cutoff.", to: "/rank-predictor" as const },
  { icon: Sparkles, title: "College Suggestions", desc: "Dream, target and safe college lists tailored to your rank and preferences.", to: "/counselling" as const },
  { icon: ListChecks, title: "Choice Filling", desc: "Drag-and-drop preference list with AI-driven order suggestions.", to: "/choice-filling" as const },
  { icon: LineChart, title: "Cutoff Explorer", desc: "Interactive cutoff history charts across colleges, branches and communities.", to: "/cutoffs" as const },
  { icon: MessageSquare, title: "AI Assistant", desc: "Ask anything about counselling rules, seat matrix, hostels or placements.", to: "/ai-chat" as const },
];

function Home() {
  const { data: collegesData, isLoading: isLoadingColleges } = useColleges(1, 6);
  const { data: branchesData, isLoading: isLoadingBranches } = useBranches();

  const totalColleges = collegesData?.total || 460;
  const totalBranches = branchesData?.length || 120;
  const topColleges = collegesData?.colleges || [];

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] md:size-[800px] rounded-full bg-primary/10 blur-[100px]"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container-page relative z-10 pt-20 pb-16 md:pt-32 md:pb-24">
          <StaggerContainer className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <StaggerItem>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-mono font-medium text-primary shadow-sm glass">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                LATEST // 2026 ADMISSIONS WINDOW
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <h1 className="mt-8 text-balance text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                Smart <span className="text-primary relative inline-block">
                  Engineering
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-1 bg-primary w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                  />
                </span> Admissions
              </h1>
            </StaggerItem>
            
            <StaggerItem>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty font-medium">
                Data-driven college and branch recommendations using verified TNEA parameters. Make confident decisions with our smart insights.
              </p>
            </StaggerItem>
            
            <StaggerItem className="w-full">
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/counselling">
                  <Button size="lg" className="rounded-xl shadow-glow px-8 h-14 gap-2 text-base w-full sm:w-auto">
                    <Activity className="size-5" /> Start Smart Predictor
                  </Button>
                </Link>
                <Link to="/colleges">
                  <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base bg-background/50 backdrop-blur border-border/80 w-full sm:w-auto">
                    Explore Colleges
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Stats */}
        <AnimatedSection delay={0.4} className="container-page pb-16 md:pb-24 z-10 relative mt-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Verified Colleges" value={totalColleges} suffix="+" icon={<GraduationCap className="size-5" />} countUp />
            <StatCard label="Engineering Branches" value={totalBranches} suffix="+" icon={<BadgeCheck className="size-5" />} countUp />
            <StatCard label="Cutoff History" value={5} suffix=" YRS" icon={<Database className="size-5" />} countUp />
            <StatCard label="AI Scenarios Run" value={125} suffix="k+" icon={<Sparkles className="size-5" />} countUp />
          </div>
        </AnimatedSection>
      </section>

      {/* Feature grid */}
      <section className="relative border-y border-border/60 bg-surface-muted/40">
        <CoordinateMarker label="01.SYS" className="absolute top-4 left-4" />
        <div className="container-page py-24">
          <AnimatedSection className="max-w-2xl mb-16">
            <div className="technical-label mb-3">Key Features</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Everything you need</h2>
            <p className="mt-4 text-lg text-muted-foreground">Purpose-built tools for every stage of the TNEA journey — from exploration to final choice submission.</p>
          </AnimatedSection>
          
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <Link to={f.to} className="group block h-full">
                  <Card className="relative p-6 rounded-2xl h-full border-border/60 bg-card/50 backdrop-blur-sm card-hover-lift overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <f.icon className="size-24" />
                    </div>
                    <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20">
                      <f.icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <div className="mt-6 text-sm font-semibold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Go to Tool <ArrowRight className="size-4" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured colleges */}
      <section className="relative container-page py-24">
        <EngineeringBg variant="dots" className="absolute inset-0 opacity-30" />
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="technical-label mb-3">College Directory</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Top-tier colleges</h2>
          </div>
          <Link to="/colleges" className="text-sm font-semibold text-primary hover:text-primary-glow inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20">
            View All Colleges <ArrowRight className="size-4" />
          </Link>
        </AnimatedSection>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {isLoadingColleges ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/30 animate-shimmer border border-border/60" />
            ))
          ) : topColleges.map((c: College, i: number) => (
            <AnimatedSection key={c.code} delay={i * 0.1}>
              <Link to="/colleges/$code" params={{ code: c.code }} className="group block h-full">
                <Card className="p-6 rounded-2xl h-full border-border/60 bg-card/60 backdrop-blur card-hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <span className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
                      CD:{c.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-success uppercase tracking-widest bg-success/10 px-2 py-1 rounded border border-success/20">
                      <span className="size-1.5 rounded-full bg-success animate-pulse" /> NAAC {c.naac}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight line-clamp-2 min-h-[2.5rem]">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">{c.district}, TN</p>
                  <EngineeringDivider className="my-5" />
                  <div className="grid grid-cols-2 gap-4">
                    <InlineStat label="Placement" value={`${c.placementPercentage}%`} />
                    <InlineStat label="Avg Package" value={`₹${c.averagePackage}L`} />
                  </div>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative border-t border-border/60 bg-surface">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-20" />
        <div className="container-page py-20 relative z-10">
          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "Verified Protocols", desc: "Cutoffs sourced directly from official TNEA seat allotment records with high accuracy." },
              { icon: Sparkles, title: "Smart Analysis", desc: "Smart Predictor trained on a decade of admission patterns and shifting preferences." },
              { icon: MessageSquare, title: "AI Chat Assistant", desc: "Always-on conversational agent for rules, seat matrices, and fee structures." },
            ].map((f) => (
              <StaggerItem key={f.title} className="flex gap-5">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <div className="text-base font-bold tracking-tight">{f.title}</div>
                  <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </AppShell>
  );
}
