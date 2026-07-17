import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { G as Database, W as Download, Y as CircleAlert, k as LoaderCircle, tt as ChartLine } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, t as AnimatedSection } from "./engineering-bg-ctUu3zKI.mjs";
import { t as SearchableSelect } from "./searchable-select-D50QptRV.mjs";
import { t as useCascadingFilters } from "./use-cascading-filters-RuJeq6ZA.mjs";
import { a as useCutoffs, n as useAllColleges, r as useBranches } from "./api-DrPEd7dX.mjs";
import { t as Label } from "./label-Bih1Xe_h.mjs";
import { a as CartesianGrid, c as Legend, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
import { t as COMMUNITIES } from "./mock-data-uQeJaK5y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cutoffs-On-A2jEh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cutoffs() {
	const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
	const { data: branches = [], isLoading: loadingBranches } = useBranches();
	const [collegeCode, setCollegeCode] = (0, import_react.useState)("Any");
	const [branchCode, setBranchCode] = (0, import_react.useState)("Any");
	const [community, setCommunity] = (0, import_react.useState)("Any");
	const { data: cutoffsResponse, isLoading: loadingCutoffs } = useCutoffs({
		college_code: collegeCode === "Any" ? "" : collegeCode,
		per_page: 5e3
	});
	const { filteredColleges, filteredBranches: baseFilteredBranches } = useCascadingFilters({
		allColleges: colleges,
		allBranches: branches,
		selectedCollegeCode: collegeCode === "Any" ? "" : collegeCode,
		selectedBranchName: branchCode === "Any" ? "" : branches.find((b) => b.code === branchCode)?.name
	});
	const filteredBranches = (0, import_react.useMemo)(() => {
		if (collegeCode === "Any") return baseFilteredBranches;
		const branchMap = new Map(baseFilteredBranches.map((b) => [b.code, b]));
		if (cutoffsResponse?.data) cutoffsResponse.data.forEach((r) => {
			if (!branchMap.has(r.branch_code)) branchMap.set(r.branch_code, {
				code: r.branch_code,
				name: r.branch_name
			});
		});
		return Array.from(branchMap.values()).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		baseFilteredBranches,
		cutoffsResponse,
		collegeCode
	]);
	(0, import_react.useEffect)(() => {
		if (collegeCode !== "Any" && filteredColleges.length > 0 && !filteredColleges.find((c) => c.code === collegeCode)) setCollegeCode("Any");
	}, [filteredColleges, collegeCode]);
	(0, import_react.useEffect)(() => {
		if (branchCode !== "Any" && filteredBranches.length > 0 && !filteredBranches.find((b) => b.code === branchCode)) setBranchCode("Any");
	}, [filteredBranches, branchCode]);
	const data = (0, import_react.useMemo)(() => {
		if (!cutoffsResponse?.data) return [];
		const filtered = cutoffsResponse.data.filter((r) => {
			const matchBranch = branchCode === "Any" || r.branch_code === branchCode;
			const matchCategory = community === "Any" || r.category === community;
			return matchBranch && matchCategory;
		});
		const yearMap = /* @__PURE__ */ new Map();
		for (const r of filtered) {
			if (!yearMap.has(r.year)) yearMap.set(r.year, []);
			if (r.cutoff_mark) yearMap.get(r.year).push(r.cutoff_mark);
		}
		return Array.from(yearMap.entries()).map(([year, cutoffs]) => ({
			year: Number(year),
			cutoff: cutoffs.length ? cutoffs.reduce((a, b) => a + b, 0) / cutoffs.length : 0
		})).filter((d) => d.cutoff > 0).sort((a, z) => a.year - z.year);
	}, [
		cutoffsResponse,
		branchCode,
		community
	]);
	const yDomain = (0, import_react.useMemo)(() => {
		if (data.length === 0) return [150, 200];
		let min = 200;
		let max = 0;
		data.forEach((d) => {
			if (d.cutoff < min) min = d.cutoff;
			if (d.cutoff > max) max = d.cutoff;
		});
		return [Math.max(0, Math.floor(min) - 2), Math.min(200, Math.ceil(max) + 2)];
	}, [data]);
	const exportCsv = () => {
		if (!data.length) return;
		const csvString = [["Year", "Cutoff Mark"].join(","), ...data.map((d) => `${d.year},${d.cutoff.toFixed(2)}`)].join("\n");
		const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `cutoffs_${collegeCode}_${branchCode}_${community}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const selectedCollege = colleges.find((c) => c.code === collegeCode);
	const selectedBranch = branches.find((b) => b.code === branchCode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border/60 bg-surface-muted/40 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
			variant: "grid",
			className: "absolute inset-0 opacity-40 dark:opacity-20"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page py-16 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
						label: "HISTORY",
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
						children: "Cutoff Trends"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground text-pretty",
						children: "See how cutoffs have changed over the years for different colleges and branches."
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
			direction: "up",
			delay: .1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "technical-label",
							children: "Filters"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setCollegeCode("Any");
							setBranchCode("Any");
							setCommunity("Any");
						},
						className: "text-xs font-semibold text-primary hover:underline uppercase tracking-widest",
						children: "Clear Filters"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-3 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "technical-label block mb-2",
							children: "College"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
							value: collegeCode,
							onValueChange: setCollegeCode,
							disabled: loadingColleges,
							options: [{
								value: "Any",
								label: "Any College"
							}, ...filteredColleges.map((c) => ({
								value: c.code,
								label: `[${c.code}] ${c.name}`
							}))],
							placeholder: "Select college",
							searchPlaceholder: "Search colleges..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "technical-label block mb-2",
							children: "Course / Branch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
							value: branchCode,
							onValueChange: setBranchCode,
							disabled: loadingBranches,
							options: [{
								value: "Any",
								label: "Any Course"
							}, ...filteredBranches.map((br) => ({
								value: br.code,
								label: br.name
							}))],
							placeholder: "Select course",
							searchPlaceholder: "Search courses..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "technical-label block mb-2",
							children: "Community Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
							value: community,
							onValueChange: setCommunity,
							options: [{
								value: "Any",
								label: "Any Community"
							}, ...COMMUNITIES.map((c) => ({
								value: c,
								label: c
							}))],
							placeholder: "Select community",
							searchPlaceholder: "Search community...",
							className: "font-mono"
						})] })
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
			direction: "up",
			delay: .2,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "size-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold tracking-tight",
							children: "Trend Analysis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground mt-1 flex flex-col md:flex-row md:items-center gap-1.5 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: selectedCollege?.shortName || "Any College"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden md:inline text-border",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: selectedBranch?.name || "Any Branch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden md:inline text-border",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono bg-muted px-1.5 py-0.5 rounded text-xs",
									children: community
								})
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 shrink-0",
						children: [!loadingCutoffs && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 bg-muted/40 p-2 rounded-lg border border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "technical-label hidden sm:block",
								children: "Y-Axis:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs font-bold bg-background px-2 py-1 rounded border border-border/60",
								children: [
									yDomain[0],
									" — ",
									yDomain[1]
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: exportCsv,
							disabled: data.length === 0,
							variant: "outline",
							className: "rounded-xl gap-2 font-medium shadow-sm h-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export CSV"]
						})]
					})]
				}), loadingCutoffs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin mb-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "technical-label",
						children: "Loading Data..."
					})]
				}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-8 mb-3 opacity-50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-foreground",
							children: "Insufficient Data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mt-1 max-w-sm",
							children: "No historical cutoff data exists for this specific combination of college, branch, and community."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[400px] w-full font-mono text-xs -ml-4 md:ml-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data,
							margin: {
								top: 20,
								right: 20,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "4 4",
									stroke: "var(--engineering-grid-color)",
									opacity: .4,
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "year",
									fontSize: 12,
									stroke: "var(--color-muted-foreground)",
									axisLine: false,
									tickLine: false,
									dy: 10
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: yDomain,
									fontSize: 12,
									stroke: "var(--color-muted-foreground)",
									axisLine: false,
									tickLine: false,
									dx: -10,
									tickFormatter: (val) => val.toFixed(1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										borderRadius: "12px",
										border: "1px solid var(--color-border)",
										backgroundColor: "var(--color-card)",
										color: "var(--color-foreground)",
										padding: "12px 16px",
										boxShadow: "var(--shadow-md)",
										fontFamily: "var(--font-mono)"
									},
									itemStyle: {
										fontSize: "14px",
										fontWeight: 700,
										color: "var(--color-primary)",
										paddingBottom: "4px"
									},
									labelStyle: {
										color: "var(--color-foreground)",
										marginBottom: "8px",
										fontSize: "11px",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										fontWeight: 600
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									wrapperStyle: {
										paddingTop: "20px",
										fontSize: "12px",
										fontFamily: "var(--font-sans)"
									},
									iconType: "circle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "cutoff",
									stroke: "var(--color-primary)",
									strokeWidth: 3,
									dot: {
										r: 5,
										strokeWidth: 2,
										fill: "var(--color-background)"
									},
									activeDot: {
										r: 7,
										strokeWidth: 0,
										fill: "var(--color-primary)"
									},
									name: "Closing Cutoff Mark",
									animationDuration: 1500,
									animationEasing: "ease-out"
								})
							]
						})
					})
				})]
			})
		})]
	})] });
}
//#endregion
export { Cutoffs as component };
