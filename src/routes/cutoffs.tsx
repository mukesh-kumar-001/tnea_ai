import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COMMUNITIES, type Community } from "@/lib/mock-data";
import { useAllColleges, useBranches, useCutoffs } from "@/lib/api";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LineChart as LineChartIcon, Loader2 } from "lucide-react";

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
  
  const [collegeCode, setCollegeCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [community, setCommunity] = useState<Community>("OC");

  // Default selection when data loads
  useEffect(() => {
    if (colleges.length > 0 && !collegeCode) setCollegeCode(colleges[0].code);
  }, [colleges, collegeCode]);

  useEffect(() => {
    if (branches.length > 0 && !branchCode) setBranchCode(branches[0].code);
  }, [branches, branchCode]);

  const { data: cutoffsResponse, isLoading: loadingCutoffs } = useCutoffs({
    college_code: collegeCode,
    branch_code: branchCode,
    category: community,
    per_page: 50 // enough for 5 years
  });

  const data = useMemo(() => {
    if (!cutoffsResponse?.data) return [];
    
    const yearMap = new Map<number, number>();
    for (const r of cutoffsResponse.data) {
      if (!yearMap.has(r.year)) {
        yearMap.set(r.year, r.cutoff_mark || 0);
      }
    }
    
    return Array.from(yearMap.entries())
      .map(([year, cutoff]) => ({ year, cutoff }))
      .sort((a, z) => a.year - z.year);
  }, [cutoffsResponse]);

  const selectedCollege = colleges.find(c => c.code === collegeCode);
  const selectedBranch = branches.find(b => b.code === branchCode);

  return (
    <AppShell>
      <section className="container-page py-12 md:py-14">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Cutoff Explorer</div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">Explore cutoff history</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl text-pretty">Visualize closing cutoffs by college, branch, community and year.</p>

        <Card className="mt-10 p-5 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">College</Label>
              <Select value={collegeCode} onValueChange={setCollegeCode} disabled={loadingColleges}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue placeholder="Select college" /></SelectTrigger>
                <SelectContent>
                  {colleges.map((c) => <SelectItem key={c.code} value={c.code}>{c.shortName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Branch</Label>
              <Select value={branchCode} onValueChange={setBranchCode} disabled={loadingBranches}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue placeholder="Select branch" /></SelectTrigger>
                <SelectContent>
                  {branches.map((br) => <SelectItem key={br.code} value={br.code}>{br.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Community</Label>
              <Select value={community} onValueChange={(v) => setCommunity(v as Community)}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{COMMUNITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <LineChartIcon className="size-4" />
            </div>
            <div className="font-bold text-sm md:text-base">
              {selectedCollege?.shortName || "College"} · {selectedBranch?.name || "Branch"} · {community}
            </div>
          </div>
          {loadingCutoffs ? (
            <div className="h-80 flex flex-col items-center justify-center text-center text-muted-foreground">
              <Loader2 className="size-6 animate-spin mb-2" />
              <div>Loading cutoff data...</div>
            </div>
          ) : data.length === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center text-center text-muted-foreground">
              <div className="font-medium text-foreground">No cutoff data for this combination</div>
              <p className="text-sm mt-1">Try a different branch or community.</p>
            </div>
          ) : (
            <div className="h-80 -ml-2">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
                  <XAxis dataKey="year" fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis domain={[150, 200]} fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--popover)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="cutoff" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} name="Closing cutoff" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </section>
    </AppShell>
  );
}
