import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-cascading-filters-RuJeq6ZA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useCascadingFilters({ allColleges, allBranches, selectedCollegeType, selectedDistrict, selectedCollegeCode, selectedBranchName }) {
	const availableTypes = (0, import_react.useMemo)(() => {
		if (!allColleges) return [];
		return Array.from(new Set(allColleges.map((c) => c.type))).filter(Boolean).sort();
	}, [allColleges]);
	const availableDistricts = (0, import_react.useMemo)(() => {
		if (!allColleges) return [];
		let result = allColleges;
		if (selectedCollegeType && selectedCollegeType !== "any") result = result.filter((c) => c.type === selectedCollegeType);
		return Array.from(new Set(result.map((c) => c.district))).filter(Boolean).sort();
	}, [allColleges, selectedCollegeType]);
	const filteredColleges = (0, import_react.useMemo)(() => {
		if (!allColleges) return [];
		let result = allColleges;
		if (selectedCollegeType && selectedCollegeType !== "any") result = result.filter((c) => c.type === selectedCollegeType);
		if (selectedDistrict && selectedDistrict !== "any") result = result.filter((c) => c.district === selectedDistrict);
		if (selectedBranchName && selectedBranchName !== "any") result = result.filter((college) => college.branches?.includes(selectedBranchName));
		return [...result].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
	}, [
		allColleges,
		selectedCollegeType,
		selectedDistrict,
		selectedBranchName
	]);
	return {
		availableTypes,
		availableDistricts,
		filteredColleges,
		filteredBranches: (0, import_react.useMemo)(() => {
			if (!allBranches) return [];
			const uniqueNames = /* @__PURE__ */ new Set();
			if (selectedCollegeCode && selectedCollegeCode !== "any" && allColleges) {
				const college = allColleges.find((c) => c.code === selectedCollegeCode);
				if (college) return allBranches.filter((branch) => {
					if (!college.branches || !college.branches.includes(branch.name)) return false;
					if (uniqueNames.has(branch.name)) return false;
					uniqueNames.add(branch.name);
					return true;
				});
			}
			if (!allColleges) return allBranches;
			const availableBranchNames = /* @__PURE__ */ new Set();
			filteredColleges.forEach((c) => {
				c.branches?.forEach((b) => availableBranchNames.add(b));
			});
			return allBranches.filter((b) => {
				if (!availableBranchNames.has(b.name)) return false;
				if (uniqueNames.has(b.name)) return false;
				uniqueNames.add(b.name);
				return true;
			});
		}, [
			allBranches,
			allColleges,
			selectedCollegeCode,
			filteredColleges
		])
	};
}
//#endregion
export { useCascadingFilters as t };
