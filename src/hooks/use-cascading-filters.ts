import { useMemo } from "react";
import { type College } from "@/lib/mock-data";

interface CascadingFiltersProps {
  allColleges: College[] | undefined;
  allBranches: { code: string; name: string }[] | undefined;
  selectedCollegeCode?: string;
  selectedBranchName?: string;
}

export function useCascadingFilters({
  allColleges,
  allBranches,
  selectedCollegeCode,
  selectedBranchName,
}: CascadingFiltersProps) {
  const filteredColleges = useMemo(() => {
    if (!allColleges) return [];
    
    let result = allColleges;
    if (selectedBranchName && selectedBranchName !== "any") {
      result = allColleges.filter((college) => 
        college.branches?.includes(selectedBranchName)
      );
    }
    
    const uniqueNames = new Set<string>();
    return result.filter(c => {
      if (uniqueNames.has(c.name)) return false;
      uniqueNames.add(c.name);
      return true;
    });
  }, [allColleges, selectedBranchName]);

  const filteredBranches = useMemo(() => {
    if (!allBranches) return [];
    if (!selectedCollegeCode || selectedCollegeCode === "any" || !allColleges) return allBranches;
    
    const college = allColleges.find((c) => c.code === selectedCollegeCode);
    if (!college) {
      const uniqueNames = new Set<string>();
      return allBranches.filter(b => {
        if (uniqueNames.has(b.name)) return false;
        uniqueNames.add(b.name);
        return true;
      });
    }
    
    const uniqueNames = new Set<string>();
    return allBranches.filter((branch) => {
      if (!college.branches || !college.branches.includes(branch.name)) return false;
      if (uniqueNames.has(branch.name)) return false;
      uniqueNames.add(branch.name);
      return true;
    });
  }, [allBranches, allColleges, selectedCollegeCode]);

  return {
    filteredColleges,
    filteredBranches,
  };
}
