import { useMemo } from "react";
import { type College } from "@/lib/mock-data";

interface CascadingFiltersProps {
  allColleges: College[] | undefined;
  allBranches: { code: string; name: string }[] | undefined;
  selectedCollegeType?: string;
  selectedDistrict?: string;
  selectedCollegeCode?: string;
  selectedBranchName?: string;
}

export function useCascadingFilters({
  allColleges,
  allBranches,
  selectedCollegeType,
  selectedDistrict,
  selectedCollegeCode,
  selectedBranchName,
}: CascadingFiltersProps) {
  const availableTypes = useMemo(() => {
    if (!allColleges) return [];
    return Array.from(new Set(allColleges.map(c => c.type))).filter(Boolean).sort();
  }, [allColleges]);

  const availableDistricts = useMemo(() => {
    if (!allColleges) return [];
    let result = allColleges;
    if (selectedCollegeType && selectedCollegeType !== "any") {
      result = result.filter(c => c.type === selectedCollegeType);
    }
    return Array.from(new Set(result.map(c => c.district))).filter(Boolean).sort();
  }, [allColleges, selectedCollegeType]);

  const filteredColleges = useMemo(() => {
    if (!allColleges) return [];
    
    let result = allColleges;
    if (selectedCollegeType && selectedCollegeType !== "any") {
      result = result.filter(c => c.type === selectedCollegeType);
    }
    if (selectedDistrict && selectedDistrict !== "any") {
      result = result.filter(c => c.district === selectedDistrict);
    }
    if (selectedBranchName && selectedBranchName !== "any") {
      result = result.filter((college) => 
        college.branches?.includes(selectedBranchName)
      );
    }
    
    // Sort by name
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [allColleges, selectedCollegeType, selectedDistrict, selectedBranchName]);

  const filteredBranches = useMemo(() => {
    if (!allBranches) return [];
    
    const uniqueNames = new Set<string>();
    
    if (selectedCollegeCode && selectedCollegeCode !== "any" && allColleges) {
      const college = allColleges.find((c) => c.code === selectedCollegeCode);
      if (college) {
        return allBranches.filter((branch) => {
          if (!college.branches || !college.branches.includes(branch.name)) return false;
          if (uniqueNames.has(branch.name)) return false;
          uniqueNames.add(branch.name);
          return true;
        });
      }
    }
    
    if (!allColleges) return allBranches;
    
    const availableBranchNames = new Set<string>();
    filteredColleges.forEach(c => {
      c.branches?.forEach(b => availableBranchNames.add(b));
    });
    
    return allBranches.filter(b => {
      if (!availableBranchNames.has(b.name)) return false;
      if (uniqueNames.has(b.name)) return false;
      uniqueNames.add(b.name);
      return true;
    });
  }, [allBranches, allColleges, selectedCollegeCode, filteredColleges]);

  return {
    availableTypes,
    availableDistricts,
    filteredColleges,
    filteredBranches,
  };
}
