import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-cascading-filters-cazMmUgq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useCascadingFilters({ allColleges, allBranches, selectedCollegeCode, selectedBranchName }) {
	return {
		filteredColleges: (0, import_react.useMemo)(() => {
			if (!allColleges) return [];
			if (!selectedBranchName || selectedBranchName === "any") return allColleges;
			return allColleges.filter((college) => college.branches.includes(selectedBranchName));
		}, [allColleges, selectedBranchName]),
		filteredBranches: (0, import_react.useMemo)(() => {
			if (!allBranches) return [];
			if (!selectedCollegeCode || selectedCollegeCode === "any" || !allColleges) return allBranches;
			const college = allColleges.find((c) => c.code === selectedCollegeCode);
			if (!college) return allBranches;
			return allBranches.filter((branch) => college.branches.includes(branch.name));
		}, [
			allBranches,
			allColleges,
			selectedCollegeCode
		])
	};
}
//#endregion
export { useCascadingFilters as t };
