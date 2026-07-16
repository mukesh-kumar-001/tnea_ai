import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useCascadingFilters } from "@/hooks/use-cascading-filters";
import { COMMUNITIES, type Community } from "@/lib/mock-data";
import { useAllColleges, useBranches, useCutoffs } from "@/lib/api";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LineChart as LineChartIcon, Loader2, Database, AlertCircle, Download } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker } from "@/components/engineering-bg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cutoffs")({
  head: () => ({
    meta: [
      { title: "Cutoff Explorer — TNEA.ai" },
      { name: "description", content: "Interactive cutoff history charts across colleges, branches and communities for Tamil Nadu Engineering Admissions." },
    ],
  }),
  component: Cutoffs,
});

function Cutoffs() {
  const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
  const { data: branches = [], isLoading: loadingBranches } = useBranches();
  
  const [collegeCode, setCollegeCode] = useState<string>("Any");
  const [branchCode, setBranchCode] = useState<string>("Any");
  const [community, setCommunity] = useState<string>("Any");

  const { filteredColleges, filteredBranches } = useCascadingFilters({
    allColleges: colleges,
    allBranches: branches,
    selectedCollegeCode: collegeCode === "Any" ? "" : collegeCode,
    selectedBranchName: branchCode === "Any" ? "" : branches.find(b => b.code === branchCode)?.name
  });

  useEffect(() => {
    if (collegeCode !== "Any" && filteredColleges.length > 0 && !filteredColleges.find(c => c.code === collegeCode)) {
      setCollegeCode("Any");
    }
  }, [filteredColleges, collegeCode]);

  useEffect(() => {
    if (branchCode !== "Any" && filteredBranches.length > 0 && !filteredBranches.find(b => b.code === branchCode)) {
      setBranchCode("Any");
    }
  }, [filteredBranches, branchCode]);

  // Fetch all data for the selected college to allow instant in-memory filtering
  const { data: cutoffsResponse, isLoading: loadingCutoffs } = useCutoffs({
    college_code: collegeCode === "Any" ? "" : collegeCode,
    per_page: 5000 
  });

  const data = useMemo(() => {
    if (!cutoffsResponse?.data) return [];
    
    // Instant in-memory filtering
    const filtered = cutoffsResponse.data.filter(r => {
      const matchBranch = branchCode === "Any" || r.branch_code === branchCode;
      const matchCategory = community === "Any" || r.category === community;
      return matchBranch && matchCategory;
    });
    
    const yearMap = new Map<number, number[]>();
    for (const r of filtered) {
      if (!yearMap.has(r.year)) {
        yearMap.set(r.year, []);
      }
      if (r.cutoff_mark) {
        yearMap.get(r.year)!.push(r.cutoff_mark);
      }
    }
    
    return Array.from(yearMap.entries())
      .map(([year, cutoffs]) => ({ 
        year, 
        cutoff: cutoffs.length ? cutoffs.reduce((a,b) => a+b, 0) / cutoffs.length : 0 
      }))
      .filter(d => d.cutoff > 0)
      .sort((a, z) => a.year - z.year);
  }, [cutoffsResponse, branchCode, community]);

  // Dynamic Y-axis
  const yDomain = useMemo(() => {
    if (data.length === 0) return [150, 200];
    let min = 200;
    let max = 0;
    data.forEach(d => {
      if (d.cutoff < min) min = d.cutoff;
      if (d.cutoff > max) max = d.cutoff;
    });
    return [Math.max(0, Math.floor(min) - 2), Math.min(200, Math.ceil(max) + 2)];
  }, [data]);

  const exportCsv = () => {
    if (!data.length) return;
    const headers = ["Year", "Cutoff Mark"];
    const csvRows = [
      headers.join(","),
      ...data.map(d => `${d.year},${d.cutoff.toFixed(2)}`)
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `cutoffs_${collegeCode}_${branchCode}_${community}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedCollege = colleges.find(c => c.code === collegeCode);
  const selectedBranch = branches.find(b => b.code === branchCode);

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface-muted/40 overflow-hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-16 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <CoordinateMarker label="DB.HIST" className="mb-4" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Historical Cutoff Analytics</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">Visualize cutoff trajectories across different colleges, branches, and communities to identify allocation trends.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-page py-12">
        <AnimatedSection direction="up" delay={0.1}>
          <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Database className="size-4 text-primary" />
                <span className="technical-label">Query Parameters</span>
              </div>
              <button 
                onClick={() => { setCollegeCode("Any"); setBranchCode("Any"); setCommunity("Any"); }}
                className="text-xs font-semibold text-primary hover:underline uppercase tracking-widest"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label className="technical-label block mb-2">Institution</Label>
                <SearchableSelect 
                  value={collegeCode} 
                  onValueChange={setCollegeCode} 
                  disabled={loadingColleges}
                  options={[
                    { value: "Any", label: "Any College" },
                    ...filteredColleges.map((c) => ({ value: c.code, label: `[${c.code}] ${c.name}` }))
                  ]}
                  placeholder="Select college"
                  searchPlaceholder="Search colleges..."
                />
              </div>
              
              <div>
                <Label className="technical-label block mb-2">Program Branch</Label>
                <SearchableSelect 
                  value={branchCode} 
                  onValueChange={setBranchCode} 
                  disabled={loadingBranches}
                  options={[
                    { value: "Any", label: "Any Course" },
                    ...filteredBranches.map((br) => ({ value: br.code, label: br.name }))
                  ]}
                  placeholder="Select course"
                  searchPlaceholder="Search courses..."
                />
              </div>
              
              <div>
                <Label className="technical-label block mb-2">Community Category</Label>
                <SearchableSelect 
                  value={community} 
                  onValueChange={setCommunity}
                  options={[
                    { value: "Any", label: "Any Community" },
                    ...COMMUNITIES.map((c) => ({ value: c, label: c }))
                  ]}
                  placeholder="Select community"
                  searchPlaceholder="Search community..."
                  className="font-mono"
                />
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Card className="p-6 md:p-8 rounded-2xl border-border/60 bg-card">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="flex items-start gap-4">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-1">
                  <LineChartIcon className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Trajectory Analysis</h2>
                  <div className="text-sm text-muted-foreground mt-1 flex flex-col md:flex-row md:items-center gap-1.5 font-medium">
                    <span className="text-foreground">{selectedCollege?.shortName || "Any College"}</span>
                    <span className="hidden md:inline text-border">/</span>
                    <span className="text-foreground">{selectedBranch?.name || "Any Branch"}</span>
                    <span className="hidden md:inline text-border">/</span>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{community}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {!loadingCutoffs && data.length > 0 && (
                  <div className="flex items-center gap-3 bg-muted/40 p-2 rounded-lg border border-border/60">
                    <div className="technical-label hidden sm:block">Y-Axis:</div>
                    <div className="font-mono text-xs font-bold bg-background px-2 py-1 rounded border border-border/60">{yDomain[0]} — {yDomain[1]}</div>
                  </div>
                )}
                <Button onClick={exportCsv} disabled={data.length === 0} variant="outline" className="rounded-xl gap-2 font-medium shadow-sm h-10">
                  <Download className="size-4" /> Export CSV
                </Button>
              </div>
            </div>

            {loadingCutoffs ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60">
                <Loader2 className="size-6 animate-spin mb-3 text-primary" />
                <div className="technical-label">Querying Database...</div>
              </div>
            ) : data.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60">
                <AlertCircle className="size-8 mb-3 opacity-50" />
                <div className="font-bold text-foreground">Insufficient Data</div>
                <p className="text-sm mt-1 max-w-sm">No historical cutoff data exists for this specific combination of college, branch, and community.</p>
              </div>
            ) : (
              <div className="h-[400px] w-full font-mono text-xs -ml-4 md:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="var(--engineering-grid-color)" opacity={0.4} vertical={false} />
                    <XAxis dataKey="year" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                    <YAxis domain={yDomain} fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => val.toFixed(1)} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '1px solid var(--color-border)', 
                        backgroundColor: 'var(--color-card)',
                        color: 'var(--color-foreground)',
                        padding: '12px 16px',
                        boxShadow: 'var(--shadow-md)',
                        fontFamily: 'var(--font-mono)'
                      }}
                      itemStyle={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)', paddingBottom: '4px' }}
                      labelStyle={{ color: 'var(--color-foreground)', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontFamily: 'var(--font-sans)' }} iconType="circle" />
                    <Line 
                      type="monotone" 
                      dataKey="cutoff" 
                      stroke="var(--color-primary)" 
                      strokeWidth={3} 
                      dot={{ r: 5, strokeWidth: 2, fill: 'var(--color-background)' }} 
                      activeDot={{ r: 7, strokeWidth: 0, fill: 'var(--color-primary)' }}
                      name="Closing Cutoff Mark"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </AnimatedSection>
      </section>
    </AppShell>
  );
}
