import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, MapPin, Sparkles, GraduationCap, Home, Wallet, Award, Users, Star, AlertTriangle, ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import React, { useMemo, useState } from "react";
import { useAllColleges, useCutoffs } from "@/lib/api";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { StatCard, InlineStat } from "@/components/stat-card";
import { EngineeringBg, CoordinateMarker, EngineeringDivider } from "@/components/engineering-bg";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/colleges/$code")({
  head: () => ({
    meta: [{ title: "College Profile — TNEA.ai" }],
  }),
  component: Detail,
});

interface BackendCollege {
  id: number;
  tnea_code: string;
  name: string;
  district: string;
  type: string;
  autonomous: boolean;
  established_year?: number;
}

function Detail() {
  const { code } = Route.useParams();
  const [community, setCommunity] = useState("");
  const [branch, setBranch] = useState("");
  const { data: allColleges = [], isLoading: loadingColleges, error: fetchError } = useAllColleges();
  const { data: cutoffsResponse, isLoading: loadingCutoffs } = useCutoffs({ college_code: code, category: community || "OC", per_page: 500 });

  const loading = loadingColleges;
  const error = fetchError ? (fetchError instanceof Error ? fetchError.message : String(fetchError)) : null;

  const college = useMemo(() => {
    if (!allColleges.length) return null;
    const c = allColleges.find((x) => x.code === code);
    if (!c) return null;

    // Inject live cutoffs into the mock structure, filtering out invalid cutoffs > 200
    const liveCutoffs = (cutoffsResponse?.data || []).map((ct) => ({
      year: ct.year,
      branch: ct.branch_name,
      community: ct.category,
      cutoff: (ct.cutoff_mark && ct.cutoff_mark <= 200) ? ct.cutoff_mark : null
    }));

    // Generate branches list from cutoffs if missing
    const liveBranches = Array.from(new Set(liveCutoffs.map(ct => ct.branch)));
    const branches = liveBranches.length > 0 ? liveBranches : c.branches;

    return {
      ...c,
      branches,
      cutoffs: liveCutoffs.length > 0 ? liveCutoffs : c.cutoffs
    };
  }, [allColleges, code, cutoffsResponse]);

  // Render loading state instantly while the page shifts
  if (loading) {
    return (
      <AppShell>
        <div className="container-page py-12 w-full overflow-hidden" aria-busy="true" aria-label="Loading college profile">
          <Skeleton className="h-4 w-48 mb-8" />
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <Skeleton className="size-24 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-4 pt-2">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
        </div>
      </AppShell>
    );
  }

  if (error || !college) {
    return (
      <AppShell>
        <div className="container-page py-24 text-center flex flex-col items-center w-full overflow-hidden">
          <AnimatedSection>
            <div className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive mb-6 border border-destructive/20 shadow-sm">
              <AlertTriangle className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">System Error: College Not Found</h1>
            <p className="mt-3 text-muted-foreground max-w-sm">The requested college code [{code}] does not match any entry in the active database.</p>
            <Link to="/colleges" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold hover:text-primary transition-colors bg-muted/50 px-4 py-2 rounded-lg border border-border/80">
              <ArrowLeft className="size-4" /> Back to Database
            </Link>
          </AnimatedSection>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header Profile Section */}
      <section className="relative border-b border-border/60 bg-surface overflow-hidden w-full">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-10 relative z-10">
          <AnimatedSection direction="none">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="font-mono text-xs uppercase">SYS.ROOT</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/colleges" className="font-mono text-xs uppercase">DB.COLLEGES</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage className="font-mono text-xs uppercase text-primary font-bold">CD:{college.shortName}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </AnimatedSection>

          <AnimatedSection className="mt-8 flex flex-col md:flex-row md:items-start gap-6 lg:gap-8">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative grid size-20 md:size-24 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elegant border border-primary-foreground/10">
                <Building2 className="size-10 md:size-12" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <Badge variant="secondary" className="font-mono text-[10px] bg-background/80 border-border/80">CD:{college.code}</Badge>
                <Badge className="bg-success/15 text-success hover:bg-success/15 border border-success/20 text-[10px] font-bold">NAAC {college.naac}</Badge>
                {college.nba && <Badge variant="outline" className="text-[10px] font-medium border-border/80">NBA Accredited</Badge>}
                <Badge variant="outline" className="text-[10px] font-medium border-border/80">{college.type}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">{college.name}</h1>
              <div className="flex items-center gap-2 mt-3 text-muted-foreground text-sm font-mono">
                <MapPin className="size-4 shrink-0" /> <span className="truncate">{college.address}</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<GraduationCap className="size-5" />} label="Placement" value={college.placementPercentage} suffix="%" countUp />
            <StatCard icon={<Award className="size-5" />} label="Highest Package" value={`₹${college.highestPackage}L`} countUp={false} />
            <StatCard icon={<Star className="size-5" />} label="Avg Package" value={`₹${college.averagePackage}L`} countUp={false} />
            <StatCard icon={<Wallet className="size-5" />} label="Fees / Yr" value={`₹${(college.fees / 1000).toFixed(0)}k`} countUp={false} />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Tab Interfaces */}
      <section className="container-page py-12 w-full overflow-hidden">
        <Tabs defaultValue="overview" className="w-full max-w-full overflow-hidden">
          <AnimatedSection delay={0.3}>
            <div className="relative overflow-x-auto pb-2 no-scrollbar mb-8">
              <TabsList className="h-auto p-1 bg-muted/30 border border-border/60 rounded-xl inline-flex min-w-max md:min-w-0 flex-nowrap whitespace-nowrap">
                <TabsTrigger value="overview" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Overview</TabsTrigger>
                <TabsTrigger value="courses" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Courses</TabsTrigger>
                <TabsTrigger value="cutoffs" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Cutoffs</TabsTrigger>
                <TabsTrigger value="placements" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Placements</TabsTrigger>
                <TabsTrigger value="fees" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Fees</TabsTrigger>
                <TabsTrigger value="scholarships" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Scholarships</TabsTrigger>
                <TabsTrigger value="facilities" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Facilities</TabsTrigger>
                <TabsTrigger value="recruiters" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide">Recruiters</TabsTrigger>
                <TabsTrigger value="ai" className="rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide text-primary">AI Summary</TabsTrigger>
              </TabsList>
            </div>
          </AnimatedSection>

          <div className="min-h-[400px]">
            <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="INF.01" className="mb-4" />
                  <h2 className="text-xl font-bold mb-4">Institution Profile</h2>
                  <p className="text-muted-foreground leading-relaxed text-base">{college.summary}</p>
                  
                  <EngineeringDivider className="my-8" />
                  
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <InfoBlock label="Established" value={String(college.established)} mono />
                    <InfoBlock label="Category" value={college.type} />
                    <InfoBlock label="Location" value={college.district} />
                    <InfoBlock label="Accreditation" value={`NAAC ${college.naac}${college.nba ? " · NBA" : ""}`} />
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="courses" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="CRS.02" className="mb-4" />
                  <h2 className="text-xl font-bold mb-6">Program Offerings</h2>
                  <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                    {college.branches.map((b: string) => (
                      <StaggerItem key={b}>
                        <div className="p-4 border border-border/60 rounded-xl hover:border-primary/40 hover:bg-muted/30 transition-all group card-hover-lift bg-card">
                          <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{b}</div>
                          <div className="text-[11px] font-mono text-muted-foreground mt-2 uppercase tracking-wide">B.E. / B.Tech · 4 Years</div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="cutoffs" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <CutoffTab college={college} community={community} setCommunity={setCommunity} branch={branch} setBranch={setBranch} />
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="placements" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="PLC.04" className="mb-4" />
                  <h2 className="text-xl font-bold mb-8">Placement Statistics</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <StatCard icon={<GraduationCap className="size-6" />} label="Total Placement Rate" value={college.placementPercentage} suffix="%" countUp className="h-full" />
                    <StatCard icon={<Award className="size-6" />} label="Highest Package Offered" value={`₹${college.highestPackage}LPA`} className="h-full" countUp={false} />
                    <StatCard icon={<Star className="size-6" />} label="Average Package" value={`₹${college.averagePackage}LPA`} className="h-full" countUp={false} />
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="fees" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="FEE.05" className="mb-4" />
                  <h2 className="text-xl font-bold mb-8">Fee Structure</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border/60 bg-card relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Wallet className="size-20" /></div>
                      <div className="technical-label mb-2">Annual Tuition Fees</div>
                      <div className="text-4xl font-extrabold tracking-tight font-mono">₹{college.fees.toLocaleString("en-IN")}</div>
                      <div className="mt-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">Base fee structure</div>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-border/60 bg-card relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Home className="size-20" /></div>
                      <div className="technical-label mb-2 flex items-center gap-1.5"><Home className="size-3.5" /> Hostel Accommodation</div>
                      <div className="text-4xl font-extrabold tracking-tight font-mono">{college.hostel ? `₹${(college.hostelFees ?? 0).toLocaleString("en-IN")}` : "N/A"}</div>
                      <div className="mt-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">{college.hostel ? "Per year (mess charges extra)" : "Hostel facility not available"}</div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="scholarships" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="SCH.06" className="mb-4" />
                  <h2 className="text-xl font-bold mb-6">Financial Assistance & Scholarships</h2>
                  <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                    {college.scholarships.map((s: string) => (
                      <StaggerItem key={s}>
                        <div className="p-4 border border-border/60 rounded-xl text-sm hover:border-primary/40 hover:bg-muted/30 transition-colors bg-card font-medium flex items-center gap-3">
                          <div className="size-1.5 rounded-full bg-primary/60 shrink-0" /> {s}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="facilities" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="FAC.07" className="mb-4" />
                  <h2 className="text-xl font-bold mb-6">Campus Infrastructure</h2>
                  <StaggerContainer className="flex flex-wrap gap-2.5">
                    {college.facilities.map((f: string) => (
                      <StaggerItem key={f}>
                        <Badge variant="secondary" className="py-2 px-4 text-sm bg-muted/50 border border-border/60 hover:bg-muted font-medium">{f}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="recruiters" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur">
                  <CoordinateMarker label="REC.08" className="mb-4" />
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Users className="size-5 text-primary" /> Corporate Partners</h2>
                  <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {college.recruiters.map((r: string) => (
                      <StaggerItem key={r}>
                        <div className="p-4 h-full border border-border/60 rounded-xl flex items-center justify-center text-center font-bold text-sm hover:border-primary/40 hover:bg-muted/30 transition-colors bg-card card-hover-lift">
                          {r}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="ai" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AnimatedSection direction="none">
                <Card className="p-6 md:p-8 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden shadow-glow">
                  <EngineeringBg variant="dots" className="absolute inset-0 opacity-40 mix-blend-overlay" />
                  <div className="relative z-10">
                    <CoordinateMarker label="AI.GEN" className="mb-4" />
                    <div className="flex items-center gap-2 text-primary font-bold mb-6 text-xl">
                      <Sparkles className="size-5" /> AI Synthesis Report
                    </div>
                    <p className="leading-relaxed text-base text-foreground/90 font-medium max-w-4xl">
                      {college.shortName} is a <strong className="text-foreground">{college.type.toLowerCase()}</strong> institution in <strong className="text-foreground">{college.district}</strong> with a{" "}
                      <strong className="text-foreground">NAAC {college.naac}</strong> grade. It reports a <strong className="text-foreground">{college.placementPercentage}% placement rate</strong>{" "}
                      with an average package of <strong className="text-foreground font-mono">₹{college.averagePackage} LPA</strong> and a highest of <strong className="text-foreground font-mono">₹{college.highestPackage} LPA</strong>.
                      Fees are around <strong className="text-foreground font-mono">₹{(college.fees / 1000).toFixed(0)}k per year</strong>{college.hostel ? " with hostel facilities" : ""}.
                      Its top branches include <strong className="text-foreground">{college.branches.slice(0, 3).join(", ")}</strong>. This college is a{" "}
                      <strong className={
                        college.placementPercentage >= 95 ? "text-amber-500" : college.placementPercentage >= 88 ? "text-primary" : "text-emerald-500"
                      }>
                        {college.placementPercentage >= 95 ? "Dream" : college.placementPercentage >= 88 ? "Target" : "Safe"}
                      </strong>{" "}
                      option for aspirants with matching cutoff ranges.
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </AppShell>
  );
}

const CutoffTab = React.memo(({ college, community, setCommunity, branch, setBranch }: { college: any, community: string, setCommunity: (c: string) => void, branch: string, setBranch: (b: string) => void }) => {
  const allBranches = useMemo(() => {
    if (college.branches && college.branches.length > 0) return college.branches;
    return Array.from(new Set((college.cutoffs || []).map((c: any) => c.branch)));
  }, [college]);
  const displayBranches = useMemo(() => branch === "any" ? allBranches : [branch], [branch, allBranches]);
  
  const chartData = useMemo(() => {
    const years = Array.from(new Set((college.cutoffs || []).map((c: any) => c.year))).sort() as number[];
    return years.map((year) => {
      const row: Record<string, number | string> = { year };
      for (const b of displayBranches) {
        const c = (college.cutoffs || []).find((x: any) => x.year === year && x.branch === b && x.community === community);
        if (c) row[b as string] = c.cutoff;
      }
      return row;
    });
  }, [college, displayBranches, community]);

  const colors = [
    "var(--color-primary)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-destructive)",
    "var(--color-chart-5)"
  ];

  // Calculate dynamic domain based on data
  const yDomain = useMemo(() => {
    let min = 200;
    let max = 0;
    chartData.forEach(row => {
      displayBranches.forEach(b => {
        const val = row[b as string];
        if (typeof val === 'number') {
          if (val < min) min = val;
          if (val > max) max = val;
        }
      });
    });
    // Add 1 point padding
    return [Math.max(0, Math.floor(min) - 1), Math.min(200, Math.ceil(max) + 1)];
  }, [chartData, displayBranches]);

  return (
    <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur w-full overflow-hidden">
      <CoordinateMarker label="CTF.03" className="mb-4" />

      <div className="grid md:grid-cols-2 gap-6 mb-8 bg-muted/20 p-4 rounded-xl border border-border/40">
        <div>
          <Label className="technical-label block mb-2">Community Category</Label>
          <SearchableSelect 
            value={community} 
            onValueChange={setCommunity}
            options={[
              ...["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"].map(c => ({ value: c, label: c }))
            ]}
            placeholder="Select Community"
            searchPlaceholder="Search community..."
            className="font-mono"
          />
        </div>
        <div>
          <Label className="technical-label block mb-2">Program Branch</Label>
          <SearchableSelect 
            value={branch} 
            onValueChange={setBranch}
            options={[
              { value: "any", label: "Compare All Branches" },
              ...allBranches.map((b: any) => ({ value: b, label: b }))
            ]}
            placeholder="Select Branch"
            searchPlaceholder="Search branches..."
            className="font-mono"
          />
        </div>
      </div>

      {!community || !branch ? (
        <div className="h-[400px] flex items-center justify-center border border-dashed border-border/60 rounded-xl bg-muted/20 text-muted-foreground text-sm font-medium">
          Please select both a Community Category and a Program Branch to view the cutoff trajectory.
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold">Cutoff Trajectory ({community})</h2>
              <p className="text-sm text-muted-foreground mt-1">Historical closing cutoffs across selected branches.</p>
            </div>
            <div className="flex items-center gap-3 bg-muted/40 p-2 rounded-lg border border-border/60">
              <div className="technical-label">Y-Axis Range:</div>
              <div className="font-mono text-xs font-bold bg-background px-2 py-1 rounded border border-border/60">{yDomain[0]} — {yDomain[1]}</div>
            </div>
          </div>
          
          <div className="h-[400px] w-full font-mono text-xs overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--engineering-grid-color)" opacity={0.4} vertical={false} />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                <YAxis domain={yDomain} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => val.toFixed(1)} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid var(--color-border)', 
                    backgroundColor: 'var(--color-card)',
                    boxShadow: 'var(--shadow-md)',
                    fontFamily: 'var(--font-mono)'
                  }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--color-muted-foreground)', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontFamily: 'var(--font-sans)' }} iconType="circle" />
                {displayBranches.map((b: any, i) => (
                  <Line 
                    key={b} 
                    type="monotone" 
                    dataKey={b} 
                    stroke={colors[i % colors.length]} 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 2, fill: 'var(--color-background)' }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Card>
  );
});

function InfoBlock({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="p-4 rounded-xl bg-muted/40 border border-border/40 hover:bg-muted/60 transition-colors w-full overflow-hidden">
      <div className="technical-label">{label}</div>
      <div className={`text-sm font-semibold mt-1.5 truncate ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}