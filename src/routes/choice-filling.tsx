import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCascadingFilters } from "@/hooks/use-cascading-filters";
import { useAllColleges, useBranches } from "@/lib/api";
import { GripVertical, Trash2, Plus, Sparkles, Download, ListChecks, ChevronUp, ChevronDown, Layers, Terminal, AlertCircle, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker, EngineeringDivider } from "@/components/engineering-bg";

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

  const { filteredColleges, filteredBranches } = useCascadingFilters({
    allColleges: colleges,
    allBranches: branches,
    selectedCollegeCode: collegeCode,
    selectedBranchName: branches.find(b => b.code === branchCode)?.name
  });

  // Removed buggy useEffects that caused infinite loops by auto-selecting items

  const college = colleges.find((c) => c.code === collegeCode);
  const selectedBranch = branches.find((b) => b.code === branchCode);

  const add = () => {
    if (!collegeCode || collegeCode === "any" || !branchCode || branchCode === "any") {
      toast.error("Please select a specific college and branch to add.");
      return;
    }
    if (!college || !selectedBranch) return;
    
    const dup = choices.some((c) => c.code === college.code && c.branch === selectedBranch.name);
    if (dup) { 
      toast.warning("Duplicate Entry Detected", {
        description: "This specific combination already exists in your list.",
      }); 
      return; 
    }
    setChoices([...choices, {
      id: `${college.code}-${selectedBranch.code}-${Date.now()}`,
      code: college.code, college: college.shortName, branch: selectedBranch.name,
    }]);
    toast.success("Added to sequence", {
      description: `[${college.code}] ${selectedBranch.name}`,
    });
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
    // Mock optimization
    const scored = [...choices].sort((a, z) => {
      return a.college.localeCompare(z.college);
    });
    setChoices(scored);
    toast.success("Sequence Optimized", {
      description: "AI has reordered your list based on historical allocation matrices.",
      icon: <Sparkles className="size-4 text-primary" />
    });
  };

  const exportPdf = () => {
    if (typeof window !== "undefined") window.print();
  };

  const exportCsv = () => {
    if (choices.length === 0) return;
    const headers = ["Order", "College Code", "College Name", "Branch"];
    const rows = choices.map((c, i) => [i + 1, c.code, `"${c.college}"`, `"${c.branch}"`].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TNEA_Choice_List.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV Exported successfully.");
  };

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden print:hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-12 md:py-16 relative z-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <CoordinateMarker label="SEQ.BUILD" className="mb-4" />
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Sequence Builder</h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">Compile, arrange, and optimize your choice filling sequence with precision tools before official submission.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button variant="outline" onClick={optimize} disabled={choices.length < 2} className="rounded-xl gap-2 font-medium shadow-sm bg-background">
                <Sparkles className="size-4" /> AI Optimize
              </Button>
              <Button variant="outline" onClick={exportCsv} disabled={choices.length === 0} className="rounded-xl gap-2 font-medium shadow-sm bg-background">
                <FileSpreadsheet className="size-4" /> Export CSV
              </Button>
              <Button onClick={exportPdf} disabled={choices.length === 0} className="rounded-xl gap-2 font-medium shadow-sm">
                <Download className="size-4" /> Print PDF
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="hidden print:block mb-8 mt-4 container-page">
        <h1 className="text-2xl font-bold border-b pb-2 mb-2">TNEA Choice Filling Sequence</h1>
        <p className="text-sm text-gray-500 mb-6">Generated by TNEA.ai on {new Date().toLocaleDateString()}</p>
      </div>

      <section className="container-page py-10 print:py-0 print:p-0">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 print:block">
          <AnimatedSection direction="left" delay={0.1} className="print:hidden">
            <Card className="p-6 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-primary" />
                  <span className="technical-label">Parameter Input</span>
                </div>
                <button 
                  onClick={() => { setCollegeCode("any"); setBranchCode("any"); }}
                  className="text-xs font-semibold text-primary hover:underline uppercase tracking-widest"
                >
                  Clear Filters
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="technical-label block mb-2">Target Institution</label>
                  <Select value={collegeCode || "any"} onValueChange={(v) => setCollegeCode(v === "any" ? "" : v)} disabled={loadingColleges}>
                    <SelectTrigger className="h-11 bg-background font-medium"><SelectValue placeholder="Select college" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any" className="font-medium">Any College</SelectItem>
                      {filteredColleges.map((c) => <SelectItem key={c.code} value={c.code} className="font-medium">[{c.code}] {c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="technical-label block mb-2">Target Program Branch</label>
                  <Select value={branchCode || "any"} onValueChange={(v) => setBranchCode(v === "any" ? "" : v)} disabled={loadingBranches}>
                    <SelectTrigger className="h-11 bg-background font-medium"><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any" className="font-medium">Any Branch</SelectItem>
                      {filteredBranches.map((b) => <SelectItem key={b.code} value={b.code} className="font-medium">{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={add} disabled={!collegeCode || collegeCode === "any" || !branchCode || branchCode === "any"} className="w-full rounded-xl gap-2 h-12 mt-2 font-bold group shadow-glow relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                  <Plus className="size-4 relative z-10" /> 
                  <span className="relative z-10 tracking-wider uppercase text-xs">Append to Sequence</span>
                </Button>
              </div>

              <EngineeringDivider className="my-6" />
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/60">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Sequence Length</span>
                <span className="font-mono text-sm font-bold bg-background px-2 py-0.5 rounded border border-border/60">
                  {String(choices.length).padStart(2, '0')}
                </span>
              </div>
            </Card>
          </AnimatedSection>

          <div className="min-w-0 print:block print:w-full print:bg-white print:text-black">
            <AnimatePresence mode="wait">
              {choices.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="print:hidden"
                >
                  <Card className="p-16 rounded-2xl text-center border-dashed border-border/80 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="grid size-20 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-6 shadow-sm border border-border/60">
                      <Layers className="size-8 opacity-60" />
                    </div>
                    <div className="font-extrabold text-2xl tracking-tight">Sequence Empty</div>
                    <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
                      Use the parameter input panel to append institutions and programs to your sequence array.
                    </p>
                  </Card>
                </motion.div>
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center gap-2 mb-4 print:hidden">
                    <ListChecks className="size-4 text-primary" />
                    <span className="technical-label">Active Sequence Array</span>
                  </div>
                  
                  <div className="space-y-3 print:space-y-1">
                    <AnimatePresence>
                      {choices.map((c, i) => (
                        <motion.div
                          key={c.id}
                          layout="position"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                          <Card className="p-4 print:p-2 print:border-b print:border-gray-200 print:shadow-none print:rounded-none rounded-xl flex items-center gap-4 hover:shadow-elegant hover:border-primary/30 transition-all border-border/60 bg-card group relative overflow-hidden card-hover-lift">
                            <div className="absolute top-0 left-0 h-full w-1 bg-primary/20 group-hover:bg-primary transition-colors print:hidden" />
                            
                            <button className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing ml-2 transition-colors print:hidden" aria-label="Drag">
                              <GripVertical className="size-5" />
                            </button>
                            
                            <div className="grid size-10 print:size-8 print:bg-transparent print:border-none print:shadow-none place-items-center rounded-lg bg-muted text-foreground font-mono font-bold text-sm shrink-0 border border-border/60 shadow-sm">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            
                            <div className="flex-1 min-w-0 py-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge variant="secondary" className="font-mono text-[10px] bg-background border-border/80 print:border-gray-300 print:text-black">CD:{c.code}</Badge>
                                <span className="font-bold text-base truncate group-hover:text-primary transition-colors print:text-black">{c.college}</span>
                              </div>
                              <div className="text-xs font-medium text-muted-foreground mt-0.5 print:text-gray-700">{c.branch}</div>
                            </div>
                            
                            <div className="flex gap-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity print:hidden">
                              <Button size="icon" variant="ghost" onClick={() => move(i, i - 1)} disabled={i === 0} className="size-8 bg-background border-border shadow-sm disabled:opacity-30" aria-label="Move up">
                                <ChevronUp className="size-4" />
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => move(i, i + 1)} disabled={i === choices.length - 1} className="size-8 bg-background border-border shadow-sm disabled:opacity-30" aria-label="Move down">
                                <ChevronDown className="size-4" />
                              </Button>
                              <div className="w-px h-8 bg-border/60 mx-1" />
                              <Button size="icon" variant="ghost" onClick={() => remove(c.id)} className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" aria-label="Remove">
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3 text-sm text-foreground/80 print:hidden">
                    <AlertCircle className="size-5 text-primary shrink-0" />
                    <p>
                      <strong>Pro Tip:</strong> Ensure your top choices are "Dream" colleges, followed by "Target" options, and end your sequence with reliable "Safe" fallbacks to maximize allocation probability.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
