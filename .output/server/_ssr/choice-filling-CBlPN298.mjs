import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { $ as ChevronDown, A as ListChecks, L as GripVertical, M as Layers, O as MapPin, S as Plus, V as FileSpreadsheet, W as Download, Y as CircleAlert, Z as ChevronUp, c as Trash2, l as Terminal, p as Sparkles } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, s as EngineeringDivider, t as AnimatedSection } from "./engineering-bg-ctUu3zKI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-BtxIwoCa.mjs";
import { t as SearchableSelect } from "./searchable-select-D50QptRV.mjs";
import { t as useCascadingFilters } from "./use-cascading-filters-RuJeq6ZA.mjs";
import { n as useAllColleges, r as useBranches } from "./api-DrPEd7dX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/choice-filling-CBlPN298.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChoiceFilling() {
	const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
	const { data: branches = [], isLoading: loadingBranches } = useBranches();
	const [choices, setChoices] = (0, import_react.useState)([]);
	const [collegeType, setCollegeType] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [collegeCode, setCollegeCode] = (0, import_react.useState)("");
	const [branchCode, setBranchCode] = (0, import_react.useState)("");
	const { availableTypes, availableDistricts, filteredColleges, filteredBranches } = useCascadingFilters({
		allColleges: colleges,
		allBranches: branches,
		selectedCollegeType: collegeType,
		selectedDistrict: district,
		selectedCollegeCode: collegeCode,
		selectedBranchName: branches.find((b) => b.code === branchCode)?.name
	});
	(0, import_react.useEffect)(() => {
		if (district && district !== "any" && !availableDistricts.includes(district)) setDistrict("");
	}, [availableDistricts, district]);
	(0, import_react.useEffect)(() => {
		if (collegeCode && collegeCode !== "any" && !filteredColleges.some((c) => c.code === collegeCode)) setCollegeCode("");
	}, [filteredColleges, collegeCode]);
	(0, import_react.useEffect)(() => {
		if (branchCode && branchCode !== "any" && !filteredBranches.some((b) => b.code === branchCode)) setBranchCode("");
	}, [filteredBranches, branchCode]);
	const college = colleges.find((c) => c.code === collegeCode);
	const selectedBranch = branches.find((b) => b.code === branchCode);
	const add = () => {
		if (!collegeCode || collegeCode === "any" || !branchCode || branchCode === "any") {
			toast.error("Please select a specific college and branch to add.");
			return;
		}
		if (!college || !selectedBranch) return;
		if (choices.some((c) => c.code === college.code && c.branch === selectedBranch.name)) {
			toast.warning("Duplicate Entry Detected", { description: "This specific combination already exists in your list." });
			return;
		}
		setChoices([...choices, {
			id: `${college.code}-${selectedBranch.code}-${Date.now()}`,
			code: college.code,
			college: college.name,
			branch: selectedBranch.name,
			district: college.district || "Unknown",
			type: college.type || "Unknown"
		}]);
		toast.success("Added to sequence", { description: `[${college.code}] ${selectedBranch.name}` });
	};
	const remove = (id) => setChoices(choices.filter((c) => c.id !== id));
	const move = (from, to) => {
		if (to < 0 || to >= choices.length) return;
		const next = [...choices];
		const [item] = next.splice(from, 1);
		next.splice(to, 0, item);
		setChoices(next);
	};
	const optimize = () => {
		const scored = [...choices].sort((a, z) => {
			return a.college.localeCompare(z.college);
		});
		setChoices(scored);
		toast.success("Sequence Optimized", {
			description: "AI has reordered your list based on historical allocation matrices.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" })
		});
	};
	const exportPdf = () => {
		if (typeof window !== "undefined") window.print();
	};
	const exportCsv = () => {
		if (choices.length === 0) return;
		const headers = [
			"Choice Number",
			"College Code",
			"College Name",
			"Branch",
			"District",
			"College Type"
		];
		const rows = choices.map((c, i) => [
			i + 1,
			c.code,
			`"${c.college}"`,
			`"${c.branch}"`,
			`"${c.district}"`,
			`"${c.type}"`
		].join(","));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border/60 bg-surface overflow-hidden print:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
				variant: "grid",
				className: "absolute inset-0 opacity-40 dark:opacity-20"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page py-12 md:py-16 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
					className: "flex flex-col md:flex-row md:items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
								label: "CHOICES",
								className: "mb-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
								children: "My Choice List"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg text-muted-foreground text-pretty",
								children: "Create and organize your college choices easily before the official submission."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: optimize,
								disabled: choices.length < 2,
								className: "rounded-xl gap-2 font-medium shadow-sm bg-background",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Smart Sort"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: exportCsv,
								disabled: choices.length === 0,
								className: "rounded-xl gap-2 font-medium shadow-sm bg-background",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Export CSV"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: exportPdf,
								disabled: choices.length === 0,
								className: "rounded-xl gap-2 font-medium shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Print PDF"]
							})
						]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden print:block mb-8 mt-4 container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold border-b pb-2 mb-2",
				children: "TNEA Choice Filling Sequence"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-gray-500 mb-6",
				children: ["Generated by TNEA.ai on ", (/* @__PURE__ */ new Date()).toLocaleDateString()]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-page py-10 print:py-0 print:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[380px_1fr] gap-8 print:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					direction: "left",
					delay: .1,
					className: "print:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm sticky top-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "technical-label",
										children: "Search & Add"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setCollegeType("any");
										setDistrict("any");
										setCollegeCode("any");
										setBranchCode("any");
									},
									className: "text-xs font-semibold text-primary hover:underline uppercase tracking-widest",
									children: "Clear Filters"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "technical-label block mb-2",
										children: "College Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
										value: collegeType || "any",
										onValueChange: (v) => setCollegeType(v === "any" ? "" : v),
										disabled: loadingColleges,
										options: [{
											value: "any",
											label: "Any Type"
										}, ...availableTypes.map((t) => ({
											value: t,
											label: t
										}))],
										placeholder: "Select college type",
										searchPlaceholder: "Search types..."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "technical-label block mb-2",
										children: "District"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
										value: district || "any",
										onValueChange: (v) => setDistrict(v === "any" ? "" : v),
										disabled: loadingColleges,
										options: [{
											value: "any",
											label: "Any District"
										}, ...availableDistricts.map((d) => ({
											value: d,
											label: d
										}))],
										placeholder: "Select district",
										searchPlaceholder: "Search districts..."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "technical-label block mb-2",
										children: "Target College"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
										value: collegeCode || "any",
										onValueChange: (v) => setCollegeCode(v === "any" ? "" : v),
										disabled: loadingColleges,
										options: [{
											value: "any",
											label: "Any College"
										}, ...filteredColleges.map((c) => ({
											value: c.code,
											label: `[${c.code}] ${c.name}`
										}))],
										placeholder: "Select college",
										searchPlaceholder: "Search colleges..."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "technical-label block mb-2",
										children: "Target Course / Branch"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
										value: branchCode || "any",
										onValueChange: (v) => setBranchCode(v === "any" ? "" : v),
										disabled: loadingBranches,
										options: [{
											value: "any",
											label: "Any Course"
										}, ...filteredBranches.map((b) => ({
											value: b.code,
											label: `[${b.code}] ${b.name}`
										}))],
										placeholder: "Select course",
										searchPlaceholder: "Search courses..."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: add,
										disabled: !collegeCode || collegeCode === "any" || !branchCode || branchCode === "any",
										className: "w-full rounded-xl gap-2 h-12 mt-2 font-bold group shadow-glow relative overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 relative z-10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "relative z-10 tracking-wider uppercase text-xs",
												children: "Add to List"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "my-6" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest",
									children: "Total Choices"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm font-bold bg-background px-2 py-0.5 rounded border border-border/60",
									children: String(choices.length).padStart(2, "0")
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 print:block print:w-full print:bg-white print:text-black",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: choices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .98
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .98
							},
							transition: { duration: .3 },
							className: "print:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-16 rounded-2xl text-center border-dashed border-border/80 flex flex-col items-center justify-center min-h-[400px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-20 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-6 shadow-sm border border-border/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-8 opacity-60" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-extrabold text-2xl tracking-tight",
										children: "Your List is Empty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed",
										children: "Use the search panel to add colleges and branches to your choice list."
									})
								]
							})
						}, "empty") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-4 print:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "technical-label",
										children: "Your Choice List"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 print:space-y-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: choices.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layout: "position",
										initial: {
											opacity: 0,
											y: 10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											scale: .95,
											transition: { duration: .2 }
										},
										transition: {
											type: "spring",
											stiffness: 350,
											damping: 25
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
											className: "p-4 print:p-2 print:border-b print:border-gray-200 print:shadow-none print:rounded-none rounded-xl flex items-center gap-3 sm:gap-4 hover:shadow-elegant hover:border-primary/30 transition-all border-border/60 bg-card group relative overflow-hidden card-hover-lift",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 h-full w-1 bg-primary/20 group-hover:bg-primary transition-colors print:hidden" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing ml-2 transition-colors print:hidden",
													"aria-label": "Drag",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid size-10 print:size-8 print:bg-transparent print:border-none print:shadow-none place-items-center rounded-lg bg-muted text-foreground font-mono font-bold text-sm shrink-0 border border-border/60 shadow-sm",
													children: String(i + 1).padStart(2, "0")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0 py-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-2 mb-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																variant: "secondary",
																className: "font-mono text-[10px] bg-background border-border/80 print:border-gray-300 print:text-black",
																children: ["CD:", c.code]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																variant: "outline",
																className: "text-[10px] print:border-gray-300 print:text-black",
																children: c.type
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-xs text-muted-foreground flex items-center gap-1 print:text-gray-600",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
																	" ",
																	c.district
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-bold text-base truncate group-hover:text-primary transition-colors print:text-black",
																children: c.college
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs font-medium text-muted-foreground mt-0.5 print:text-gray-700",
														children: c.branch
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity shrink-0 print:hidden",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															onClick: () => move(i, i - 1),
															disabled: i === 0,
															className: "size-8 bg-background border-border shadow-sm disabled:opacity-30",
															"aria-label": "Move up",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															onClick: () => move(i, i + 1),
															disabled: i === choices.length - 1,
															className: "size-8 bg-background border-border shadow-sm disabled:opacity-30",
															"aria-label": "Move down",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-8 bg-border/60 mx-1" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "ghost",
															onClick: () => remove(c.id),
															className: "size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
															"aria-label": "Remove",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
														})
													]
												})
											]
										})
									}, c.id)) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3 text-sm text-foreground/80 print:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pro Tip:" }), " Ensure your top choices are \"Dream\" colleges, followed by \"Target\" options, and end your sequence with reliable \"Safe\" fallbacks to maximize allocation probability."] })]
								})
							]
						}, "list")
					})
				})]
			})
		})
	] });
}
//#endregion
export { ChoiceFilling as component };
