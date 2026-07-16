import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { F as History, I as Heart, W as Download, ot as ArrowRight, p as Sparkles, rt as Bookmark } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, c as StaggerContainer, i as Card, l as StaggerItem, n as AppShell, o as EngineeringBg, s as EngineeringDivider, t as AnimatedSection } from "./engineering-bg-BVrbPAIv.mjs";
import { t as Badge } from "./badge-Xog1iefT.mjs";
import { n as useAllColleges, r as useBranches } from "./api-B18pGMTn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BmAuAonV.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { data: colleges = [], isLoading: loadingColleges } = useAllColleges();
	const { data: branches = [], isLoading: loadingBranches } = useBranches();
	const saved = colleges.slice(0, 4);
	const searches = [
		"CSE Chennai",
		"Government colleges Coimbatore",
		"PSG Tech placements",
		"Rank 1500 BC options"
	];
	const favBranches = branches.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border/60 bg-surface overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
			variant: "grid",
			className: "absolute inset-0 opacity-40 dark:opacity-20"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page py-12 md:py-16 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
						label: "USR.DASH",
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
						children: "Command Center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground text-pretty",
						children: "Your personalized workspace for managing saved institutions, tracking query history, and reviewing generated allocation matrices."
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6 lg:gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					direction: "up",
					delay: .1,
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm h-full flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold text-lg tracking-tight",
									children: "Saved Institutions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono uppercase tracking-wider",
									children: "Monitored Profiles"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "mb-6" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-2 gap-4 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, { children: saved.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, {
									className: "h-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/colleges/$code",
										params: { code: c.code },
										className: "block h-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
											className: "p-5 h-full rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all card-hover-lift group flex flex-col",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "secondary",
													className: "w-fit font-mono text-[10px] bg-background border-border/80 mb-3",
													children: ["CD:", c.code]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold leading-tight group-hover:text-primary transition-colors flex-1",
													children: c.shortName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs font-mono text-muted-foreground mt-3 pt-3 border-t border-border/40 flex items-center justify-between",
													children: [c.district, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" })]
												})
											]
										})
									})
								}, c.code)) })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 lg:space-y-8 flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
						direction: "left",
						delay: .2,
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold text-lg tracking-tight",
										children: "Query Logs"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
										staggerDelay: .1,
										children: searches.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm py-3 px-3 rounded-lg border border-transparent hover:border-border/60 hover:bg-muted/40 transition-colors cursor-default font-medium flex items-center gap-3 group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[10px] text-muted-foreground group-hover:text-primary/70 transition-colors",
												children: ["0", i + 1]
											}), s]
										}) }, s))
									})
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
						direction: "left",
						delay: .3,
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold text-lg tracking-tight",
										children: "Target Programs"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "mb-6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, { children: favBranches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "bg-muted/60 hover:bg-muted border border-border/60 px-3 py-1.5 font-medium",
										children: b.name
									}) }, b.code)) })
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					direction: "up",
					delay: .4,
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 md:p-8 rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
							variant: "dots",
							className: "absolute inset-0 opacity-40 mix-blend-overlay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold text-lg tracking-tight",
									children: "Generated Matrices"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono uppercase tracking-wider",
									children: "AI Report Archive"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
									staggerDelay: .15,
									children: [{
										title: "AI Report · 15 Jun 2024",
										meta: "Rank 2500 · BC · Chennai preference"
									}, {
										title: "AI Report · 12 Jun 2024",
										meta: "Rank 4800 · MBC · Coimbatore preference"
									}].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 border border-border/60 bg-card/60 backdrop-blur rounded-xl flex items-center justify-between gap-4 hover:border-primary/40 hover:shadow-elegant transition-all group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-base group-hover:text-primary transition-colors",
												children: r.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-mono text-muted-foreground mt-1.5",
												children: r.meta
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "shrink-0 text-primary bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center size-10 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
											"aria-label": "Download Report",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
										})]
									}) }, r.title))
								})
							})]
						})]
					})
				})
			]
		})
	})] });
}
//#endregion
export { Dashboard as component };
