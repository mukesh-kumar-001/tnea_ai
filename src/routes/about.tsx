import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Database, Sparkles, Users, Cpu, FileCode2 } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker, EngineeringDivider } from "@/components/engineering-bg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TNEA.ai" },
      { name: "description", content: "TNEA.ai is an independent, AI-powered assistant for Tamil Nadu Engineering Admissions. Learn about our mission, data and team." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden">
        <EngineeringBg variant="blueprint" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-16 md:py-24 relative z-10 max-w-5xl">
          <AnimatedSection>
            <CoordinateMarker label="SYS.INF" className="mb-4" />
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance">System Manifesto</h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-3xl">
              TNEA.ai is an independent, high-precision counselling engine engineered for Tamil Nadu aspirants. We synthesize verified historical data matrices with advanced neural models to compute optimal allocation trajectories for every profile.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-16 md:py-20 max-w-5xl">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="flex items-center gap-2 mb-8">
            <Cpu className="size-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Core Architecture</h2>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            <StaggerItem>
              <Card className="p-8 rounded-2xl border-border/60 bg-card h-full card-hover-lift group">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Verified Integrity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All cutoff metrics, institutional profiles, and matrix data strictly reference official DoTE / TNEA publications to ensure absolute data fidelity.
                </p>
              </Card>
            </StaggerItem>
            
            <StaggerItem>
              <Card className="p-8 rounded-2xl border-border/60 bg-card h-full card-hover-lift group">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Database className="size-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Deep Historical Matrix</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our allocation algorithms ingest 10 years of validated counselling history, creating a robust statistical foundation for every projection.
                </p>
              </Card>
            </StaggerItem>
            
            <StaggerItem>
              <Card className="p-8 rounded-2xl border-border/60 bg-card h-full card-hover-lift group">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Neural Augmentation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Large language models synthesize complex datasets, generate strategic reasoning, and resolve queries through a natural language interface.
                </p>
              </Card>
            </StaggerItem>
            
            <StaggerItem>
              <Card className="p-8 rounded-2xl border-border/60 bg-card h-full card-hover-lift group">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="size-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">Open Access Protocol</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Engineered for maximum accessibility. Zero hidden fees, no gatekeeping. Our objective is to optimize the choice sequence for every applicant.
                </p>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3} className="mt-16">
          <Card className="p-8 rounded-2xl border-warning/30 bg-warning/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-bl-full -mr-16 -mt-16" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="grid size-12 place-items-center rounded-xl bg-warning/20 text-warning shrink-0">
                <FileCode2 className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-warning">System Disclaimer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  TNEA.ai is an independent third-party analytical tool and operates without affiliation to the Directorate of Technical Education, Tamil Nadu. Projections are statistical estimates. Always verify critical parameters against the official <strong className="text-foreground font-mono bg-background/50 px-1.5 py-0.5 rounded border border-border/40">tneaonline.org</strong> portal prior to final sequence submission.
                </p>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </section>
    </AppShell>
  );
}
