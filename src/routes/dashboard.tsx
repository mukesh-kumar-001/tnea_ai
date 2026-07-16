import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, History, Heart, Sparkles, Download, ArrowRight, LayoutDashboard } from "lucide-react";
import { useAllColleges, useBranches } from "@/lib/api";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker, EngineeringDivider } from "@/components/engineering-bg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — TNEA.ai" },
      { name: "description", content: "Your saved colleges, recent searches, favourite branches and AI recommendation history." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
  const { data: branches = [], isLoading: loadingBranches } = useBranches();

  const saved = colleges.slice(0, 4);
  const searches = ["CSE Chennai", "Government colleges Coimbatore", "PSG Tech placements", "Rank 1500 BC options"];
  const favBranches = branches.slice(0, 5);
  const recos = [
    { title: "AI Report · 15 Jun 2024", meta: "Rank 2500 · BC · Chennai preference" },
    { title: "AI Report · 12 Jun 2024", meta: "Rank 4800 · MBC · Coimbatore preference" },
  ];

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-12 md:py-16 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <CoordinateMarker label="USR.DASH" className="mb-4" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Command Center</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">Your personalized workspace for managing saved institutions, tracking query history, and reviewing generated allocation matrices.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatedSection direction="up" delay={0.1} className="lg:col-span-2">
            <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                  <Bookmark className="size-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg tracking-tight">Saved Institutions</h2>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Monitored Profiles</div>
                </div>
              </div>
              
              <EngineeringDivider className="mb-6" />
              
              <div className="grid sm:grid-cols-2 gap-4 flex-1">
                <StaggerContainer>
                  {saved.map((c) => (
                    <StaggerItem key={c.code} className="h-full">
                      <Link to="/colleges/$code" params={{ code: c.code }} className="block h-full">
                        <Card className="p-5 h-full rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all card-hover-lift group flex flex-col">
                          <Badge variant="secondary" className="w-fit font-mono text-[10px] bg-background border-border/80 mb-3">CD:{c.code}</Badge>
                          <div className="font-bold leading-tight group-hover:text-primary transition-colors flex-1">{c.shortName}</div>
                          <div className="text-xs font-mono text-muted-foreground mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                            {c.district}
                            <ArrowRight className="size-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </div>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Card>
          </AnimatedSection>

          <div className="space-y-6 lg:space-y-8 flex flex-col">
            <AnimatedSection direction="left" delay={0.2} className="flex-1">
              <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    <History className="size-5" />
                  </div>
                  <h2 className="font-bold text-lg tracking-tight">Query Logs</h2>
                </div>
                
                <EngineeringDivider className="mb-4" />
                
                <ul className="space-y-1">
                  <StaggerContainer staggerDelay={0.1}>
                    {searches.map((s, i) => (
                      <StaggerItem key={s}>
                        <li className="text-sm py-3 px-3 rounded-lg border border-transparent hover:border-border/60 hover:bg-muted/40 transition-colors cursor-default font-medium flex items-center gap-3 group">
                          <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary/70 transition-colors">0{i+1}</span>
                          {s}
                        </li>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </ul>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.3} className="flex-1">
              <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    <Heart className="size-5" />
                  </div>
                  <h2 className="font-bold text-lg tracking-tight">Target Programs</h2>
                </div>
                
                <EngineeringDivider className="mb-6" />
                
                <div className="flex flex-wrap gap-2.5">
                  <StaggerContainer>
                    {favBranches.map((b) => (
                      <StaggerItem key={b.code}>
                        <Badge variant="secondary" className="bg-muted/60 hover:bg-muted border border-border/60 px-3 py-1.5 font-medium">{b.name}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="up" delay={0.4} className="lg:col-span-3">
            <Card className="p-6 md:p-8 rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden shadow-sm">
              <EngineeringBg variant="dots" className="absolute inset-0 opacity-40 mix-blend-overlay" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg tracking-tight">Generated Matrices</h2>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">AI Report Archive</div>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <StaggerContainer staggerDelay={0.15}>
                    {recos.map((r, i) => (
                      <StaggerItem key={r.title}>
                        <div className="p-5 border border-border/60 bg-card/60 backdrop-blur rounded-xl flex items-center justify-between gap-4 hover:border-primary/40 hover:shadow-elegant transition-all group">
                          <div className="min-w-0">
                            <div className="font-bold text-base group-hover:text-primary transition-colors">{r.title}</div>
                            <div className="text-xs font-mono text-muted-foreground mt-1.5">{r.meta}</div>
                          </div>
                          <button className="shrink-0 text-primary bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center size-10 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Download Report">
                            <Download className="size-4" />
                          </button>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </AppShell>
  );
}
