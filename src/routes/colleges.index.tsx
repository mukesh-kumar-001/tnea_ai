import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
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
import { Search, Filter, MapPin, Building2, ArrowRight, X, AlertTriangle, SearchX } from "lucide-react";

export const Route = createFileRoute("/colleges/")({
  head: () => ({
    meta: [
      { title: "College Explorer — TNEA.ai" },
      { name: "description", content: "Filter and browse Tamil Nadu engineering colleges by district, NAAC, NBA, branch, fees, hostel and placement." },
    ],
  }),
  component: Explorer,
});

const ALL = "all";

function Explorer() {
  const navigate = useNavigate(); 
  
  const { data: colleges = [], isLoading: loadingColleges, error } = useAllColleges();
  const { data: branches = [], isLoading: loadingBranches } = useBranches();
  
  const loading = loadingColleges || loadingBranches;
  const branchOptions = useMemo(() => branches.map(b => b.name), [branches]);

  const [q, setQ] = useState("");
  const [district, setDistrict] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [naac, setNaac] = useState(ALL);
  const [nba, setNba] = useState(false);
  const [branch, setBranch] = useState(ALL);
  const [hostel, setHostel] = useState(false);
  const [maxFees, setMaxFees] = useState<[number]>([200000]);
  const [minPlacement, setMinPlacement] = useState<[number]>([0]);

  const results = useMemo(() => {
    return colleges.filter((c) => {
      if (q && !`${c.name} ${c.code} ${c.district}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (district !== ALL && c.district !== district) return false;
      if (type !== ALL && c.type !== type) return false;
      if (naac !== ALL && c.naac !== naac) return false;
      if (nba && !c.nba) return false;
      if (branch !== ALL && !c.branches.includes(branch)) return false;
      if (hostel && !c.hostel) return false;
      if (c.fees > maxFees[0]) return false;
      if (c.placementPercentage < minPlacement[0]) return false;
      return true;
    });
  }, [colleges, q, district, type, naac, nba, branch, hostel, maxFees, minPlacement]);

  const clearAll = () => {
    setQ(""); setDistrict(ALL); setType(ALL); setNaac(ALL); setNba(false);
    setBranch(ALL); setHostel(false); setMaxFees([200000]); setMinPlacement([0]);
  };

  return (
    <AppShell>
      <section className="border-b border-border/60 bg-surface-muted/40">
        <div className="container-page py-12 md:py-14">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">College Explorer</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">Find the right engineering college</h1>
            <p className="mt-3 text-muted-foreground text-pretty">Browse Tamil Nadu engineering colleges with rich filters and live comparison of placement, fees and accreditation.</p>
          </div>
          <div className="mt-8 relative max-w-2xl">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by college name, code or city"
              className="pl-11 h-12 rounded-xl text-base"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-10 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters Panel */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-sm"><Filter className="size-4 text-primary" /> Filters</div>
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-7 text-muted-foreground hover:text-foreground">
                <X className="size-3 mr-1" /> Clear
              </Button>
            </div>
            <div className="space-y-5">
              <FilterSelect label="District" value={district} onChange={setDistrict} options={DISTRICTS} />
              <FilterSelect label="College type" value={type} onChange={setType} options={["Government", "Aided", "Self-Financing"]} />
              <FilterSelect label="NAAC Grade" value={naac} onChange={setNaac} options={["A++", "A+", "A", "B++", "B+", "B"]} />
              <FilterSelect label="Branch" value={branch} onChange={setBranch} options={branchOptions} />

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max Annual Fees</Label>
                <Slider min={20000} max={200000} step={5000} value={maxFees} onValueChange={(v) => setMaxFees(v as [number])} className="mt-3" />
                <div className="mt-2 text-sm font-medium tabular-nums">₹{maxFees[0].toLocaleString("en-IN")}</div>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Placement %</Label>
                <Slider min={0} max={100} step={5} value={minPlacement} onValueChange={(v) => setMinPlacement(v as [number])} className="mt-3" />
                <div className="mt-2 text-sm font-medium tabular-nums">{minPlacement[0]}%</div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="nba" className="text-sm">NBA Accredited</Label>
                <Switch id="nba" checked={nba} onCheckedChange={setNba} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hostel" className="text-sm">Hostel Available</Label>
                <Switch id="hostel" checked={hostel} onCheckedChange={setHostel} />
              </div>
            </div>
          </Card>
        </aside>

        {/* Dynamic Content Stream */}
        <div>
          {loading ? (
            <div className="grid gap-4" aria-busy="true" aria-label="Loading colleges">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 rounded-2xl">
                  <div className="flex gap-5">
                    <Skeleton className="size-14 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="p-10 rounded-2xl text-center border-destructive/30 bg-destructive/5 items-center">
              <div className="grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive mb-3">
                <AlertTriangle className="size-5" />
              </div>
              <div className="text-foreground font-semibold">Couldn't load college data</div>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">{error instanceof Error ? error.message : "Unknown error"}</p>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{results.length}</span> of {colleges.length} database entries
                </div>
              </div>

              {results.length === 0 ? (
                <Card className="p-12 rounded-2xl text-center items-center">
                  <div className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground mb-3">
                    <SearchX className="size-5" />
                  </div>
                  <div className="font-semibold">No colleges match these filters</div>
                  <p className="text-sm text-muted-foreground mt-1">Try widening your budget, placement, or branch filters.</p>
                  <Button variant="outline" size="sm" onClick={clearAll} className="mt-4">Reset filters</Button>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {results.map((c) => (
                    <Card key={c.code} className="p-6 rounded-2xl hover:shadow-elegant hover:border-primary/25 transition-all border-border/60">
                      <div className="flex flex-col md:flex-row md:items-start gap-5">
                        <div className="grid size-14 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                          <Building2 className="size-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <Badge variant="secondary" className="font-mono">Code {c.code}</Badge>
                            <Badge variant="outline">{c.type}</Badge>
                            <Badge className="bg-success/15 text-success hover:bg-success/15 border-0">NAAC {c.naac}</Badge>
                            {c.autonomous && <Badge variant="secondary" className="bg-primary/10 text-primary border-0">Autonomous</Badge>}
                          </div>
                          <h3 className="text-lg md:text-xl font-bold leading-tight">{c.name}</h3>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <MapPin className="size-3.5" /> {c.district}, Tamil Nadu · Est. {c.established}
                          </div>

                          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border/60 pt-4">
                            <Stat label="Placement" value={`${c.placementPercentage}%`} />
                            <Stat label="Avg Package" value={`₹${c.averagePackage} LPA`} />
                            <Stat label="Highest" value={`₹${c.highestPackage} LPA`} />
                            <Stat label="Fees / Yr" value={`₹${(c.fees / 1000).toFixed(0)}k`} />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {c.branches.slice(0, 4).map((b: string) => (
                              <Badge key={b} variant="secondary" className="font-normal">{b}</Badge>
                            ))}
                            {c.branches.length > 4 && <Badge variant="outline">+{c.branches.length - 4} more</Badge>}
                          </div>
                        </div>
                        <Link to="/colleges/$code" params={{ code: c.code }} className="md:self-center">
                          <Button className="rounded-xl gap-1.5 shrink-0 group">
                            Details <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </AppShell>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Any</SelectItem>
          {options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-bold mt-0.5 tabular-nums">{value}</div>
    </div>
  );
}
