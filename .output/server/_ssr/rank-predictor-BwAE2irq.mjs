import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { K as Crosshair, nt as Calculator, p as Sparkles, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, t as AnimatedSection, u as cn } from "./engineering-bg-ctUu3zKI.mjs";
import { t as Label } from "./label-Bih1Xe_h.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CQqkZOkQ.mjs";
import { t as COMMUNITIES } from "./mock-data-uQeJaK5y.mjs";
import { t as Input } from "./input-DkqXAI82.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rank-predictor-BwAE2irq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function predict(cutoff, community) {
	const c = Math.max(100, Math.min(200, cutoff));
	const general = Math.round(Math.max(1, (200 - c) * 950 + 200));
	const commAdj = {
		OC: 1,
		BC: .75,
		BCM: .6,
		MBC: .5,
		SC: .25,
		SCA: .2,
		ST: .15
	};
	const community_rank = Math.round(general * commAdj[community]);
	const spread = Math.round(general * .08);
	const confidence = Math.max(65, Math.min(98, Math.round(60 + (c - 100) * .4)));
	return {
		general: [Math.max(1, general - spread), general + spread],
		community: [Math.max(1, community_rank - Math.round(spread * commAdj[community])), community_rank + Math.round(spread * commAdj[community])],
		confidence
	};
}
function RankPredictor() {
	const [cutoff, setCutoff] = (0, import_react.useState)("190");
	const [community, setCommunity] = (0, import_react.useState)("BC");
	const [result, setResult] = (0, import_react.useState)(null);
	const submit = () => {
		const c = parseFloat(cutoff);
		if (isNaN(c) || c < 100 || c > 200) return;
		setResult(predict(c, community));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-b border-border/60 bg-surface overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
			variant: "grid",
			className: "absolute inset-0 opacity-40 dark:opacity-20"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page py-16 relative z-10 max-w-5xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateMarker, {
					label: "STAT.PREDICT",
					className: "mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
					children: "Rank Predictor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-muted-foreground text-pretty",
					children: "Input your academic scores to estimate your general and community ranks."
				})
			] })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page py-12 max-w-5xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[1fr_1.2fr] gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
				direction: "right",
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 md:p-8 rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-sm h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-6 text-foreground/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "technical-label",
							children: "Input Variables"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cutoff",
								className: "technical-label block mb-2 text-foreground/80",
								children: "Cutoff Score [100.0 - 200.0]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "cutoff",
									type: "number",
									step: "0.5",
									min: "100",
									max: "200",
									value: cutoff,
									onChange: (e) => setCutoff(e.target.value),
									className: "relative h-12 text-xl font-mono bg-background border-border shadow-sm focus-visible:ring-primary/50"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "technical-label block mb-2 text-foreground/80",
								children: "Community Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: community,
								onValueChange: (v) => setCommunity(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-12 bg-background font-mono shadow-sm border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COMMUNITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									className: "font-mono",
									children: c
								}, c)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: submit,
								className: "w-full h-12 rounded-xl gap-2 mt-4 shadow-glow group relative overflow-hidden font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 relative z-10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 uppercase tracking-widest text-xs",
										children: "Execute Prediction"
									})
								]
							})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
				direction: "left",
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden group/result shadow-elegant",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineeringBg, {
						variant: "dots",
						className: "absolute inset-0 opacity-40 mix-blend-overlay"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-primary font-bold mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-widest text-sm",
								children: "Prediction Results"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
									y: -10
								},
								transition: { duration: .3 },
								className: "space-y-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 rounded-xl bg-card border border-border/60 relative overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-0 right-0 p-4 opacity-5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "size-24" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "technical-label mb-2 text-primary",
												children: "Estimated General Rank"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-foreground mt-1",
												children: [
													result.general[0].toLocaleString(),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground font-light mx-2",
														children: "—"
													}),
													" ",
													result.general[1].toLocaleString()
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 rounded-xl bg-card border border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "technical-label mb-2",
											children: [
												"Estimated ",
												community,
												" Rank"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-foreground/90 mt-1",
											children: [
												result.community[0].toLocaleString(),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-light mx-2",
													children: "—"
												}),
												" ",
												result.community[1].toLocaleString()
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "technical-label",
											children: "Confidence Score"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded",
											children: [result.confidence, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: result.confidence,
										className: "h-2 bg-muted/60",
										indicatorClassName: "bg-primary shadow-glow"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground font-mono leading-relaxed opacity-70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-warning",
											children: "NOTICE:"
										}), " Projections utilize statistical modeling. Variance is expected. Official authority ranks prevail."]
									})
								]
							}, "result") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "flex flex-col items-center justify-center text-center py-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/20 blur-xl rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-16 place-items-center rounded-2xl bg-card border border-primary/20 text-primary shadow-sm relative z-10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-6 opacity-80" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-extrabold text-2xl tracking-tight",
										children: "Ready to Start"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed",
										children: "Input your cutoff and community on the left to estimate your rank."
									})
								]
							}, "empty")
						})]
					})]
				})
			})]
		})
	})] });
}
//#endregion
export { RankPredictor as component };
