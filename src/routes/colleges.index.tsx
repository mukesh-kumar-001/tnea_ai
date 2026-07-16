import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useMemo, useState, useCallback } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { DISTRICTS } from "@/lib/mock-data";
import { useAllColleges, useBranches } from "@/lib/api";
import { Search, Filter, MapPin, Building2, ArrowRight, X, AlertTriangle, SearchX, RotateCcw } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { InlineStat } from "@/components/stat-card";
import { EngineeringBg, EngineeringDivider, CoordinateMarker } from "@/components/engineering-bg";

export const Route = createFileRoute("/colleges/")({
  head: () => ({
    meta: [
      { title: "College Explorer — TNEA.ai" },
      { name: "description", content: "Filter and browse Tamil Nadu engineering colleges by district, NAAC, NBA, branch, fees, hostel and placement." },
    ],
  }),
  component: Explorer,
});

const ANY = "any";

const CollegeCard = React.memo(({ c }: { c: any }) => {
  return (
    <Card className="p-5 md:p-6 rounded-2xl card-hover-lift border-border/60 bg-card/80 backdrop-blur overflow-hidden relative group">
      <div className="flex flex-col md:flex-row md:items-start gap-5 relative z-10">
        <div className="grid size-14 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20 shadow-sm">
          <Building2 className="size-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="secondary" className="font-mono text-[10px] bg-muted/60 border border-border/80">CD:{c.code}</Badge>
            <Badge variant="outline" className="text-[10px] font-medium border-border/80">{c.type}</Badge>
            <Badge className="bg-success/15 text-success hover:bg-success/15 border border-success/20 text-[10px] font-bold">NAAC {c.naac}</Badge>
            {c.autonomous && <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-[10px]">Autonomous</Badge>}
          </div>
          
          <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors">{c.name}</h3>
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mt-2">
            <MapPin className="size-3.5" /> {c.district} · Est. {c.established}
          </div>

          <EngineeringDivider className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InlineStat label="Placement" value={`${c.placementPercentage}%`} />
            <InlineStat label="Avg Package" value={`₹${c.averagePackage}L`} />
            <InlineStat label="Highest" value={`₹${c.highestPackage}L`} />
            <InlineStat label="Fees / Yr" value={`₹${(c.fees / 1000).toFixed(0)}k`} />
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {c.branches.slice(0, 4).map((b: string) => (
              <Badge key={b} variant="secondary" className="font-normal text-[10px] bg-muted/40">{b}</Badge>
            ))}
            {c.branches.length > 4 && <Badge variant="outline" className="text-[10px] border-dashed border-border/80">+{c.branches.length - 4} more</Badge>}
          </div>
        </div>
        
        <Link to="/colleges/$code" params={{ code: c.code }} className="md:self-center mt-4 md:mt-0 w-full md:w-auto">
          <Button className="rounded-xl gap-2 shadow-sm w-full md:w-auto group/btn">
            View Profile <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
});

function Explorer() {
  const navigate = useNavigate(); 
  
  const { data: colleges = [], isLoading: loadingColleges, error } = useAllColleges();
  const { data: branches = [], isLoading: loadingBranches } = useBranches();
  
  const loading = loadingColleges || loadingBranches;
  const branchOptions = useMemo(() => branches.map(b => b.name), [branches]);

  const [q, setQ] = useState("");
  const [district, setDistrict] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [naac, setNaac] = useState(ANY);
  const [nba, setNba] = useState(false);
  const [branch, setBranch] = useState(ANY);
  const [hostel, setHostel] = useState(false);
  const [maxFees, setMaxFees] = useState<[number]>([200000]);
  const [minPlacement, setMinPlacement] = useState<[number]>([0]);

  const results = useMemo(() => {
    return colleges.filter((c) => {
      if (q && !`${c.name} ${c.code} ${c.district}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (district !== ANY && c.district !== district) return false;
      if (type !== ANY && c.type !== type) return false;
      if (naac !== ANY && c.naac !== naac) return false;
      if (nba && !c.nba) return false;
      if (branch !== ANY && !c.branches.includes(branch)) return false;
      if (hostel && !c.hostel) return false;
      if (c.fees > maxFees[0]) return false;
      if (c.placementPercentage < minPlacement[0]) return false;
      return true;
    });
  }, [colleges, q, district, type, naac, nba, branch, hostel, maxFees, minPlacement]);

  const clearAll = useCallback(() => {
    setQ(""); setDistrict(ANY); setType(ANY); setNaac(ANY); setNba(false);
    setBranch(ANY); setHostel(false); setMaxFees([200000]); setMinPlacement([0]);
  }, []);

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface-muted/40 overflow-hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-16 md:py-20 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <CoordinateMarker label="DB.QUERY" className="justify-center mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">College Explorer</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">Query the complete Tamil Nadu engineering college database with precise filters for placement, fees, and accreditation.</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-10 relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm duration-500" />
              <div className="relative flex items-center bg-card rounded-xl border border-border/60 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-primary/50 overflow-hidden h-14">
                <Search className="size-5 ml-4 text-muted-foreground" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by college name, code, or city..."
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-base font-medium"
                />
                {q && (
                  <button onClick={() => setQ("")} className="mr-3 p-1.5 rounded-md hover:bg-muted text-muted-foreground">
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex items-center justify-between lg:hidden mb-6">
          <h2 className="font-bold text-lg">College Directory</h2>
          <Button variant="outline" size="sm" onClick={() => document.getElementById("mobile-filters")?.classList.toggle("hidden")} className="gap-2">
            <Filter className="size-4" /> Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters Panel */}
        <aside id="mobile-filters" className="hidden lg:block space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin z-10 pb-10">
          <Card className="rounded-2xl border-border/60 shadow-sm bg-card/80 backdrop-blur-sm">
            <div className="p-5 border-b border-border/60 bg-muted/20 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Filter className="size-4 text-primary" /> FILTER PARAMETERS
                </div>
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-[10px] uppercase font-bold tracking-wider h-7 text-muted-foreground hover:text-foreground">
                  Reset
                </Button>
              </div>
            </div>
            <div className="p-5 space-y-6">
              <FilterSelect label="District" value={district} onChange={setDistrict} options={DISTRICTS} anyLabel="Any District" />
              <EngineeringDivider />
              <FilterSelect label="College Type" value={type} onChange={setType} options={["Government", "Aided", "Self-Financing"]} anyLabel="Any Type" />
              <EngineeringDivider />
              <FilterSelect label="NAAC Grade" value={naac} onChange={setNaac} options={["A++", "A+", "A", "B++", "B+", "B"]} anyLabel="Any Grade" />
              <EngineeringDivider />
              <FilterSelect label="Branch" value={branch} onChange={setBranch} options={branchOptions} anyLabel="Any Branch" />
              
              <EngineeringDivider />
              <div>
                <Label className="technical-label">Max Annual Fees</Label>
                <div className="mt-3 flex items-center gap-4">
                  <Slider min={20000} max={200000} step={5000} value={maxFees} onValueChange={(v) => setMaxFees(v as [number])} className="flex-1" />
                  <div className="text-xs font-mono font-medium min-w-[3rem] text-right">₹{(maxFees[0]/1000).toFixed(0)}k</div>
                </div>
              </div>
              
              <div>
                <Label className="technical-label">Min Placement %</Label>
                <div className="mt-3 flex items-center gap-4">
                  <Slider min={0} max={100} step={5} value={minPlacement} onValueChange={(v) => setMinPlacement(v as [number])} className="flex-1" />
                  <div className="text-xs font-mono font-medium min-w-[3rem] text-right">{minPlacement[0]}%</div>
                </div>
              </div>
              
              <EngineeringDivider />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="nba" className="text-sm font-medium">NBA Accredited</Label>
                <Switch id="nba" checked={nba} onCheckedChange={setNba} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hostel" className="text-sm font-medium">Hostel Available</Label>
                <Switch id="hostel" checked={hostel} onCheckedChange={setHostel} />
              </div>
              
              <EngineeringDivider />
              
              <Button variant="secondary" className="w-full font-bold gap-2" onClick={clearAll}>
                <RotateCcw className="size-4" /> Clear Filters
              </Button>
            </div>
          </Card>
        </aside>

        {/* Dynamic Content Stream */}
        <div className="min-w-0">
          {loading ? (
            <div className="grid gap-4" aria-busy="true" aria-label="Loading colleges">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 rounded-2xl border-border/60">
                  <div className="flex gap-5">
                    <Skeleton className="size-14 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/3" />
                      <div className="grid grid-cols-4 gap-4 pt-4 mt-2 border-t border-border/40">
                         {Array.from({length: 4}).map((_, j) => (
                           <div key={j}>
                             <Skeleton className="h-3 w-16 mb-2" />
                             <Skeleton className="h-4 w-12" />
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <AnimatedSection>
              <Card className="p-10 rounded-2xl text-center border-destructive/30 bg-destructive/5 flex flex-col items-center">
                <div className="grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive mb-4 shadow-sm border border-destructive/20">
                  <AlertTriangle className="size-5" />
                </div>
                <div className="text-foreground font-bold text-lg">System Error</div>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">Failed to connect to the college database. {error instanceof Error ? error.message : "Unknown connection error."}</p>
                <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>Retry Connection</Button>
              </Card>
            </AnimatedSection>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  Query returned <span className="font-bold text-foreground font-mono">{results.length}</span> records
                </div>
              </div>

              {results.length === 0 ? (
                <AnimatedSection>
                  <Card className="p-16 rounded-2xl text-center flex flex-col items-center border-dashed border-border">
                    <div className="grid size-16 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-4">
                      <SearchX className="size-6" />
                    </div>
                    <div className="font-bold text-lg">0 matches found</div>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">No engineering colleges match the current filter parameters. Try expanding your search criteria.</p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="mt-6 shadow-sm">Clear Filters</Button>
                  </Card>
                </AnimatedSection>
              ) : (
                <div className="grid gap-5">
                  {results.map((c) => (
                    <CollegeCard key={c.code} c={c} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </section>
    </AppShell>
  );
}

function FilterSelect({ label, value, onChange, options, anyLabel }: { label: string; value: string; onChange: (v: string) => void; options: string[]; anyLabel: string }) {
  return (
    <div>
      <Label className="technical-label block mb-2">{label}</Label>
      <Select value={value} onValueChange={(val) => onChange(val === ANY ? ANY : val)}>
        <SelectTrigger className="h-10 rounded-lg bg-background shadow-sm border-border/80">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY} className="font-medium">{anyLabel}</SelectItem>
          {options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>
  );
}
