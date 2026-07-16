import { o as __toESM } from "../_runtime.mjs";
import { R as init_performance, z as performance_default } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { u as cn } from "./engineering-bg-BVrbPAIv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-card-3R8-sfpK.js
init_performance();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Premium engineering-style statistic card with optional count-up animation.
* Uses monospace for numerical values. Subtle perspective tilt on hover.
*/
function StatCard({ icon, label, value, suffix, className, mono = true, countUp = false }) {
	const ref = (0, import_react.useRef)(null);
	const isInView = useInView(ref, { once: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref,
		className: cn("relative p-4 rounded-xl border border-border/60 bg-card", "transition-shadow duration-250", "hover:shadow-md", className),
		whileHover: {
			y: -1,
			scale: 1.01
		},
		transition: {
			duration: .2,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2.5 text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "technical-label mb-1",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("text-xl font-bold tracking-tight", mono && "font-mono tabular-nums"),
				children: countUp && typeof value === "number" && isInView ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
					target: value,
					suffix
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [value, suffix] })
			})
		]
	});
}
/**
* Animated count-up number display.
*/
function CountUp({ target, suffix = "", duration = 1200 }) {
	const [current, setCurrent] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const start = performance_default.now();
		const step = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setCurrent(Math.round(eased * target));
			if (progress < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}, [target, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [current.toLocaleString(), suffix] });
}
/**
* Inline stat for use within cards (label + value pair).
*/
function InlineStat({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-semibold font-mono tabular-nums mt-0.5",
			children: value
		})]
	});
}
//#endregion
export { StatCard as n, InlineStat as t };
