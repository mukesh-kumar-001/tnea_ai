import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime, i as Slot } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { O as MapPin, P as House, Q as ChevronRight, R as GraduationCap, U as Ellipsis, f as Star, lt as ArrowLeft, n as Wallet, o as TriangleAlert, ot as Award, p as Sparkles, r as Users, rt as Building2 } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, c as StaggerContainer, i as Card, l as StaggerItem, n as AppShell, o as EngineeringBg, s as EngineeringDivider, t as AnimatedSection, u as cn } from "./engineering-bg-ctUu3zKI.mjs";
import { t as Badge } from "./badge-BtxIwoCa.mjs";
import { t as SearchableSelect } from "./searchable-select-D50QptRV.mjs";
import { a as useCutoffs, n as useAllColleges } from "./api-DrPEd7dX.mjs";
import { t as Route } from "./colleges._code-BuSaD372.mjs";
import { t as Skeleton } from "./skeleton-BHBBvnR3.mjs";
import { n as StatCard } from "./stat-card-XlNR8un_.mjs";
import { t as Label } from "./label-Bih1Xe_h.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { a as CartesianGrid, c as Legend, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/colleges._code-BbVzraF2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Breadcrumb = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	ref,
	"aria-label": "breadcrumb",
	...props
}));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
	ref,
	className: cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className),
	...props
}));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	className: cn("inline-flex items-center gap-1.5", className),
	...props
}));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = import_react.forwardRef(({ asChild, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "a", {
		ref,
		className: cn("transition-colors hover:text-foreground", className),
		...props
	});
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	ref,
	role: "link",
	"aria-disabled": "true",
	"aria-current": "page",
	className: cn("font-normal text-foreground", className),
	...props
}));
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	role: "presentation",
	"aria-hidden": "true",
	className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className),
	...props,
	children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More"
	})]
});
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
function Detail() {
	const { code } = Route.useParams();
	const [community, setCommunity] = (0, import_react.useState)("");
	const [branch, setBranch] = (0, import_react.useState)("");
	const { data: allColleges = [], isLoading: loadingColleges, error: fetchError } = useAllColleges();
	const matchedCollege = (0, import_react.useMemo)(() => {
		if (!allColleges.length) return null;
		return allColleges.find((x) => x.code === code || String(x.id) === code);
	}, [allColleges, code]);
	const { data: cutoffsResponse, isLoading: loadingCutoffs } = useCutoffs({
		college_code: matchedCollege ? matchedCollege.code : "",
		category: community || "OC",
		per_page: 500
	});
	const loading = loadingColleges;
	const error = fetchError ? fetchError instanceof Error ? fetchError.message : String(fetchError) : null;
	const college = (0, import_react.useMemo)(() => {
		if (!matchedCollege) return null;
		const c = matchedCollege;
		const liveCutoffs = (cutoffsResponse?.data || []).map((ct) => ({
			year: ct.year,
			branch: ct.branch_name,
			community: ct.category,
			cutoff: ct.cutoff_mark && ct.cutoff_mark <= 200 ? ct.cutoff_mark : null
		}));
		const liveBranches = Array.from(new Set(liveCutoffs.map((ct) => ct.branch)));
		const branches = Array.from(/* @__PURE__ */ new Set([...c.branches, ...liveBranches]));
		return {
			...c,
			branches,
			cutoffs: liveCutoffs.length > 0 ? liveCutoffs : c.cutoffs
		};
	}, [matchedCollege, cutoffsResponse]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12 w-full overflow-hidden",
		"aria-busy": "true",
		"aria-label": "Loading college profile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48 mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-start gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-24 rounded-2xl shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-24" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-3/4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-xl" }, i))
			})
		]
	}) });
	if (error || !college) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-24 text-center flex flex-col items-center w-full overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive mb-6 border border-destructive/20 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "College Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted-foreground max-w-sm",
				children: [
					"The requested college code [",
					code,
					"] does not match any entry in the active database."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/colleges",
				className: "inline-flex items-center gap-2 mt-8 text-sm font-semibold hover:text-primary transition-colors bg-muted/50 px-4 py-2 rounded-lg border border-border/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to Database"]
			})
		] })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border/60 bg-surface overflow-hidden w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
			variant: "grid",
			className: "absolute inset-0 opacity-40 dark:opacity-20"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-10 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					direction: "none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BreadcrumbList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbLink, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "font-mono text-xs uppercase",
								children: "HOME"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbLink, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/colleges",
								className: "font-mono text-xs uppercase",
								children: "COLLEGES"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbPage, {
							className: "font-mono text-xs uppercase text-primary font-bold",
							children: college.shortName
						}) })
					] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
					className: "mt-8 flex flex-col md:flex-row md:items-start gap-6 lg:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative grid size-20 md:size-24 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elegant border border-primary-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-10 md:size-12" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2.5 mb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "font-mono text-[10px] bg-background/80 border-border/80",
										children: ["Code: ", college.code]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-success/15 text-success hover:bg-success/15 border border-success/20 text-[10px] font-bold",
										children: ["NAAC ", college.naac]
									}),
									college.nba && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] font-medium border-border/80",
										children: "NBA Accredited"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] font-medium border-border/80",
										children: college.type
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight",
								children: college.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-3 text-muted-foreground text-sm font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: college.address
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
					delay: .2,
					className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" }),
							label: "Placement",
							value: college.placementPercentage != null ? college.placementPercentage : "Not available",
							suffix: college.placementPercentage != null ? "%" : "",
							countUp: college.placementPercentage != null
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" }),
							label: "Highest Package",
							value: college.highestPackage != null ? `₹${college.highestPackage}L` : "Not available",
							countUp: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-5" }),
							label: "Avg Package",
							value: college.averagePackage != null ? `₹${college.averagePackage}L` : "Not available",
							countUp: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
							label: "Fees / Yr",
							value: college.fees != null ? `₹${(college.fees / 1e3).toFixed(0)}k` : "Not available",
							countUp: false
						})
					]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page py-12 w-full overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "overview",
			className: "w-full max-w-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
				delay: .3,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-x-auto pb-2 no-scrollbar mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "h-auto p-1 bg-muted/30 border border-border/60 rounded-xl inline-flex min-w-max md:min-w-0 flex-nowrap whitespace-nowrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "overview",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Overview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "courses",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Courses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cutoffs",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Cutoffs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "placements",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Placements"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "fees",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Fees"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "scholarships",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Scholarships"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "facilities",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Facilities"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "recruiters",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide",
								children: "Recruiters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "ai",
								className: "rounded-lg text-xs font-semibold px-4 py-2 uppercase tracking-wide text-primary",
								children: "AI Summary"
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-[400px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "overview",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "INFO",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-4",
										children: "College Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground leading-relaxed text-base",
										children: college.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "my-8" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 md:grid-cols-4 gap-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
												label: "Established",
												value: String(college.established),
												mono: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
												label: "Category",
												value: college.type
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
												label: "Location",
												value: college.district
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
												label: "Accreditation",
												value: `NAAC ${college.naac}${college.nba ? " · NBA" : ""}`
											})
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "courses",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "COURSES",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-6",
										children: "Courses Offered"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
										className: "grid sm:grid-cols-2 gap-4",
										children: college.branches && college.branches.length > 0 ? college.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 border border-border/60 rounded-xl hover:border-primary/40 hover:bg-muted/30 transition-all group card-hover-lift bg-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-sm text-foreground group-hover:text-primary transition-colors",
												children: b
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] font-mono text-muted-foreground mt-2 uppercase tracking-wide",
												children: "B.E. / B.Tech · 4 Years"
											})]
										}) }, b)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground p-4",
											children: "Not available"
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "cutoffs",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CutoffTab, {
								college,
								community,
								setCommunity,
								branch,
								setBranch
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "placements",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "PLACEMENTS",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-8",
										children: "Placement Statistics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-3 gap-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-6" }),
												label: "Total Placement Rate",
												value: college.placementPercentage != null ? college.placementPercentage : "Not available",
												suffix: college.placementPercentage != null ? "%" : "",
												countUp: college.placementPercentage != null,
												className: "h-full"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-6" }),
												label: "Highest Package Offered",
												value: college.highestPackage != null ? `₹${college.highestPackage}LPA` : "Not available",
												className: "h-full",
												countUp: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-6" }),
												label: "Average Package",
												value: college.averagePackage != null ? `₹${college.averagePackage}LPA` : "Not available",
												className: "h-full",
												countUp: false
											})
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "fees",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "FEES",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-8",
										children: "Fee Structure"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-2 gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-xl border border-border/60 bg-card relative overflow-hidden group",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-20" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "technical-label mb-2",
													children: "Annual Tuition Fees"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-4xl font-extrabold tracking-tight font-mono",
													children: college.fees != null ? `₹${college.fees.toLocaleString("en-IN")}` : "Not available"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-4 text-xs font-medium text-muted-foreground uppercase tracking-widest",
													children: college.fees != null ? "Base fee structure" : "Fee data not provided"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-xl border border-border/60 bg-card relative overflow-hidden group",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-20" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "technical-label mb-2 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5" }), " Hostel Accommodation"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-4xl font-extrabold tracking-tight font-mono text-balance",
													children: college.hostel && college.hostelFees != null ? `₹${college.hostelFees.toLocaleString("en-IN")}` : college.hostel ? "Available" : "Not available"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-4 text-xs font-medium text-muted-foreground uppercase tracking-widest",
													children: college.hostel ? college.hostelFees != null ? "Per year (mess charges extra)" : "Hostel facility available, fees not specified" : "Hostel facility not available"
												})
											]
										})]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "scholarships",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "SCHOLARSHIPS",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-6",
										children: "Financial Assistance & Scholarships"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
										className: "grid sm:grid-cols-2 gap-4",
										children: college.scholarships && college.scholarships.length > 0 ? college.scholarships.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 border border-border/60 rounded-xl text-sm hover:border-primary/40 hover:bg-muted/30 transition-colors bg-card font-medium flex items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-1.5 rounded-full bg-primary/60 shrink-0" }),
												" ",
												s
											]
										}) }, s)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground p-4",
											children: "Not available"
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "facilities",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "FACILITIES",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold mb-6",
										children: "Campus Infrastructure"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
										className: "flex flex-wrap gap-2.5",
										children: college.facilities && college.facilities.length > 0 ? college.facilities.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											className: "py-2 px-4 text-sm bg-muted/50 border border-border/60 hover:bg-muted font-medium",
											children: f
										}) }, f)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground p-4",
											children: "Not available"
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "recruiters",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
										label: "RECRUITERS",
										className: "mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-xl font-bold mb-6 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-primary" }), " Corporate Partners"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
										className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
										children: college.recruiters && college.recruiters.length > 0 ? college.recruiters.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 h-full border border-border/60 rounded-xl flex items-center justify-center text-center font-bold text-sm hover:border-primary/40 hover:bg-muted/30 transition-colors bg-card card-hover-lift",
											children: r
										}) }, r)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground p-4 col-span-full",
											children: "Not available"
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "ai",
						className: "mt-0 focus-visible:outline-none focus-visible:ring-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
							direction: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 md:p-8 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden shadow-glow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
									variant: "dots",
									className: "absolute inset-0 opacity-40 mix-blend-overlay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
											label: "AI SUMMARY",
											className: "mb-4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-primary font-bold mb-6 text-xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }), " Smart College Summary"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "leading-relaxed text-base text-foreground/90 font-medium max-w-4xl",
											children: [
												college.shortName,
												" is a ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: college.type.toLowerCase()
												}),
												" institution in ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: college.district
												}),
												" with a",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground",
													children: ["NAAC ", college.naac]
												}),
												" grade. It reports a ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground",
													children: [college.placementPercentage, "% placement rate"]
												}),
												" ",
												"with an average package of ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground font-mono",
													children: [
														"₹",
														college.averagePackage,
														" LPA"
													]
												}),
												" and a highest of ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground font-mono",
													children: [
														"₹",
														college.highestPackage,
														" LPA"
													]
												}),
												". Fees are around ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground font-mono",
													children: [
														"₹",
														(college.fees / 1e3).toFixed(0),
														"k per year"
													]
												}),
												college.hostel ? " with hostel facilities" : "",
												". Its top branches include ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: college.branches.slice(0, 3).join(", ")
												}),
												". This college is a",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: college.placementPercentage >= 95 ? "text-amber-500" : college.placementPercentage >= 88 ? "text-primary" : "text-emerald-500",
													children: college.placementPercentage >= 95 ? "Dream" : college.placementPercentage >= 88 ? "Target" : "Safe"
												}),
												" ",
												"option for aspirants with matching cutoff ranges."
											]
										})
									]
								})]
							})
						})
					})
				]
			})]
		})
	})] });
}
var CutoffTab = import_react.memo(({ college, community, setCommunity, branch, setBranch }) => {
	const allBranches = (0, import_react.useMemo)(() => {
		if (college.branches && college.branches.length > 0) return college.branches;
		return Array.from(new Set((college.cutoffs || []).map((c) => c.branch)));
	}, [college]);
	const displayBranches = (0, import_react.useMemo)(() => branch === "any" ? allBranches : [branch], [branch, allBranches]);
	const chartData = (0, import_react.useMemo)(() => {
		return Array.from(new Set((college.cutoffs || []).map((c) => c.year))).sort().map((year) => {
			const row = { year };
			for (const b of displayBranches) {
				const c = (college.cutoffs || []).find((x) => x.year === year && x.branch === b && x.community === community);
				if (c) row[b] = c.cutoff;
			}
			return row;
		});
	}, [
		college,
		displayBranches,
		community
	]);
	const colors = [
		"var(--color-primary)",
		"var(--color-success)",
		"var(--color-warning)",
		"var(--color-destructive)",
		"var(--color-chart-5)"
	];
	const yDomain = (0, import_react.useMemo)(() => {
		let min = 200;
		let max = 0;
		chartData.forEach((row) => {
			displayBranches.forEach((b) => {
				const val = row[b];
				if (typeof val === "number") {
					if (val < min) min = val;
					if (val > max) max = val;
				}
			});
		});
		return [Math.max(0, Math.floor(min) - 1), Math.min(200, Math.ceil(max) + 1)];
	}, [chartData, displayBranches]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/60 backdrop-blur w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
				label: "CUTOFFS",
				className: "mb-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-6 mb-8 bg-muted/20 p-4 rounded-xl border border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "technical-label block mb-2",
					children: "Community Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
					value: community,
					onValueChange: setCommunity,
					options: [...[
						"OC",
						"BC",
						"BCM",
						"MBC",
						"SC",
						"SCA",
						"ST"
					].map((c) => ({
						value: c,
						label: c
					}))],
					placeholder: "Select Community",
					searchPlaceholder: "Search community...",
					className: "font-mono"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "technical-label block mb-2",
					children: "Course / Branch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
					value: branch,
					onValueChange: setBranch,
					options: [{
						value: "any",
						label: "Compare All Branches"
					}, ...allBranches.map((b) => ({
						value: b,
						label: b
					}))],
					placeholder: "Select Branch",
					searchPlaceholder: "Search branches...",
					className: "font-mono"
				})] })]
			}),
			!community || !branch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[400px] flex items-center justify-center border border-dashed border-border/60 rounded-xl bg-muted/20 text-muted-foreground text-sm font-medium",
				children: "Please select both a Community Category and a Course / Branch to view the cutoff trajectory."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-bold",
					children: [
						"Cutoff Trends (",
						community,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "See how cutoffs have changed over the years."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 bg-muted/40 p-2 rounded-lg border border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "technical-label",
						children: "Y-Axis Range:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-xs font-bold bg-background px-2 py-1 rounded border border-border/60",
						children: [
							yDomain[0],
							" — ",
							yDomain[1]
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[400px] w-full font-mono text-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chartData,
						margin: {
							top: 10,
							right: 10,
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
								stroke: "var(--color-muted-foreground)",
								axisLine: false,
								tickLine: false,
								dy: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: yDomain,
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
									boxShadow: "var(--shadow-md)",
									fontFamily: "var(--font-mono)"
								},
								itemStyle: {
									fontSize: "13px",
									fontWeight: 600
								},
								labelStyle: {
									color: "var(--color-muted-foreground)",
									marginBottom: "8px",
									fontSize: "11px",
									textTransform: "uppercase",
									letterSpacing: "0.05em"
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
							displayBranches.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: b,
								stroke: colors[i % colors.length],
								strokeWidth: 3,
								dot: {
									r: 4,
									strokeWidth: 2,
									fill: "var(--color-background)"
								},
								activeDot: {
									r: 6,
									strokeWidth: 0
								},
								animationDuration: 1500,
								animationEasing: "ease-out"
							}, b))
						]
					})
				})
			})] })
		]
	});
});
function InfoBlock({ label, value, mono = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 rounded-xl bg-muted/40 border border-border/40 hover:bg-muted/60 transition-colors w-full overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "technical-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-sm font-semibold mt-1.5 truncate ${mono ? "font-mono" : ""}`,
			children: value
		})]
	});
}
//#endregion
export { Detail as component };
