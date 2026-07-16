import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { $ as Check, S as Plus, g as Share2, st as ArrowRightLeft, t as X, w as Minus, x as Printer } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, t as AnimatedSection } from "./engineering-bg-BVrbPAIv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Xog1iefT.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BTa1Y5Px.mjs";
import { n as useAllColleges } from "./api-B18pGMTn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-Q3cI9Uf2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CompareColleges() {
	const { data: colleges = [] } = useAllColleges();
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const [collegeToAdd, setCollegeToAdd] = (0, import_react.useState)("");
	const selectedColleges = selectedIds.map((id) => colleges.find((c) => c.code === id)).filter(Boolean);
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
	const removeCollege = (id) => {
		setSelectedIds(selectedIds.filter((x) => x !== id));
	};
	const exportPdf = () => {
		window.print();
	};
	const share = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success("Link copied to clipboard");
	};
	const compareRow = (label, renderVal, isHighlighted = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid grid-cols-[160px_repeat(auto-fit,minmax(250px,1fr))] border-b border-border/40 hover:bg-muted/30 transition-colors ${isHighlighted ? "bg-primary/5" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 font-semibold text-sm technical-label flex items-center sticky left-0 bg-background/95 backdrop-blur z-10 border-r border-border/40",
			children: label
		}), selectedColleges.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 text-sm min-w-[250px] border-r border-border/20 last:border-r-0",
			children: renderVal(c)
		}, `${c.code}-${label}`))]
	});
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
								label: "DATA.COMPARE",
								className: "mb-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
								children: "Comparative Analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg text-muted-foreground text-pretty",
								children: "Evaluate up to 4 institutions side-by-side using verifiable backend data arrays to make data-driven decisions."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: share,
							variant: "outline",
							className: "rounded-xl gap-2 font-medium shadow-sm bg-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: exportPdf,
							className: "rounded-xl gap-2 font-medium shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), " Export Report"]
						})]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden print:block mb-8 mt-4 container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold border-b pb-2 mb-2",
				children: "TNEA Comparative Analysis Report"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-gray-500 mb-6",
				children: ["Generated by TNEA.ai on ", (/* @__PURE__ */ new Date()).toLocaleDateString()]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 mb-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: collegeToAdd,
							onValueChange: setCollegeToAdd,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 bg-background font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select an institution to add to comparison..." })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Any",
								className: "font-medium",
								children: "Any College"
							}), colleges.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.code,
								className: "font-medium",
								children: [
									"[",
									c.code,
									"] ",
									c.name
								]
							}, c.code))] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: addCollege,
						disabled: !collegeToAdd || collegeToAdd === "Any" || selectedIds.length >= 4,
						className: "h-12 rounded-xl gap-2 shadow-glow font-bold w-full sm:w-auto shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add to Matrix"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mt-3 font-mono",
					children: [
						"Matrix Capacity: ",
						selectedIds.length,
						" / 4 slots utilized"
					]
				})]
			}) }), selectedColleges.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-16 rounded-2xl text-center border-dashed border-border/80 flex flex-col items-center justify-center min-h-[400px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-20 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-6 shadow-sm border border-border/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "size-8 opacity-60" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-extrabold text-2xl tracking-tight",
						children: "Empty Matrix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed",
						children: "Add at least two institutions to generate a side-by-side comparative analysis report."
					})
				]
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full overflow-x-auto pb-6 scrollbar-thin rounded-2xl border border-border/60 shadow-sm bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-max",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[160px_repeat(auto-fit,minmax(250px,1fr))] border-b-2 border-border bg-muted/40 sticky top-0 z-20 backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 font-bold uppercase tracking-widest text-xs text-muted-foreground flex items-end sticky left-0 bg-muted/90 backdrop-blur z-30 border-r border-border/40",
								children: "Metrics Matrix"
							}), selectedColleges.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 relative min-w-[250px] border-r border-border/20 last:border-r-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeCollege(c.code),
										className: "absolute top-2 right-2 p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors print:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "font-mono text-[10px] mb-2",
										children: ["CD: ", c.code]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-base leading-tight text-foreground pr-6",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground mt-1",
										children: c.district
									})
								]
							}, c.code))]
						}),
						compareRow("Institution Type", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: c.type === "Government" ? "default" : "outline",
							className: "text-xs",
							children: c.type
						})),
						compareRow("Status", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: c.autonomous ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-success font-semibold flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Autonomous"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" }), " Affiliated"]
							})
						})),
						compareRow("NAAC Grade", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-bold",
							children: c.naac || "N/A"
						})),
						compareRow("Placement %", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono font-bold text-primary text-lg",
								children: [c.placementPercentage, "%"]
							})
						}), true),
						compareRow("Avg Package", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold",
							children: [
								"₹",
								c.averagePackage,
								" LPA"
							]
						}), true),
						compareRow("Highest Package", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold",
							children: [
								"₹",
								c.highestPackage,
								" LPA"
							]
						})),
						compareRow("Annual Fees", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold",
							children: [
								"₹",
								(c.fees / 1e3).toFixed(0),
								"k / year"
							]
						}), true),
						compareRow("Hostel Availability", (c) => c.hostel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-success font-semibold flex items-center gap-1 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Available"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: [
									"₹",
									(c.hostelFees / 1e3).toFixed(0),
									"k / year"
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground font-medium flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" }), " Not Available"]
						})),
						compareRow("Facilities", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: c.facilities && c.facilities.length > 0 ? c.facilities.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-[10px] font-normal",
								children: f
							}, f)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Standard"
							})
						})),
						compareRow("Programs Offered", (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin content-start items-start",
							children: c.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-sm py-1.5 px-3 h-auto whitespace-normal text-left break-words",
								children: b
							}, b))
						}))
					]
				})
			}) })]
		})
	] });
}
//#endregion
export { CompareColleges as component };
