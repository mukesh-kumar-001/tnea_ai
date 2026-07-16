import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as AnimatePresence, t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as ListChecks, C as Moon, D as Menu, E as MessageCircle, J as Compass, N as Info, R as GraduationCap, T as MessageSquare, d as Sun, et as ChartLine, j as LayoutDashboard, ot as ArrowRight, p as Sparkles, s as TrendingUp, t as X, v as Search } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engineering-bg-BVrbPAIv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function FloatingChat() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
		children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-primary text-primary-foreground p-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "TNEA Counselling Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs opacity-80 mt-0.5",
						children: "AI-powered · Online"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": "Close",
						className: "opacity-80 hover:opacity-100 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-3 max-h-64 overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl rounded-tl-sm bg-muted p-3 text-sm max-w-[85%]",
						children: "Hi! I can answer questions about colleges, cutoffs, branches, fees, hostels and counselling rules. What's your TNEA cutoff mark?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground text-center pt-2",
						children: "Open the full assistant for chat history and richer answers."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ai-chat",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full rounded-xl",
							size: "sm",
							children: ["Open AI Assistant ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 ml-1" })]
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(!open),
			className: "grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"aria-label": open ? "Close AI Assistant preview" : "Open AI Assistant preview",
			"aria-expanded": open,
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" })
		})]
	});
}
var ROUTES = [
	{
		to: "/",
		label: "Home",
		icon: Search,
		keywords: "home landing"
	},
	{
		to: "/colleges",
		label: "College Explorer",
		icon: Compass,
		keywords: "colleges explore search filter"
	},
	{
		to: "/rank-predictor",
		label: "Rank Predictor",
		icon: TrendingUp,
		keywords: "rank predict cutoff estimate"
	},
	{
		to: "/counselling",
		label: "AI Counselling",
		icon: Sparkles,
		keywords: "counsel recommend dream target safe ai"
	},
	{
		to: "/choice-filling",
		label: "Choice Filling",
		icon: ListChecks,
		keywords: "choice fill preference list order"
	},
	{
		to: "/cutoffs",
		label: "Cutoff Explorer",
		icon: ChartLine,
		keywords: "cutoff history chart trend year"
	},
	{
		to: "/ai-chat",
		label: "AI Assistant",
		icon: MessageSquare,
		keywords: "chat ask question assistant help"
	},
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		keywords: "dashboard saved workspace"
	},
	{
		to: "/about",
		label: "About",
		icon: Info,
		keywords: "about mission team"
	}
];
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const navigate = useNavigate();
	const filtered = ROUTES.filter((r) => {
		if (!query) return true;
		const q = query.toLowerCase();
		return r.label.toLowerCase().includes(q) || r.keywords.includes(q);
	});
	(0, import_react.useEffect)(() => {
		setSelectedIndex(0);
	}, [query]);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((prev) => !prev);
				setQuery("");
			}
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);
	const handleSelect = (0, import_react.useCallback)((to) => {
		setOpen(false);
		setQuery("");
		navigate({ to });
	}, [navigate]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter" && filtered[selectedIndex]) handleSelect(filtered[selectedIndex].to);
	}, [
		filtered,
		selectedIndex,
		handleSelect
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .15 },
		onClick: () => setOpen(false)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2",
		initial: {
			opacity: 0,
			scale: .96,
			y: -8
		},
		animate: {
			opacity: 1,
			scale: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .96,
			y: -8
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-xl border border-border/60 bg-popover shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/60 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search pages, tools, features...",
							className: "flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground/60",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							onKeyDown: handleKeyDown,
							autoFocus: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "hidden sm:inline-flex h-5 items-center rounded border border-border/80 bg-muted/50 px-1.5 text-[10px] font-mono font-medium text-muted-foreground",
							children: "ESC"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[320px] overflow-y-auto p-1.5",
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No results found"
					}) : filtered.map((route, i) => {
						const Icon = route.icon;
						const isActive = i === selectedIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${isActive ? "bg-primary/8 text-foreground" : "text-foreground/80 hover:bg-muted/60"}`,
							onClick: () => handleSelect(route.to),
							onMouseEnter: () => setSelectedIndex(i),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid size-8 place-items-center rounded-lg shrink-0 ${isActive ? "bg-primary/12 text-primary" : "bg-muted/60 text-muted-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 font-medium",
									children: route.label
								}),
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 text-muted-foreground" })
							]
						}, route.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/60 px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono",
								children: "↑↓"
							}), "navigate"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono",
								children: "↵"
							}), "open"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono",
								children: "esc"
							}), "close"]
						})
					]
				})
			]
		})
	})] }) });
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/colleges",
		label: "Colleges"
	},
	{
		to: "/compare",
		label: "Compare"
	},
	{
		to: "/rank-predictor",
		label: "Rank Predictor"
	},
	{
		to: "/counselling",
		label: "Counselling"
	},
	{
		to: "/choice-filling",
		label: "Choice Filling"
	},
	{
		to: "/cutoffs",
		label: "Cutoffs"
	},
	{
		to: "/ai-chat",
		label: "Assistant"
	},
	{
		to: "/about",
		label: "About"
	}
];
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
		setDark(isDark);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const toggleDark = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
	};
	const openCommandPalette = () => {
		document.dispatchEvent(new KeyboardEvent("keydown", {
			key: "k",
			metaKey: true
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("sticky top-0 z-40 border-b transition-all duration-200", scrolled ? "border-border/60 glass shadow-xs" : "border-transparent bg-background/60 backdrop-blur-sm"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex h-14 items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 shrink-0 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-bold tracking-tight",
								children: ["TNEA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: ".ai"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden lg:flex items-center gap-0.5",
							children: NAV.map((item) => {
								const active = pathname === item.to || item.to !== "/" && pathname.startsWith(item.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									"aria-current": active ? "page" : void 0,
									className: cn("relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150", active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"),
									children: [item.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										layoutId: "nav-indicator",
										className: "absolute inset-x-2 -bottom-[9px] h-[2px] rounded-full bg-primary",
										transition: {
											type: "spring",
											stiffness: 500,
											damping: 35
										}
									})]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: openCommandPalette,
									className: "hidden sm:inline-flex h-8 gap-2 text-muted-foreground hover:text-foreground px-2.5 rounded-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs",
											children: "Search"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "hidden md:inline-flex h-5 items-center rounded border border-border/60 bg-muted/40 px-1 text-[10px] font-mono text-muted-foreground/60",
											children: "⌘K"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: toggleDark,
									"aria-label": "Toggle dark mode",
									className: "size-8 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											rotate: -90,
											opacity: 0
										},
										animate: {
											rotate: 0,
											opacity: 1
										},
										transition: { duration: .2 },
										children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
									}, dark ? "sun" : "moon")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/counselling",
									className: "hidden sm:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "h-8 rounded-lg text-xs px-3.5 shadow-sm",
										children: "Get Started"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden size-8 rounded-lg",
									onClick: () => setOpen(!open),
									"aria-label": "Toggle menu",
									"aria-expanded": open,
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						height: 0,
						opacity: 0
					},
					animate: {
						height: "auto",
						opacity: 1
					},
					exit: {
						height: 0,
						opacity: 0
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
					className: "lg:hidden overflow-hidden border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "container-page py-3 grid gap-0.5",
						children: NAV.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: -12
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								delay: i * .03,
								duration: .2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-muted/60 block transition-colors",
								children: item.label
							})
						}, item.to))
					})
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-20 border-t border-border/60 bg-surface-muted/30 blueprint-dots",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page py-12 grid gap-8 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-7 place-items-center rounded-md bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-bold",
									children: ["TNEA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: ".ai"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground max-w-md leading-relaxed",
								children: "An independent, data-driven assistant for Tamil Nadu Engineering Admissions. Not affiliated with the official DoTE Tamil Nadu portal."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "technical-label mb-3",
							children: "Tools"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-foreground/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/colleges",
									className: "transition-colors hover:text-primary",
									children: "College Explorer"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/rank-predictor",
									className: "transition-colors hover:text-primary",
									children: "Rank Predictor"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cutoffs",
									className: "transition-colors hover:text-primary",
									children: "Cutoff Explorer"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/choice-filling",
									className: "transition-colors hover:text-primary",
									children: "Choice Filling"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "technical-label mb-3",
							children: "Platform"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-foreground/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "transition-colors hover:text-primary",
									children: "About"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ai-chat",
									className: "transition-colors hover:text-primary",
									children: "AI Assistant"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard",
									className: "transition-colors hover:text-primary",
									children: "Dashboard"
								}) })
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container-page py-4 flex flex-wrap gap-2 justify-between text-[11px] text-muted-foreground/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" TNEA.ai — Independent Admissions Intelligence"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px]",
							children: "v2.0"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingChat, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {})
		]
	});
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function AnimatedSection({ children, className, delay = 0, direction = "up", duration = .5, once = true }) {
	const ref = (0, import_react.useRef)(null);
	const isInView = useInView(ref, {
		once,
		margin: "-60px"
	});
	const directionMap = {
		up: { y: 24 },
		left: { x: -24 },
		right: { x: 24 },
		none: {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className,
		initial: {
			opacity: 0,
			...directionMap[direction]
		},
		animate: isInView ? {
			opacity: 1,
			x: 0,
			y: 0
		} : {
			opacity: 0,
			...directionMap[direction]
		},
		transition: {
			duration,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children
	});
}
function StaggerContainer({ children, className, staggerDelay = .06, once = true }) {
	const ref = (0, import_react.useRef)(null);
	const isInView = useInView(ref, {
		once,
		margin: "-40px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className,
		initial: "hidden",
		animate: isInView ? "visible" : "hidden",
		variants: {
			hidden: {},
			visible: { transition: { staggerChildren: staggerDelay } }
		},
		children
	});
}
function StaggerItem({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		variants: {
			hidden: {
				opacity: 0,
				y: 16
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: .4,
					ease: [
						.16,
						1,
						.3,
						1
					]
				}
			}
		},
		children
	});
}
/**
* Subtle engineering-inspired background pattern.
* Use as a wrapper or a decorative layer.
*/
function EngineeringBg({ variant = "dots", className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(variant === "dots" ? "blueprint-dots" : "blueprint-grid", className),
		children
	});
}
/**
* Decorative engineering coordinate marker — a small cross + label.
* Used sparingly at section boundaries for visual identity.
*/
function CoordinateMarker({ label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2 select-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			className: "text-muted-foreground/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "6",
					y1: "0",
					x2: "6",
					y2: "12",
					stroke: "currentColor",
					strokeWidth: "0.75"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "6",
					x2: "12",
					y2: "6",
					stroke: "currentColor",
					strokeWidth: "0.75"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "6",
					cy: "6",
					r: "1.5",
					fill: "currentColor"
				})
			]
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[9px] font-mono font-medium text-muted-foreground/40 uppercase tracking-wider",
			children: label
		})]
	});
}
/**
* Engineering-style section divider with optional coordinate label.
*/
function EngineeringDivider({ label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex items-center gap-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "engineering-divider flex-1" }),
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] font-mono font-medium text-muted-foreground/30 uppercase tracking-widest shrink-0",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "engineering-divider flex-1" })
		]
	});
}
//#endregion
export { CoordinateMarker as a, StaggerContainer as c, Card as i, StaggerItem as l, AppShell as n, EngineeringBg as o, Button as r, EngineeringDivider as s, AnimatedSection as t, cn as u };
