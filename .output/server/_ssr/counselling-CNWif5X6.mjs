import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { B as FingerprintPattern, a as Trophy, k as LoaderCircle, lt as Activity, m as Shield, nt as Building2, u as Target } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, t as AnimatedSection } from "./engineering-bg-BVrbPAIv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Xog1iefT.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BTa1Y5Px.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAllColleges, r as useBranches, t as fetchRecommendations } from "./api-B18pGMTn.mjs";
import { n as Switch, t as Slider } from "./switch-Sa8IAv8e.mjs";
import { n as DISTRICTS, r as Label, t as COMMUNITIES } from "./mock-data-C2JWPVjI.mjs";
import { t as Input } from "./input-B1Kd6vfD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/counselling-CNWif5X6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EasterEgg = (0, import_react.lazy)(() => import("./easter-egg-jizRofQx.mjs"));
function Counselling() {
	const { data: colleges = [] } = useAllColleges();
	const { data: branches = [] } = useBranches();
	const [community, setCommunity] = (0, import_react.useState)("BC");
	const [gender, setGender] = (0, import_react.useState)("Female");
	const [genRank, setGenRank] = (0, import_react.useState)("2500");
	const [commRank, setCommRank] = (0, import_react.useState)("1400");
	const [cutoff, setCutoff] = (0, import_react.useState)("192.5");
	const [prefBranches, setPrefBranches] = (0, import_react.useState)([]);
	const [prefDistricts, setPrefDistricts] = (0, import_react.useState)(["Chennai", "Coimbatore"]);
	const [budget, setBudget] = (0, import_react.useState)([15e4]);
	const [hostel, setHostel] = (0, import_react.useState)(true);
	const [recos, setRecos] = (0, import_react.useState)(null);
	const [showEasterEgg, setShowEasterEgg] = (0, import_react.useState)(false);
	const { mutate: generate, isPending: loading } = useMutation({
		mutationFn: async () => {
			const branchCodes = prefBranches.map((name) => {
				const b = branches.find((x) => x.name === name);
				return b ? b.code : name;
			});
			return await fetchRecommendations({
				user_profile: {
					community: community === "any" ? "" : community,
					general_rank: parseInt(genRank),
					community_rank: parseInt(commRank)
				},
				preferences: {
					preferred_branches: branchCodes,
					preferred_districts: prefDistricts
				}
			});
		},
		onSuccess: (data) => {
			const allRecos = [];
			const mapCategory = (list, cat) => {
				if (!list) return;
				list.forEach((item) => {
					const college = colleges.find((c) => c.id === item.college_id);
					allRecos.push({
						code: college ? college.code : String(item.college_id),
						name: item.name,
						branch: item.branch,
						probability: Math.round(item.probability * 100),
						expectedCutoff: item.historical_cutoff_rank || 0,
						reasoning: item.explanation || "",
						category: cat
					});
				});
			};
			mapCategory(data.dream, "dream");
			mapCategory(data.target, "target");
			mapCategory(data.safe, "safe");
			setRecos(allRecos);
		},
		onError: (err) => {
			console.error(err);
			toast.error("System Error: Could not generate recommendations.");
		}
	});
	const toggleFrom = (arr, v) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
	const groups = recos ? {
		dream: recos.filter((r) => r.category === "dream").slice(0, 5),
		target: recos.filter((r) => r.category === "target").slice(0, 5),
		safe: recos.filter((r) => r.category === "safe").slice(0, 5)
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		showEasterEgg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EasterEgg, { onClose: () => setShowEasterEgg(false) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
							label: "AI.CN",
							className: "mb-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
							children: "Neural Recommendation Engine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted-foreground text-pretty",
							children: "Input your TNEA parameters. Our system generates precise Dream, Target, and Safe probabilities based on historical allocation matrices."
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-page py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[400px_1fr] gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
					direction: "left",
					className: "h-fit lg:sticky lg:top-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "technical-label",
								children: "Parameter Configuration"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-bold border-b border-border/60 pb-2 mb-4 text-foreground/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4" }), " Demographics"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Community"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: community,
											onValueChange: (v) => setCommunity(v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-10 bg-background font-mono",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "any",
												className: "font-mono",
												children: "Any Community"
											}), COMMUNITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: c,
												className: "font-mono",
												children: c
											}, c))] })]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Gender"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: gender,
											onValueChange: setGender,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-10 bg-background font-mono",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "Female",
													className: "font-mono",
													children: "Female"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "Male",
													className: "font-mono",
													children: "Male"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "Other",
													className: "font-mono",
													children: "Other"
												})
											] })]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Gen Rank"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: genRank,
											onChange: (e) => setGenRank(e.target.value),
											className: "h-10 font-mono"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Comm Rank"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: commRank,
											onChange: (e) => setCommRank(e.target.value),
											className: "h-10 font-mono"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "technical-label block mb-2",
												children: "Cutoff Mark (Max 200)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: cutoff,
												onChange: (e) => setCutoff(e.target.value),
												className: "h-10 font-mono bg-primary/5 border-primary/20 focus-visible:ring-primary"
											})]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-bold border-b border-border/60 pb-2 mb-4 text-foreground/80 mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), " Targeting Parameters"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Target Branches"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2 scrollbar-thin",
											children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												onClick: () => setPrefBranches(toggleFrom(prefBranches, b.name)),
												variant: prefBranches.includes(b.name) ? "default" : "outline",
												className: "cursor-pointer text-[10px] font-mono hover:bg-primary/20 hover:text-primary transition-colors",
												children: b.name
											}, b.code))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "technical-label block mb-2",
											children: "Geographic Focus"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: prefDistricts.length === 0 ? "any" : prefDistricts[0],
											onValueChange: (v) => setPrefDistricts(v === "any" ? [] : [v]),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-10 bg-background font-mono",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "any",
												className: "font-mono",
												children: "Any District"
											}), DISTRICTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: d,
												className: "font-mono",
												children: d
											}, d))] })]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "technical-label",
												children: "Annual Budget Cap"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs font-bold bg-muted px-2 py-1 rounded",
												children: ["₹", budget[0].toLocaleString("en-IN")]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											min: 2e4,
											max: 2e5,
											step: 5e3,
											value: budget,
											onValueChange: (v) => setBudget(v)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between bg-muted/30 p-3 rounded-xl border border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "hostel-req",
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), " Require Hostel"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												id: "hostel-req",
												checked: hostel,
												onCheckedChange: setHostel
											})]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => {
										if (parseInt(genRank) === 8081 && community === "BC" && parseInt(commRank) === 4702 && gender === "Male" && parseFloat(cutoff) === 188.5) setShowEasterEgg(true);
										else setShowEasterEgg(false);
										generate();
									},
									disabled: loading,
									className: "w-full h-12 rounded-xl gap-2 font-bold shadow-glow relative overflow-hidden group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" }),
										loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin relative z-10" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 relative z-10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative z-10 tracking-wide uppercase text-xs",
											children: loading ? "Processing Matrix..." : "Execute Simulation"
										})
									]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
						mode: "wait",
						children: [
							!recos && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "p-16 rounded-2xl text-center border-dashed border-border/80 flex flex-col items-center justify-center min-h-[500px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/20 blur-xl rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-20 place-items-center rounded-2xl bg-card border border-primary/20 text-primary shadow-sm relative z-10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-8 opacity-80" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-extrabold text-2xl tracking-tight",
											children: "System Standby"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground mt-3 max-w-md text-sm leading-relaxed",
											children: "Configure your parameters on the control panel and execute the simulation to generate targeted college allocations."
										})
									]
								})
							}, "empty"),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "min-h-[500px] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "p-12 rounded-2xl text-center border-border/60 bg-card/50 flex flex-col items-center w-full max-w-md mx-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative size-16 mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "animate-spin size-full text-primary/20",
												viewBox: "0 0 24 24",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													className: "opacity-25",
													cx: "12",
													cy: "12",
													r: "10",
													stroke: "currentColor",
													strokeWidth: "4",
													fill: "none"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													className: "opacity-75",
													fill: "currentColor",
													d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-lg font-mono",
											children: "PROCESSING_MATRIX..."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full bg-muted rounded-full h-1 mt-4 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												className: "bg-primary h-full rounded-full",
												initial: { width: "0%" },
												animate: { width: "100%" },
												transition: {
													duration: 2,
													ease: "easeInOut",
													repeat: Infinity
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-4 font-mono uppercase tracking-widest",
											children: "Running allocation scenarios"
										})
									]
								})
							}, "loading"),
							groups && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "space-y-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										icon: Trophy,
										title: "Dream Allocation",
										description: "Stretch probability — high value targets",
										list: groups.dream,
										tone: "warning",
										delay: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										icon: Target,
										title: "Target Allocation",
										description: "High probability — realistic matches",
										list: groups.target,
										tone: "primary",
										delay: .2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										icon: Shield,
										title: "Safe Allocation",
										description: "Near certainty — reliable fallbacks",
										list: groups.safe,
										tone: "success",
										delay: .4
									})
								]
							}, "results")
						]
					})
				})]
			})
		})
	] });
}
function ProbabilityRing({ value, tone }) {
	const size = 52;
	const stroke = 4;
	const r = (size - stroke) / 2;
	const circumference = 2 * Math.PI * r;
	const offset = circumference * (1 - value / 100);
	const strokeColor = tone === "warning" ? "var(--warning)" : tone === "success" ? "var(--success)" : "var(--primary)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative shrink-0 flex items-center justify-center",
		style: {
			width: size,
			height: size
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-full blur-md opacity-50",
				style: {
					backgroundColor: tone === "warning" ? "rgba(234, 179, 8, 0.4)" : tone === "success" ? "rgba(34, 197, 94, 0.4)" : "rgba(99, 102, 241, 0.4)",
					transform: "scale(0.8)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				className: "-rotate-90 relative z-10 drop-shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: size / 2,
					cy: size / 2,
					r,
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: stroke,
					className: "opacity-40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: size / 2,
					cy: size / 2,
					r,
					fill: "none",
					stroke: strokeColor,
					strokeWidth: stroke,
					strokeLinecap: "round",
					strokeDasharray: circumference,
					initial: { strokeDashoffset: circumference },
					animate: { strokeDashoffset: offset },
					transition: {
						duration: 1.5,
						ease: "easeOut",
						delay: .2
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 grid place-items-center text-[11px] font-bold tabular-nums z-10 font-mono",
				children: [value, "%"]
			})
		]
	});
}
function Group({ icon: Icon, title, description, list, tone, delay }) {
	if (list.length === 0) return null;
	const t = {
		warning: {
			bg: "bg-warning/10",
			text: "text-warning",
			border: "border-warning/30",
			label: "text-warning"
		},
		success: {
			bg: "bg-success/10",
			text: "text-success",
			border: "border-success/30",
			label: "text-success"
		},
		primary: {
			bg: "bg-primary/10",
			text: "text-primary",
			border: "border-primary/30",
			label: "text-primary"
		}
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
		delay,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid size-12 place-items-center rounded-xl ${t.bg} ${t.text} border ${t.border} shadow-sm`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-extrabold text-xl tracking-tight uppercase",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider",
				children: description
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-xl card-hover-lift border-border/60 bg-card group relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-0 left-0 w-1 h-full ${t.bg.replace("/10", "/40")}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-5 pl-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProbabilityRing, {
						value: r.probability,
						tone
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "font-mono text-[10px] bg-muted/60 border border-border/80",
									children: ["CD:", r.code]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1",
									children: r.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium text-foreground/80 mt-1",
								children: r.branch
							}),
							r.reasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 p-3 rounded-lg bg-muted/30 border border-border/40 text-sm leading-relaxed text-muted-foreground",
								children: r.reasoning
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-4 items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 bg-background border border-border/60 px-2.5 py-1 rounded-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "technical-label",
										children: "Exp. Cutoff Rank:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-mono tabular-nums text-xs",
										children: r.expectedCutoff.toLocaleString("en-IN")
									})]
								})
							})
						]
					})]
				})]
			}) }, `${r.code}-${r.branch}`))
		})]
	});
}
//#endregion
export { Counselling as component };
