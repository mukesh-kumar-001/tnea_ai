import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as ListChecks, G as Database, J as Compass, R as GraduationCap, T as MessageSquare, at as BadgeCheck, h as ShieldCheck, p as Sparkles, s as TrendingUp, st as ArrowRight, tt as ChartLine, ut as Activity } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, c as StaggerContainer, i as Card, l as StaggerItem, n as AppShell, o as EngineeringBg, r as Button, s as EngineeringDivider, t as AnimatedSection } from "./engineering-bg-ctUu3zKI.mjs";
import { i as useColleges, r as useBranches } from "./api-DrPEd7dX.mjs";
import { n as StatCard, t as InlineStat } from "./stat-card-XlNR8un_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BzIrJYaQ.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Compass,
		title: "College Explorer",
		desc: "Filter 460+ colleges by district, NAAC grade, fees, placement and branch.",
		to: "/colleges"
	},
	{
		icon: TrendingUp,
		title: "Rank Predictor",
		desc: "Estimate general and community rank instantly from your TNEA cutoff.",
		to: "/rank-predictor"
	},
	{
		icon: Sparkles,
		title: "College Suggestions",
		desc: "Dream, target and safe college lists tailored to your rank and preferences.",
		to: "/counselling"
	},
	{
		icon: ListChecks,
		title: "Choice Filling",
		desc: "Drag-and-drop preference list with AI-driven order suggestions.",
		to: "/choice-filling"
	},
	{
		icon: ChartLine,
		title: "Cutoff Explorer",
		desc: "Interactive cutoff history charts across colleges, branches and communities.",
		to: "/cutoffs"
	},
	{
		icon: MessageSquare,
		title: "AI Assistant",
		desc: "Ask anything about counselling rules, seat matrix, hostels or placements.",
		to: "/ai-chat"
	}
];
function Home() {
	const { data: collegesData, isLoading: isLoadingColleges } = useColleges(1, 6);
	const { data: branchesData, isLoading: isLoadingBranches } = useBranches();
	const totalColleges = collegesData?.total || 460;
	const totalBranches = branchesData?.length || 120;
	const topColleges = collegesData?.colleges || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden min-h-[85vh] flex flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
					variant: "grid",
					className: "absolute inset-0 opacity-40 dark:opacity-20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 -z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] md:size-[800px] rounded-full bg-primary/10 blur-[100px]",
						animate: {
							scale: [
								1,
								1.05,
								1
							],
							opacity: [
								.5,
								.8,
								.5
							]
						},
						transition: {
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut"
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-page relative z-10 pt-20 pb-16 md:pt-32 md:pb-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerContainer, {
						className: "flex flex-col items-center text-center max-w-4xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-mono font-medium text-primary shadow-sm glass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex size-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
								}), "LATEST // 2026 ADMISSIONS WINDOW"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-8 text-balance text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight",
								children: [
									"Smart ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary relative inline-block",
										children: ["Engineering", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											className: "absolute -bottom-2 left-0 h-1 bg-primary w-full",
											initial: { scaleX: 0 },
											animate: { scaleX: 1 },
											transition: {
												delay: .8,
												duration: .8,
												ease: "circOut"
											}
										})]
									}),
									" Admissions"
								]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty font-medium",
								children: "Data-driven college and branch recommendations using verified TNEA parameters. Make confident decisions with our smart insights."
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/counselling",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "lg",
											className: "rounded-xl shadow-glow px-8 h-14 gap-2 text-base w-full sm:w-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" }), " Start Smart Predictor"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/colleges",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "lg",
											variant: "outline",
											className: "rounded-xl h-14 px-8 text-base bg-background/50 backdrop-blur border-border/80 w-full sm:w-auto",
											children: "Explore Colleges"
										})
									})]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					delay: .4,
					className: "container-page pb-16 md:pb-24 z-10 relative mt-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Verified Colleges",
								value: totalColleges,
								suffix: "+",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" }),
								countUp: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Engineering Branches",
								value: totalBranches,
								suffix: "+",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-5" }),
								countUp: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Cutoff History",
								value: 5,
								suffix: " YRS",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5" }),
								countUp: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "AI Scenarios Run",
								value: 125,
								suffix: "k+",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
								countUp: true
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-y border-border/60 bg-surface-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
				label: "01.SYS",
				className: "absolute top-4 left-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
					className: "max-w-2xl mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "technical-label mb-3",
							children: "Key Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-extrabold tracking-tight",
							children: "Everything you need"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted-foreground",
							children: "Purpose-built tools for every stage of the TNEA journey — from exploration to final choice submission."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: f.to,
						className: "group block h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "relative p-6 rounded-2xl h-full border-border/60 bg-card/50 backdrop-blur-sm card-hover-lift overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-24" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-12 place-items-center rounded-xl bg-primary/10 text-primary mb-6 border border-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold tracking-tight",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground leading-relaxed",
									children: f.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 text-sm font-semibold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all",
									children: ["Go to Tool ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})
					}) }, f.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative container-page py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
					variant: "dots",
					className: "absolute inset-0 opacity-30"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
					className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "technical-label mb-3",
						children: "College Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-5xl font-extrabold tracking-tight",
						children: "Top-tier colleges"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/colleges",
						className: "text-sm font-semibold text-primary hover:text-primary-glow inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20",
						children: ["View All Colleges ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10",
					children: isLoadingColleges ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-2xl bg-muted/30 animate-shimmer border border-border/60" }, i)) : topColleges.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
						delay: i * .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/colleges/$code",
							params: { code: c.code },
							className: "group block h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 rounded-2xl h-full border-border/60 bg-card/60 backdrop-blur card-hover-lift",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary uppercase tracking-widest font-mono",
											children: ["CD:", c.code]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 text-[10px] font-bold text-success uppercase tracking-widest bg-success/10 px-2 py-1 rounded border border-success/20",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success animate-pulse" }),
												" NAAC ",
												c.naac
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold group-hover:text-primary transition-colors leading-tight line-clamp-2 min-h-[2.5rem]",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-2 font-mono",
										children: [c.district, ", TN"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringDivider, { className: "my-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
											label: "Placement",
											value: `${c.placementPercentage}%`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineStat, {
											label: "Avg Package",
											value: `₹${c.averagePackage}L`
										})]
									})
								]
							})
						})
					}, c.code))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-t border-border/60 bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
				variant: "grid",
				className: "absolute inset-0 opacity-20"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page py-20 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerContainer, {
					className: "grid md:grid-cols-3 gap-10",
					children: [
						{
							icon: ShieldCheck,
							title: "Verified Protocols",
							desc: "Cutoffs sourced directly from official TNEA seat allotment records with high accuracy."
						},
						{
							icon: Sparkles,
							title: "Smart Analysis",
							desc: "Smart Predictor trained on a decade of admission patterns and shifting preferences."
						},
						{
							icon: MessageSquare,
							title: "AI Chat Assistant",
							desc: "Always-on conversational agent for rules, seat matrices, and fee structures."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
						className: "flex gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-bold tracking-tight",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground mt-2 leading-relaxed",
							children: f.desc
						})] })]
					}, f.title))
				})
			})]
		})
	] });
}
//#endregion
export { Home as component };
