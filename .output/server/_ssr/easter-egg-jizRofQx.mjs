import { o as __toESM } from "../_runtime.mjs";
import { C as Path, M as Shape, f as ExtrudeGeometry } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as Canvas, i as Float, n as ContactShadows, o as useFrame, r as Environment, t as Sparkles } from "../_libs/@react-three/drei+[...].mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/easter-egg-jizRofQx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Gear({ radius = 2, teeth = 12, speed = .5, color = "#a0aec0", metalness = .9, ...props }) {
	const meshRef = (0, import_react.useRef)(null);
	useFrame((state, delta) => {
		if (meshRef.current) meshRef.current.rotation.z += delta * speed;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		ref: meshRef,
		geometry: (0, import_react.useMemo)(() => {
			const shape = new Shape();
			const innerRadius = radius * .75;
			const depth = radius * .25;
			const holeRadius = radius * .3;
			const step = Math.PI * 2 / teeth;
			for (let i = 0; i < teeth; i++) {
				const angle = i * step;
				const gapEnd = angle + step * .2;
				const toothStart = angle + step * .3;
				const toothEnd = angle + step * .7;
				const gapStart = angle + step * .8;
				if (i === 0) shape.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
				else shape.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
				shape.lineTo(Math.cos(gapEnd) * innerRadius, Math.sin(gapEnd) * innerRadius);
				shape.lineTo(Math.cos(toothStart) * radius, Math.sin(toothStart) * radius);
				shape.lineTo(Math.cos(toothEnd) * radius, Math.sin(toothEnd) * radius);
				shape.lineTo(Math.cos(gapStart) * innerRadius, Math.sin(gapStart) * innerRadius);
			}
			shape.closePath();
			const holePath = new Path();
			holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);
			shape.holes.push(holePath);
			const geo = new ExtrudeGeometry(shape, {
				depth,
				bevelEnabled: true,
				bevelSegments: 3,
				steps: 1,
				bevelSize: radius * .05,
				bevelThickness: radius * .05
			});
			geo.center();
			return geo;
		}, [radius, teeth]),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			metalness,
			roughness: .2,
			envMapIntensity: 2
		})
	});
}
function GearAssembly() {
	const assemblyRef = (0, import_react.useRef)(null);
	useFrame((state, delta) => {
		if (assemblyRef.current) {
			assemblyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * .2) * .2;
			assemblyRef.current.rotation.y = Math.cos(state.clock.elapsedTime * .15) * .3 + .3;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
		speed: 1.5,
		rotationIntensity: .2,
		floatIntensity: 1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: assemblyRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {
					radius: 2,
					teeth: 16,
					speed: .5,
					color: "#cbd5e1",
					position: [
						0,
						0,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {
					radius: 1.2,
					teeth: 10,
					speed: -.8,
					color: "#94a3b8",
					position: [
						3.05,
						-.2,
						0
					],
					rotation: [
						0,
						0,
						.2
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {
					radius: 1.5,
					teeth: 12,
					speed: -.66,
					color: "#64748b",
					position: [
						-2.4,
						2.3,
						-.2
					],
					rotation: [
						0,
						0,
						-.1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {
					radius: .8,
					teeth: 6,
					speed: 1.33,
					color: "#475569",
					position: [
						-2.2,
						-1.8,
						.2
					],
					rotation: [
						0,
						0,
						.5
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {
					radius: 3.5,
					teeth: 28,
					speed: .2,
					color: "#334155",
					metalness: .7,
					position: [
						1,
						-2,
						-1.5
					],
					rotation: [
						0,
						0,
						0
					]
				})
			]
		})
	});
}
function EasterEgg({ onClose }) {
	const [visible, setVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.key === "Escape") handleClose();
		};
		window.addEventListener("keydown", handler);
		const timer = setTimeout(() => {
			handleClose();
		}, 4e3);
		return () => {
			window.removeEventListener("keydown", handler);
			clearTimeout(timer);
		};
	}, []);
	const handleClose = () => {
		setVisible(false);
		setTimeout(onClose, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 1 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 cursor-pointer",
				onClick: handleClose
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
					camera: {
						position: [
							0,
							0,
							10
						],
						fov: 45
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .5 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
							position: [
								10,
								10,
								5
							],
							intensity: 1.5,
							color: "#4f46e5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
							position: [
								-10,
								-10,
								-5
							],
							intensity: 1,
							color: "#38bdf8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearAssembly, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							count: 150,
							scale: 15,
							size: 2,
							speed: .4,
							opacity: .3,
							color: "#818cf8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
							position: [
								0,
								-4,
								0
							],
							opacity: .5,
							scale: 15,
							blur: 2,
							far: 5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Environment, { preset: "city" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "absolute bottom-16 text-center pointer-events-none",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: 1,
					duration: 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl font-mono",
					children: [
						"You are a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Mechanical Engineer"
						}),
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xl text-muted-foreground font-mono tracking-widest uppercase",
					children: "Keep building. Keep innovating."
				})]
			})
		]
	}) });
}
//#endregion
export { EasterEgg as default };
