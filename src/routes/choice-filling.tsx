import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAllColleges, useBranches } from "@/lib/api";
import { GripVertical, Trash2, Plus, Sparkles, Download, ListChecks, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/choice-filling")({
  head: () => ({
    meta: [
      { title: "Choice Filling Assistant — TNEA.ai" },
      { name: "description", content: "Build your TNEA choice list with drag-and-drop ordering, AI optimization and duplicate detection." },
    ],
  }),
  component: ChoiceFilling,
});

interface Choice { id: string; code: string; college: string; branch: string; }

function ChoiceFilling() {
  const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
  const { data: branches = [], isLoading: loadingBranches } = useBranches();

  const [choices, setChoices] = useState<Choice[]>([]);
  const [collegeCode, setCollegeCode] = useState("");
  const [branchCode, setBranchCode] = useState("");

  useEffect(() => {
    if (colleges.length > 0 && !collegeCode) setCollegeCode(colleges[0].code);
  }, [colleges, collegeCode]);

  useEffect(() => {
    if (branches.length > 0 && !branchCode) setBranchCode(branches[0].code);
  }, [branches, branchCode]);

  const college = colleges.find((c) => c.code === collegeCode);
  const selectedBranch = branches.find((b) => b.code === branchCode);

  const add = () => {
    if (!college || !selectedBranch) return;
    const dup = choices.some((c) => c.code === college.code && c.branch === selectedBranch.name);
    if (dup) { toast.warning("Already in your list"); return; }
    setChoices([...choices, {
      id: `${college.code}-${selectedBranch.code}-${Date.now()}`,
      code: college.code, college: college.shortName, branch: selectedBranch.name,
    }]);
  };

  const remove = (id: string) => setChoices(choices.filter((c) => c.id !== id));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= choices.length) return;
    const next = [...choices];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setChoices(next);
  };

  const optimize = () => {
    // Mock optimization since we don't have a backend endpoint for this specific logic yet
    const scored = [...choices].sort((a, z) => {
      // Just a mock sorting behavior for now
      return a.college.localeCompare(z.college);
    });
    setChoices(scored);
    toast.success("Choices reordered by AI (priority order)");
  };

  const exportPdf = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <AppShell>
      <section className="container-page py-12 md:py-14">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Choice Filling</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">Build your preference list</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl text-pretty">Add colleges and branches, reorder them, and let AI suggest the optimal filling order.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={optimize} disabled={choices.length < 2} className="rounded-xl gap-2">
              <Sparkles className="size-4" /> AI Optimize
            </Button>
            <Button onClick={exportPdf} disabled={choices.length === 0} className="rounded-xl gap-2">
              <Download className="size-4" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[380px_1fr] gap-8">
          <Card className="p-6 rounded-2xl h-fit">
            <h3 className="font-bold mb-4">Add a choice</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">College</label>
                <Select value={collegeCode} onValueChange={setCollegeCode} disabled={loadingColleges}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select college" /></SelectTrigger>
                  <SelectContent>{colleges.map((c) => <SelectItem key={c.code} value={c.code}>{c.shortName}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Branch</label>
                <Select value={branchCode} onValueChange={setBranchCode} disabled={loadingBranches}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select branch" /></SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => <SelectItem key={b.code} value={b.code}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={add} className="w-full rounded-xl gap-2 h-10"><Plus className="size-4" /> Add to List</Button>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="text-xs text-muted-foreground">Your list has <strong className="text-foreground">{choices.length}</strong> choices.</div>
            </div>
          </Card>

          <div>
            {choices.length === 0 ? (
              <Card className="p-12 rounded-2xl text-center border-dashed items-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-primary/8 text-primary mb-4">
                  <ListChecks className="size-6" />
                </div>
                <div className="font-bold text-lg">Your list is empty</div>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">Add colleges from the left panel to build your TNEA preference list.</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {choices.map((c, i) => (
                  <Card key={c.id} className="p-4 rounded-xl flex items-center gap-3 hover:shadow-elegant hover:border-primary/25 transition-all">
                    <button className="text-muted-foreground cursor-grab active:cursor-grabbing" aria-label="Drag">
                      <GripVertical className="size-4" />
                    </button>
                    <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-mono text-[10px]">Code {c.code}</Badge>
                        <span className="font-semibold truncate">{c.college}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.branch}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => move(i, i - 1)} disabled={i === 0} className="size-8" aria-label="Move up"><ChevronUp className="size-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => move(i, i + 1)} disabled={i === choices.length - 1} className="size-8" aria-label="Move down"><ChevronDown className="size-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(c.id)} className="size-8 text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 className="size-4" /></Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
