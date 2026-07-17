import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useAllColleges, useBranches } from "@/lib/api";
import { type MockCollege } from "@/lib/mock-data";
import { useCascadingFilters } from "@/hooks/use-cascading-filters";
import { Plus, X, ArrowRightLeft, Download, Check, Minus, Printer, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/animated-section";
import { EngineeringBg, CoordinateMarker } from "@/components/engineering-bg";
import { toast } from "sonner";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Colleges — TNEA.ai" },
      { name: "description", content: "Compare multiple engineering colleges side-by-side with metrics like fees, placements, cutoffs and facilities." },
    ],
  }),
  component: CompareColleges,
});

function CompareColleges() {
  const { data: colleges = [] } = useAllColleges();
  const { data: branches = [] } = useBranches();
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [collegeToAdd, setCollegeToAdd] = useState("");

  const [collegeType, setCollegeType] = useState("");
  const [district, setDistrict] = useState("");
  const [branchCode, setBranchCode] = useState("");

  const { availableTypes, availableDistricts, filteredColleges, filteredBranches } = useCascadingFilters({
    allColleges: colleges,
    allBranches: branches,
    selectedCollegeType: collegeType,
    selectedDistrict: district,
    selectedBranchName: branches.find(b => b.code === branchCode)?.name
  });

  useEffect(() => {
    if (district && district !== "any" && !availableDistricts.includes(district)) {
      setDistrict("");
    }
  }, [availableDistricts, district]);

  useEffect(() => {
    if (collegeToAdd && collegeToAdd !== "Any" && !filteredColleges.some(c => c.code === collegeToAdd)) {
      setCollegeToAdd("");
    }
  }, [filteredColleges, collegeToAdd]);

  useEffect(() => {
    if (branchCode && branchCode !== "any" && !filteredBranches.some(b => b.code === branchCode)) {
      setBranchCode("");
    }
  }, [filteredBranches, branchCode]);

  const selectedColleges = selectedIds
    .map(id => colleges.find(c => c.code === id))
    .filter(Boolean) as MockCollege[];

  const addCollege = () => {
    if (!collegeToAdd || collegeToAdd === "Any") return;
    if (selectedIds.length >= 4) {
      toast.error("Maximum limit reached", { description: "You can compare up to 4 colleges at a time." });
      return;
    }
    if (selectedIds.includes(collegeToAdd)) {
      toast.warning("Already added", { description: "This college is already in the comparison list." });
      return;
    }
    setSelectedIds([...selectedIds, collegeToAdd]);
    setCollegeToAdd("");
  };

  const removeCollege = (id: string) => {
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const exportPdf = () => {
    window.print();
  };

  const share = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const compareRow = (label: string, renderVal: (c: MockCollege) => React.ReactNode, isHighlighted = false) => (
    <div className={`grid grid-cols-[160px_repeat(auto-fit,minmax(250px,1fr))] border-b border-border/40 hover:bg-muted/30 transition-colors ${isHighlighted ? 'bg-primary/5' : ''}`}>
      <div className="p-4 font-semibold text-sm technical-label flex items-center sticky left-0 bg-background/95 backdrop-blur z-10 border-r border-border/40">
        {label}
      </div>
      {selectedColleges.map(c => (
        <div key={`${c.code}-${label}`} className="p-4 text-sm min-w-[250px] border-r border-border/20 last:border-r-0">
          {renderVal(c)}
        </div>
      ))}
    </div>
  );

  return (
    <AppShell>
      <section className="relative border-b border-border/60 bg-surface overflow-hidden print:hidden">
        <EngineeringBg variant="grid" className="absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="container-page py-12 md:py-16 relative z-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <CoordinateMarker label="COMPARE" className="mb-4" />
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">Compare Colleges</h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">Evaluate up to 4 colleges side-by-side to make the right choice.</p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <Button onClick={share} variant="outline" className="rounded-xl gap-2 font-medium shadow-sm bg-background">
                <Share2 className="size-4" /> Share
              </Button>
              <Button onClick={exportPdf} className="rounded-xl gap-2 font-medium shadow-sm">
                <Printer className="size-4" /> Export Report
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="hidden print:block mb-8 mt-4 container-page">
        <h1 className="text-2xl font-bold border-b pb-2 mb-2">TNEA College Comparison Report</h1>
        <p className="text-sm text-gray-500 mb-6">Generated by TNEA.ai on {new Date().toLocaleDateString()}</p>
      </div>

      <section className="container-page py-8">
        <AnimatedSection>
          <Card className="p-6 mb-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm print:hidden">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="flex-1 w-full">
                <SearchableSelect 
                  value={collegeType || "any"} 
                  onValueChange={(v) => setCollegeType(v === "any" ? "" : v)} 
                  options={[{ value: "any", label: "Any Type" }, ...availableTypes.map(t => ({ value: t, label: t }))]}
                  placeholder="Filter by Type"
                  searchPlaceholder="Search types..."
                />
              </div>
              <div className="flex-1 w-full">
                <SearchableSelect 
                  value={district || "any"} 
                  onValueChange={(v) => setDistrict(v === "any" ? "" : v)} 
                  options={[{ value: "any", label: "Any District" }, ...availableDistricts.map(d => ({ value: d, label: d }))]}
                  placeholder="Filter by District"
                  searchPlaceholder="Search districts..."
                />
              </div>
              <div className="flex-1 w-full">
                <SearchableSelect 
                  value={branchCode || "any"} 
                  onValueChange={(v) => setBranchCode(v === "any" ? "" : v)} 
                  options={[{ value: "any", label: "Any Branch" }, ...filteredBranches.map(b => ({ value: b.code, label: `[${b.code}] ${b.name}` }))]}
                  placeholder="Filter by Branch"
                  searchPlaceholder="Search branches..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <SearchableSelect 
                  value={collegeToAdd} 
                  onValueChange={setCollegeToAdd}
                  options={[
                    { value: "Any", label: "Select a college..." },
                    ...filteredColleges.map((c) => ({ value: c.code, label: `[${c.code}] ${c.name}` }))
                  ]}
                  placeholder="Select a college to compare..."
                  searchPlaceholder="Search colleges..."
                />
              </div>
              <Button onClick={addCollege} disabled={!collegeToAdd || collegeToAdd === "Any" || selectedIds.length >= 4} className="h-12 rounded-xl gap-2 shadow-glow font-bold w-full sm:w-auto shrink-0">
                <Plus className="size-4" /> Add to Compare
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-mono">
              Limit: {selectedIds.length} / 4 slots utilized
            </p>
          </Card>
        </AnimatedSection>

        {selectedColleges.length === 0 ? (
          <AnimatedSection>
            <Card className="p-16 rounded-2xl text-center border-dashed border-border/80 flex flex-col items-center justify-center min-h-[400px]">
              <div className="grid size-20 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-6 shadow-sm border border-border/60">
                <ArrowRightLeft className="size-8 opacity-60" />
              </div>
              <div className="font-extrabold text-2xl tracking-tight">No Colleges Added</div>
              <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
                Add at least two colleges to see a side-by-side comparison.
              </p>
            </Card>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <div className="w-full overflow-x-auto pb-6 scrollbar-thin rounded-2xl border border-border/60 shadow-sm bg-card">
              <div className="min-w-max">
                
                {/* Header Row */}
                <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(250px,1fr))] border-b-2 border-border bg-muted/40 sticky top-0 z-20 backdrop-blur-md">
                  <div className="p-4 font-bold uppercase tracking-widest text-xs text-muted-foreground flex items-end sticky left-0 bg-muted/90 backdrop-blur z-30 border-r border-border/40">
                    Comparison Metrics
                  </div>
                  {selectedColleges.map(c => (
                    <div key={c.code} className="p-4 relative min-w-[250px] border-r border-border/20 last:border-r-0">
                      <button 
                        onClick={() => removeCollege(c.code)}
                        className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors print:hidden"
                      >
                        <X className="size-4" />
                      </button>
                      <Badge variant="secondary" className="font-mono text-[10px] mb-2">CD: {c.code}</Badge>
                      <h3 className="font-bold text-base leading-tight text-foreground pr-6">{c.name}</h3>
                      <div className="text-xs text-muted-foreground mt-1">{c.district}</div>
                    </div>
                  ))}
                </div>

                {/* Data Rows */}
                {compareRow("College Type", c => (
                  <Badge variant={c.type === "Government" ? "default" : "outline"} className="text-xs">{c.type || "Not available"}</Badge>
                ))}
                
                {compareRow("Status", c => (
                  <div className="flex items-center gap-2">
                    {c.autonomous === true ? <span className="text-success font-semibold flex items-center gap-1"><Check className="size-4" /> Autonomous</span> : c.autonomous === false ? <span className="text-muted-foreground font-medium flex items-center gap-1"><Minus className="size-4" /> Affiliated</span> : <span className="text-muted-foreground font-medium text-sm">Not available</span>}
                  </div>
                ))}
                
                {compareRow("NAAC Grade", c => (
                  <span className="font-mono font-bold">{c.naac && c.naac !== "Not Accredited" ? c.naac : <span className="text-muted-foreground font-medium text-sm">Not available</span>}</span>
                ))}
                
                {compareRow("Placement %", c => (
                  <div className="flex items-center gap-2">
                    {c.placementPercentage != null && c.placementPercentage > 0 ? (
                      <span className="font-mono font-bold text-primary text-lg">{c.placementPercentage}%</span>
                    ) : (
                      <span className="text-muted-foreground font-medium text-sm">Not available</span>
                    )}
                  </div>
                ), true)}
                
                {compareRow("Avg Package", c => (
                  c.averagePackage != null && c.averagePackage > 0 ? (
                    <span className="font-mono font-bold">₹{c.averagePackage} LPA</span>
                  ) : (
                    <span className="text-muted-foreground font-medium text-sm">Not available</span>
                  )
                ), true)}
                
                {compareRow("Highest Package", c => (
                  c.highestPackage != null && c.highestPackage > 0 ? (
                    <span className="font-mono font-bold">₹{c.highestPackage} LPA</span>
                  ) : (
                    <span className="text-muted-foreground font-medium text-sm">Not available</span>
                  )
                ))}
                
                {compareRow("Annual Fees", c => (
                  c.fees != null && c.fees > 0 ? (
                    <span className="font-mono font-bold">₹{(c.fees / 1000).toFixed(0)}k / year</span>
                  ) : (
                    <span className="text-muted-foreground font-medium text-sm">Not available</span>
                  )
                ), true)}
                
                {compareRow("Hostel", c => (
                  c.hostel === true ? (
                    <div className="text-sm">
                      <div className="text-success font-semibold flex items-center gap-1 mb-1"><Check className="size-4" /> Available</div>
                      {c.hostelFees != null && c.hostelFees > 0 && <div className="font-mono text-xs text-muted-foreground">₹{(c.hostelFees / 1000).toFixed(0)}k / year</div>}
                    </div>
                  ) : c.hostel === false ? (
                    <span className="text-muted-foreground font-medium flex items-center gap-1"><Minus className="size-4" /> Not Available</span>
                  ) : (
                    <span className="text-muted-foreground font-medium text-sm">Not available</span>
                  )
                ))}
                
                {compareRow("Facilities", c => (
                  <div className="flex flex-wrap gap-1.5">
                    {c.facilities && c.facilities.length > 0 ? (
                      c.facilities.map(f => <Badge key={f} variant="secondary" className="text-[10px] font-normal">{f}</Badge>)
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">Not available</span>
                    )}
                  </div>
                ))}

                {compareRow("Programs Offered", c => (
                  <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin content-start items-start">
                    {c.branches.map(b => (
                      <Badge key={b} variant="secondary" className="text-sm py-1.5 px-3 h-auto whitespace-normal text-left break-words">
                        {b}
                      </Badge>
                    ))}
                  </div>
                ))}

              </div>
            </div>
          </AnimatedSection>
        )}
      </section>
    </AppShell>
  );
}
