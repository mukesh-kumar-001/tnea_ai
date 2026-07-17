import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { O as MapPin, b as RotateCcw, o as TriangleAlert, rt as Building2, st as ArrowRight, t as X, v as Search, y as SearchX, z as Funnel } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, s as EngineeringDivider, t as AnimatedSection } from "./engineering-bg-ctUu3zKI.mjs";
import { t as Badge } from "./badge-BtxIwoCa.mjs";
import { n as useAllColleges, r as useBranches } from "./api-DrPEd7dX.mjs";
import { t as Skeleton } from "./skeleton-BHBBvnR3.mjs";
import { t as InlineStat } from "./stat-card-XlNR8un_.mjs";
import { t as Label } from "./label-Bih1Xe_h.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CQqkZOkQ.mjs";
import { n as Switch, t as Slider } from "./switch-CFk00866.mjs";
import { n as DISTRICTS } from "./mock-data-uQeJaK5y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/colleges.index-BFlm58GP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ANY = "any";
var CollegeCard = import_react.memo(({ c }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-5 md:p-6 rounded-2xl card-hover-lift border-border/60 bg-card/80 backdrop-blur overflow-hidden relative group",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row md:items-start gap-5 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-14 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "font-mono text-[10px] bg-muted/60 border border-border/80",
									children: ["CD:", c.code]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] font-medium border-border/80",
									children: c.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-success/15 text-success hover:bg-success/15 border border-success/20 text-[10px] font-bold",
									children: ["NAAC ", c.naac]
								}),
								c.autonomous && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "bg-primary/10 text-primary border border-primary/20 text-[10px]",
									children: "Autonomous"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-mono text-muted-foreground mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
								" ",
								c.district,
								" · Est. ",
								c.established
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "my-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
									label: "Placement",
									value: c.placementPercentage != null ? `${c.placementPercentage}%` : "Not available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
									label: "Avg Package",
									value: c.averagePackage != null ? `₹${c.averagePackage}L` : "Not available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
									label: "Highest",
									value: c.highestPackage != null ? `₹${c.highestPackage}L` : "Not available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
									label: "Fees / Yr",
									value: c.fees != null ? `₹${(c.fees / 1e3).toFixed(0)}k` : "Not available"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-1.5",
							children: [c.branches.slice(0, 4).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "font-normal text-[10px] bg-muted/40",
								children: b
							}, b)), c.branches.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "text-[10px] border-dashed border-border/80",
								children: [
									"+",
									c.branches.length - 4,
									" more"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/colleges/$code",
					params: { code: c.code },
					className: "md:self-center mt-4 md:mt-0 w-full md:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "rounded-xl gap-2 shadow-sm w-full md:w-auto group/btn",
						children: ["View Profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform group-hover/btn:translate-x-0.5" })]
					})
				})
			]
		})
	});
});
function Explorer() {
	useNavigate();
	const { data: colleges = [], isLoading: loadingColleges, error } = useAllColleges();
	const { data: branches = [], isLoading: loadingBranches } = useBranches();
	const loading = loadingColleges || loadingBranches;
	const branchOptions = (0, import_react.useMemo)(() => branches.map((b) => b.name), [branches]);
	const [q, setQ] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)(ANY);
	const [type, setType] = (0, import_react.useState)(ANY);
	const [naac, setNaac] = (0, import_react.useState)(ANY);
	const [nba, setNba] = (0, import_react.useState)(false);
	const [branch, setBranch] = (0, import_react.useState)(ANY);
	const [hostel, setHostel] = (0, import_react.useState)(false);
	const [maxFees, setMaxFees] = (0, import_react.useState)([2e5]);
	const [minPlacement, setMinPlacement] = (0, import_react.useState)([0]);
	const results = (0, import_react.useMemo)(() => {
		return colleges.filter((c) => {
			if (q && !`${c.name} ${c.code} ${c.district}`.toLowerCase().includes(q.toLowerCase())) return false;
			if (district !== ANY && c.district !== district) return false;
			if (type !== ANY && c.type !== type) return false;
			if (naac !== ANY && c.naac !== naac) return false;
			if (nba && !c.nba) return false;
			if (branch !== ANY && !c.branches.includes(branch)) return false;
			if (hostel && !c.hostel) return false;
			if (maxFees[0] < 2e5 && c.fees != null && c.fees > maxFees[0]) return false;
			if (minPlacement[0] > 0 && c.placementPercentage != null && c.placementPercentage < minPlacement[0]) return false;
			return true;
		});
	}, [
		colleges,
		q,
		district,
		type,
		naac,
		nba,
		branch,
		hostel,
		maxFees,
		minPlacement
	]);
	const clearAll = (0, import_react.useCallback)(() => {
		setQ("");
		setDistrict(ANY);
		setType(ANY);
		setNaac(ANY);
		setNba(false);
		setBranch(ANY);
		setHostel(false);
		setMaxFees([2e5]);
		setMinPlacement([0]);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border/60 bg-surface-muted/40 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
			variant: "grid",
			className: "absolute inset-0 opacity-40 dark:opacity-20"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-16 md:py-20 relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
				className: "max-w-3xl mx-auto text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
						label: "SEARCH",
						className: "justify-center mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-5xl font-extrabold tracking-tight text-balance",
						children: "Search Colleges"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto",
						children: "Find the perfect engineering college in Tamil Nadu with filters for placement, fees, and NAAC grade."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
				delay: .2,
				className: "mt-10 relative max-w-2xl mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center bg-card rounded-xl border border-border/60 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-primary/50 overflow-hidden h-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 ml-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search by college name, code, or city...",
								className: "flex-1 bg-transparent px-4 py-3 outline-none text-base font-medium"
							}),
							q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQ(""),
								className: "mr-3 p-1.5 rounded-md hover:bg-muted text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					})]
				})
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between lg:hidden mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold text-lg",
				children: "College List"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => document.getElementById("mobile-filters")?.classList.toggle("hidden"),
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4" }), " Filters"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[280px_1fr] gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				id: "mobile-filters",
				className: "hidden lg:block space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin z-10 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-2xl border-border/60 shadow-sm bg-card/80 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 border-b border-border/60 bg-muted/20 sticky top-0 z-20 backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4 text-primary" }), " FILTERS"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: clearAll,
								className: "text-[10px] uppercase font-bold tracking-wider h-7 text-muted-foreground hover:text-foreground",
								children: "Reset"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
								label: "District",
								value: district,
								onChange: setDistrict,
								options: DISTRICTS,
								anyLabel: "Any District"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
								label: "College Type",
								value: type,
								onChange: setType,
								options: [
									"Government",
									"Aided",
									"Self-Financing"
								],
								anyLabel: "Any Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
								label: "NAAC Grade",
								value: naac,
								onChange: setNaac,
								options: [
									"A++",
									"A+",
									"A",
									"B++",
									"B+",
									"B"
								],
								anyLabel: "Any Grade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
								label: "Branch",
								value: branch,
								onChange: setBranch,
								options: branchOptions,
								anyLabel: "Any Branch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "technical-label",
								children: "Max Annual Fees"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 2e4,
									max: 2e5,
									step: 5e3,
									value: maxFees,
									onValueChange: (v) => setMaxFees(v),
									className: "flex-1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-mono font-medium min-w-[3rem] text-right",
									children: [
										"₹",
										(maxFees[0] / 1e3).toFixed(0),
										"k"
									]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "technical-label",
								children: "Min Placement %"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 100,
									step: 5,
									value: minPlacement,
									onValueChange: (v) => setMinPlacement(v),
									className: "flex-1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-mono font-medium min-w-[3rem] text-right",
									children: [minPlacement[0], "%"]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nba",
									className: "text-sm font-medium",
									children: "NBA Accredited"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "nba",
									checked: nba,
									onCheckedChange: setNba
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "hostel",
									className: "text-sm font-medium",
									children: "Hostel Available"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "hostel",
									checked: hostel,
									onCheckedChange: setHostel
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "w-full font-bold gap-2",
								onClick: clearAll,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Clear Filters"]
							})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					"aria-busy": "true",
					"aria-label": "Loading colleges",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6 rounded-2xl border-border/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-14 rounded-xl shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-3/4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-4 gap-4 pt-4 mt-2 border-t border-border/40",
										children: Array.from({ length: 4 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-16 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-12" })] }, j))
									})
								]
							})]
						})
					}, i))
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-10 rounded-2xl text-center border-destructive/30 bg-destructive/5 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive mb-4 shadow-sm border border-destructive/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-foreground font-bold text-lg",
							children: "System Error"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground mt-2 max-w-sm",
							children: ["Failed to connect to the college database. ", error instanceof Error ? error.message : "Unknown connection error."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-6",
							onClick: () => window.location.reload(),
							children: "Retry Connection"
						})
					]
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-success" })]
							}),
							"Query returned ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground font-mono",
								children: results.length
							}),
							" records"
						]
					})
				}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-16 rounded-2xl text-center flex flex-col items-center border-dashed border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-16 place-items-center rounded-2xl bg-muted/50 text-muted-foreground mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-lg",
							children: "0 matches found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 max-w-md",
							children: "No engineering colleges match the current filter parameters. Try expanding your search criteria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: clearAll,
							className: "mt-6 shadow-sm",
							children: "Clear Filters"
						})
					]
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5",
					children: results.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollegeCard, { c }, c.code))
				})] })
			})]
		})]
	})] });
}
function FilterSelect({ label, value, onChange, options, anyLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		className: "technical-label block mb-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: (val) => onChange(val === ANY ? ANY : val),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className: "h-10 rounded-lg bg-background shadow-sm border-border/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: `Select ${label.toLowerCase()}` })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: ANY,
			className: "font-medium",
			children: anyLabel
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: o,
			children: o
		}, o))] })]
	})] });
}
//#endregion
export { Explorer as component };
