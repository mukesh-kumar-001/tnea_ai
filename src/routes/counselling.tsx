import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Loader2, ChevronRight, Trophy, Target, Shield } from "lucide-react";
import { COMMUNITIES, DISTRICTS, type Community } from "@/lib/mock-data";
import { useAllColleges, useBranches, fetchRecommendations } from "@/lib/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/counselling")({
  head: () => ({
    meta: [
      { title: "AI Counselling — TNEA.ai" },
      { name: "description", content: "AI-generated dream, target and safe college recommendations for TNEA based on your rank, community and preferences." },
    ],
  }),
  component: Counselling,
});

interface Reco {
  code: string;
  name: string;
  branch: string;
  probability: number;
  expectedCutoff: number;
  reasoning: string;
  category: "dream" | "target" | "safe";
}

function Counselling() {
  const { data: colleges = [] } = useAllColleges();
  const { data: branches = [] } = useBranches();

  const [community, setCommunity] = useState<Community>("BC");
  const [gender, setGender] = useState("Female");
  const [genRank, setGenRank] = useState("2500");
  const [commRank, setCommRank] = useState("1400");
  const [cutoff, setCutoff] = useState("192.5");
  const [prefBranches, setPrefBranches] = useState<string[]>([]);
  const [prefDistricts, setPrefDistricts] = useState<string[]>(["Chennai", "Coimbatore"]);
  const [budget, setBudget] = useState<[number]>([150000]);
  const [hostel, setHostel] = useState(true);

  const [recos, setRecos] = useState<Reco[] | null>(null);

  const { mutate: generate, isPending: loading } = useMutation({
    mutationFn: async () => {
      // Map preferred branch names to codes for the backend
      const branchCodes = prefBranches.map(name => {
        const b = branches.find(x => x.name === name);
        return b ? b.code : name;
      });

      const payload = {
        user_profile: {
          community,
          general_rank: parseInt(genRank),
          community_rank: parseInt(commRank)
        },
        preferences: {
          preferred_branches: branchCodes,
          preferred_districts: prefDistricts
        }
      };

      const result = await fetchRecommendations(payload);
      return result;
    },
    onSuccess: (data) => {
      const allRecos: Reco[] = [];
      const mapCategory = (list: any[], cat: "dream" | "target" | "safe") => {
        if (!list) return;
        list.forEach((item: any) => {
          const college = colleges.find(c => c.id === item.college_id);
          allRecos.push({
            code: college ? college.code : String(item.college_id),
            name: item.name,
            branch: item.branch,
            probability: Math.round(item.probability * 100),
            expectedCutoff: item.historical_cutoff_rank || 0, // Using rank here because API provides rank
            reasoning: item.explanation || "",
            category: cat
          });
        });
      };
      mapCategory(data.dream, "dream");
      mapCategory(data.target, "target");
      mapCategory(data.safe, "safe");
      setRecos(allRecos);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Could not generate recommendations. Please try again.");
    }
  });

  const toggleFrom = (arr: string[], v: string) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const groups = recos ? {
    dream: recos.filter((r) => r.category === "dream").slice(0, 5),
    target: recos.filter((r) => r.category === "target").slice(0, 5),
    safe: recos.filter((r) => r.category === "safe").slice(0, 5),
  } : null;

  return (
    <AppShell>
      <section className="container-page py-12 md:py-14">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">AI Counselling</div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">Get personalized college recommendations</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl text-pretty">Share your TNEA details and preferences. Our AI generates dream, target and safe college lists with reasoning.</p>

        <div className="mt-10 grid lg:grid-cols-[380px_1fr] gap-8">
          <Card className="p-6 rounded-2xl h-fit lg:sticky lg:top-20 gap-0">
            <div className="space-y-5">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Your profile</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Community</Label>
                      <Select value={community} onValueChange={(v) => setCommunity(v as Community)}>
                        <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>{COMMUNITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>General Rank</Label><Input value={genRank} onChange={(e) => setGenRank(e.target.value)} className="mt-1.5" /></div>
                    <div><Label>Community Rank</Label><Input value={commRank} onChange={(e) => setCommRank(e.target.value)} className="mt-1.5" /></div>
                  </div>
                  <div><Label>Cutoff (out of 200)</Label><Input value={cutoff} onChange={(e) => setCutoff(e.target.value)} className="mt-1.5" /></div>
                </div>
              </div>

              <div className="border-t border-border/60 pt-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Preferred Branches</Label>
                    <div className="mt-2 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                      {branches.map((b) => (
                        <Badge key={b.code} onClick={() => setPrefBranches(toggleFrom(prefBranches, b.name))}
                          variant={prefBranches.includes(b.name) ? "default" : "outline"}
                          className="cursor-pointer text-[11px] font-normal">
                          {b.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Preferred Districts</Label>
                    <div className="mt-2 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {DISTRICTS.map((d) => (
                        <Badge key={d} onClick={() => setPrefDistricts(toggleFrom(prefDistricts, d))}
                          variant={prefDistricts.includes(d) ? "default" : "outline"}
                          className="cursor-pointer text-[11px] font-normal">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Annual Budget: <span className="tabular-nums">₹{budget[0].toLocaleString("en-IN")}</span></Label>
                    <Slider min={20000} max={200000} step={5000} value={budget} onValueChange={(v) => setBudget(v as [number])} className="mt-3" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hostel-req">Hostel Required</Label>
                    <Switch id="hostel-req" checked={hostel} onCheckedChange={setHostel} />
                  </div>
                </div>
              </div>

              <Button onClick={() => generate()} disabled={loading} className="w-full h-11 rounded-xl gap-2">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                {loading ? "Generating..." : "Generate Recommendations"}
              </Button>
            </div>
          </Card>

          <div>
            {!recos && !loading && (
              <Card className="p-12 rounded-2xl text-center border-dashed items-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-primary/8 text-primary mb-4">
                  <Sparkles className="size-6" />
                </div>
                <div className="font-bold text-lg">Your recommendations will show up here</div>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">Set your rank, cutoff and preferences on the left, then generate to see dream, target and safe picks.</p>
              </Card>
            )}
            {loading && (
              <Card className="p-12 rounded-2xl text-center items-center">
                <Loader2 className="size-6 mx-auto text-primary animate-spin mb-4" />
                <div className="font-bold text-lg">Analysing your profile</div>
                <p className="text-sm text-muted-foreground mt-1.5">Matching against verified cutoffs and your preferences.</p>
              </Card>
            )}
            {groups && (
              <div className="space-y-8">
                <Group icon={Trophy} title="Dream Colleges" description="Stretch goals — high value if you get in" list={groups.dream} tone="warning" />
                <Group icon={Target} title="Target Colleges" description="Realistic fits at your rank" list={groups.target} tone="primary" />
                <Group icon={Shield} title="Safe Colleges" description="Very likely admissions — good backups" list={groups.safe} tone="success" />
              </div>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ProbabilityRing({ value, tone }: { value: number; tone: "warning" | "primary" | "success" }) {
  const size = 44;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);
  const strokeColor = tone === "warning" ? "var(--warning)" : tone === "success" ? "var(--success)" : "var(--primary)";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={strokeColor} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-[11px] font-bold tabular-nums">{value}%</div>
    </div>
  );
}

function Group({ icon: Icon, title, description, list, tone }: {
  icon: any; title: string; description: string; list: Reco[]; tone: "warning" | "primary" | "success";
}) {
  if (list.length === 0) return null;
  const toneClass = tone === "warning" ? "text-warning bg-warning/10"
    : tone === "success" ? "text-success bg-success/10"
    : "text-primary bg-primary/10";
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className={`grid size-10 place-items-center rounded-xl ${toneClass}`}><Icon className="size-5" /></div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid gap-3">
        {list.map((r) => (
          <Card key={`${r.code}-${r.branch}`} className="p-5 rounded-xl hover:shadow-elegant hover:border-primary/25 transition-all">
            <div className="flex items-start gap-4">
              <ProbabilityRing value={r.probability} tone={tone} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Code {r.code}</span>
                  <span className="font-bold">{r.name}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{r.branch}</div>
                {r.reasoning && <p className="text-sm mt-2 leading-relaxed">{r.reasoning}</p>}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Expected cutoff: <strong className="text-foreground font-mono tabular-nums">{r.expectedCutoff.toFixed(1)}</strong></span>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-1.5" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
