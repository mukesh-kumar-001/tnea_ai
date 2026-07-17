import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as Send, i as User, k as LoaderCircle, l as Terminal, p as Sparkles } from "../_libs/lucide-react.mjs";
import { a as CoordinateMarker, i as Card, n as AppShell, o as EngineeringBg, r as Button, t as AnimatedSection, u as cn } from "./engineering-bg-ctUu3zKI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-chat-Ct0RbQCu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var STARTERS = [
	"Compute the optimal placement-to-fee ratio for CSE in Chennai",
	"Analyze historical TNEA counselling rounds and allocation algorithms",
	"Extract the highest recorded package at PSG Tech",
	"Compare structural differences between BC and MBC reservation quotas"
];
function ChatPage() {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "System online. Neural assistant initialized.\n\nI am equipped to analyze TNEA data matrices including institutional profiles, historical cutoffs, placement statistics, and official counselling protocols. Awaiting your query parameter."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) {
			const { scrollHeight, clientHeight } = scrollRef.current;
			scrollRef.current.scrollTo({
				top: scrollHeight - clientHeight,
				behavior: "smooth"
			});
		}
	}, [messages]);
	(0, import_react.useEffect)(() => {
		if (!loading) setTimeout(() => inputRef.current?.focus(), 100);
	}, [loading]);
	const send = async (text) => {
		const content = (text ?? input).trim();
		if (!content || loading) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setInput("");
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 600));
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: next })
			});
			if (!res.ok) {
				if (res.status === 429) toast.error("Rate limit exceeded. System throttling.");
				else if (res.status === 402) toast.error("Compute credits exhausted.");
				else toast.error("Neural linkage failed.");
				setLoading(false);
				return;
			}
			const reader = res.body?.getReader();
			if (!reader) throw new Error("No stream");
			const decoder = new TextDecoder();
			let assistant = "";
			setMessages((m) => [...m, {
				role: "assistant",
				content: ""
			}]);
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				assistant += decoder.decode(value, { stream: true });
				setMessages((m) => {
					const copy = [...m];
					copy[copy.length - 1] = {
						role: "assistant",
						content: assistant
					};
					return copy;
				});
			}
		} catch (e) {
			toast.error("Network protocol error. Retrying connection.");
		} finally {
			setLoading(false);
		}
	};
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
						label: "AI.CHAT",
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl md:text-5xl font-extrabold tracking-tight text-balance",
						children: "Neural Interface"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground text-pretty",
						children: "Query the unified TNEA database using natural language. Our AI synthesizes complex data points into actionable insights."
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page py-8 md:py-10 max-w-5xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSection, {
			direction: "up",
			delay: .1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl border-border/60 bg-card/80 backdrop-blur shadow-elegant overflow-hidden flex flex-col relative",
				style: {
					height: "calc(100vh - 350px)",
					minHeight: "500px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 border-b border-border/60 bg-muted/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "technical-label",
								children: "Active Session: TNEA-AI-v2"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-success" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest",
								children: "System Online"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: scrollRef,
						className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 10,
									scale: .98
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								className: `flex gap-3 md:gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid size-8 md:size-10 place-items-center rounded-xl shrink-0 shadow-sm border ${m.role === "user" ? "bg-card border-border/60 text-foreground" : "bg-primary text-primary-foreground border-primary/20"}`,
									children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 md:size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 md:size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-2xl px-5 py-4 max-w-[85%] md:max-w-[75%] text-[15px] whitespace-pre-wrap leading-relaxed shadow-sm border ${m.role === "user" ? "bg-foreground text-background border-foreground rounded-tr-sm font-medium" : "bg-card border-border/60 text-foreground rounded-tl-sm"}`,
									children: m.content || (loading && i === messages.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1 items-center h-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-1.5 bg-primary/60 rounded-full animate-bounce",
												style: { animationDelay: "0ms" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-1.5 bg-primary/60 rounded-full animate-bounce",
												style: { animationDelay: "150ms" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-1.5 bg-primary/60 rounded-full animate-bounce",
												style: { animationDelay: "300ms" }
											})
										]
									}) : "")
								})]
							}, i))
						}), loading && messages[messages.length - 1]?.role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "flex gap-3 md:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 md:size-10 place-items-center rounded-xl shrink-0 bg-primary/20 text-primary border border-primary/30 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 md:size-5 animate-spin" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl px-5 py-4 bg-muted/40 border border-border/40 text-sm rounded-tl-sm inline-flex items-center gap-3 font-mono text-muted-foreground uppercase tracking-wider",
								children: "Processing Query..."
							})]
						})]
					}),
					messages.length <= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 md:px-6 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3" }), " Suggested Queries"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => send(s),
								className: "text-xs font-mono px-3 py-2 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all text-left max-w-full bg-card",
								children: ["> ", s]
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 md:p-6 bg-muted/10 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 items-end relative group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity blur duration-500 pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									ref: inputRef,
									value: input,
									onChange: (e) => setInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									},
									placeholder: "Enter query parameters...",
									rows: 1,
									className: "resize-none rounded-xl min-h-[52px] max-h-40 bg-card border-border/80 focus-visible:ring-primary/50 text-base py-3.5 relative z-10 shadow-sm",
									disabled: loading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => send(),
									disabled: loading || !input.trim(),
									className: "rounded-xl h-[52px] w-[52px] shrink-0 p-0 shadow-sm relative z-10 group/btn",
									"aria-label": "Send query",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 rounded-xl" }), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin relative z-10" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5 relative z-10" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted-foreground mt-3 text-center font-mono uppercase tracking-widest opacity-60",
							children: "Notice: AI synthesized data may contain variances. Cross-reference with official DoTE publications."
						})]
					})
				]
			})
		})
	})] });
}
//#endregion
export { ChatPage as component };
