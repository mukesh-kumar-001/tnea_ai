import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Route$15 } from "./colleges._code-BoRWLCjc.mjs";
import { nt as recordType, rt as stringType, tt as objectType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { n as generateObject, r as streamText, t as convertToModelMessages } from "../_libs/ai.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dx3Ie7nZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DJBOYl3d.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary text-2xl font-extrabold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-2xl font-extrabold tracking-tight text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground leading-relaxed",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "12",
								y1: "9",
								x2: "12",
								y2: "13"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "12",
								y1: "17",
								x2: "12.01",
								y2: "17"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-xl font-extrabold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground leading-relaxed",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var TITLE = "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant";
var DESC = "Personalized college and branch recommendations for TNEA using verified cutoff data and AI analysis. Rank predictor, choice filling, cutoff explorer.";
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: TITLE },
			{
				name: "description",
				content: DESC
			},
			{
				name: "author",
				content: "TNEA.ai"
			},
			{
				property: "og:title",
				content: TITLE
			},
			{
				property: "og:description",
				content: DESC
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{ title: "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant" },
			{
				property: "og:title",
				content: "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant"
			},
			{
				name: "twitter:title",
				content: "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant"
			},
			{
				name: "description",
				content: "Personalized college and branch recommendations for TNEA. Explore colleges, predict rank, analyse cutoffs and file smarter choices."
			},
			{
				property: "og:description",
				content: "Personalized college and branch recommendations for TNEA. Explore colleges, predict rank, analyse cutoffs and file smarter choices."
			},
			{
				name: "twitter:description",
				content: "Personalized college and branch recommendations for TNEA. Explore colleges, predict rank, analyse cutoffs and file smarter choices."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb7cce2c-0352-4161-92a4-0569e54abda9/id-preview-74d9436d--7ba64b0e-efa4-4a31-bfff-e3b997dddf3e.lovable.app-1783679128434.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb7cce2c-0352-4161-92a4-0569e54abda9/id-preview-74d9436d--7ba64b0e-efa4-4a31-bfff-e3b997dddf3e.lovable.app-1783679128434.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var BASE_URL = "";
var Route$13 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/colleges",
		"/counselling",
		"/cutoffs",
		"/rank-predictor",
		"/choice-filling",
		"/ai-chat",
		"/dashboard",
		"/about"
	].map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$10 = () => import("./rank-predictor-CaJyh7GV.mjs");
var Route$12 = createFileRoute("/rank-predictor")({
	head: () => ({ meta: [{ title: "Rank Predictor — TNEA.ai" }, {
		name: "description",
		content: "Estimate your TNEA general and community rank instantly from your cutoff marks with confidence indicator."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./dashboard-BmAuAonV.mjs");
var Route$11 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — TNEA.ai" }, {
		name: "description",
		content: "Your saved colleges, recent searches, favourite branches and AI recommendation history."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./cutoffs-CMoOujec.mjs");
var Route$10 = createFileRoute("/cutoffs")({
	head: () => ({ meta: [{ title: "Cutoff Explorer — TNEA.ai" }, {
		name: "description",
		content: "Interactive cutoff history charts across colleges, branches and communities for Tamil Nadu Engineering Admissions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./counselling-CNWif5X6.mjs");
var Route$9 = createFileRoute("/counselling")({
	head: () => ({ meta: [{ title: "AI Counselling — TNEA.ai" }, {
		name: "description",
		content: "AI-generated dream, target and safe college recommendations for TNEA based on your rank, community and preferences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./compare-Q3cI9Uf2.mjs");
var Route$8 = createFileRoute("/compare")({
	head: () => ({ meta: [{ title: "Compare Colleges — TNEA.ai" }, {
		name: "description",
		content: "Compare multiple engineering colleges side-by-side with metrics like fees, placements, cutoffs and facilities."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./colleges-DbqJwjHq.mjs");
var Route$7 = createFileRoute("/colleges")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./choice-filling-CmW68i4i.mjs");
var Route$6 = createFileRoute("/choice-filling")({
	head: () => ({ meta: [{ title: "Choice Filling Assistant — TNEA.ai" }, {
		name: "description",
		content: "Build your TNEA choice list with drag-and-drop ordering, AI optimization and duplicate detection."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./ai-chat-nFzKDYcc.mjs");
var Route$5 = createFileRoute("/ai-chat")({
	head: () => ({ meta: [{ title: "AI Assistant — TNEA.ai" }, {
		name: "description",
		content: "Chat with an AI assistant about TNEA colleges, cutoffs, placements, fees, hostels, counselling rules and seat availability."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./about-iDEoXM6y.mjs");
var Route$4 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — TNEA.ai" }, {
		name: "description",
		content: "TNEA.ai is an independent, AI-powered assistant for Tamil Nadu Engineering Admissions. Learn about our mission, data and team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-CHCjcn3c.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "TNEA.ai — AI-Powered Tamil Nadu Engineering Admissions Assistant" }, {
		name: "description",
		content: "Personalized college and branch recommendations for TNEA. Explore colleges, predict rank, analyse cutoffs and file smarter choices."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./colleges.index-vI_1bSa5.mjs");
var Route$2 = createFileRoute("/colleges/")({
	head: () => ({ meta: [{ title: "College Explorer — TNEA.ai" }, {
		name: "description",
		content: "Filter and browse Tamil Nadu engineering colleges by district, NAAC, NBA, branch, fees, hostel and placement."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function createLovableAiGatewayProvider(apiKey, opts) {
	return createOpenAICompatible({
		name: "lovable-ai-gateway",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: { "Lovable-API-Key": apiKey },
		...opts?.structuredOutputs ? { includeUsage: true } : {}
	});
}
var schema = objectType({ reasonings: recordType(stringType(), stringType()) });
var Route$1 = createFileRoute("/api/counselling")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json();
	const key = processModule.env.LOVABLE_API_KEY;
	if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
	const gateway = createLovableAiGatewayProvider(key, { structuredOutputs: true });
	const prompt = `You are a TNEA counselling advisor. For each college+branch pick below, produce a ONE-sentence reasoning (max 25 words) explaining why it fits or challenges this student. Use plain English, no jargon.

Student profile:
- Community: ${body.student.community}
- General Rank: ${body.student.genRank}, Community Rank: ${body.student.commRank}
- Cutoff: ${body.student.cutoff}/200
- Preferred branches: ${body.student.prefBranches.join(", ") || "any"}
- Preferred districts: ${body.student.prefDistricts.join(", ") || "any"}
- Budget: ₹${body.student.budget.toLocaleString("en-IN")} / year
- Hostel required: ${body.student.hostel ? "yes" : "no"}

Picks (return reasonings with key "CODE-BRANCH"):
${body.picks.map((p) => `- ${p.code}-${p.branch}: ${p.name} · expected cutoff ${p.expectedCutoff.toFixed(1)} · admission probability ${p.probability}%`).join("\n")}

Return JSON: { "reasonings": { "CODE-BRANCH": "one sentence", ... } }`;
	try {
		const { object } = await generateObject({
			model: gateway("openai/gpt-5.5"),
			schema,
			prompt
		});
		return new Response(JSON.stringify(object), { headers: { "content-type": "application/json" } });
	} catch (e) {
		console.error("counselling AI error", e);
		const reasonings = {};
		for (const p of body.picks) {
			const key = `${p.code}-${p.branch}`;
			reasonings[key] = p.probability >= 70 ? `Strong safe option — your cutoff comfortably exceeds the typical ${p.expectedCutoff.toFixed(1)} closing mark.` : p.probability >= 35 ? `Realistic target — your cutoff is close to the expected closing mark of ${p.expectedCutoff.toFixed(1)}.` : `Ambitious pick — expected closing cutoff ${p.expectedCutoff.toFixed(1)} is above your current profile.`;
		}
		return new Response(JSON.stringify({ reasonings }), { headers: { "content-type": "application/json" } });
	}
} } } });
var SYSTEM = `You are the TNEA.ai Counselling Assistant. You help Tamil Nadu Engineering Admissions (TNEA) aspirants with:
- College information, branches, cutoffs, placements, fees, hostels
- Counselling rules, quota (OC/BC/BCM/MBC/SC/SCA/ST), rounds, seat matrix
- Rank/cutoff interpretation and decision guidance

Keep answers concise, factual, formatted in short markdown. When you're unsure or the answer depends on the current year's counselling, say so and point the user to the official TNEA portal (tneaonline.org). Use INR (₹) and metric units. Never invent specific cutoff numbers you don't know — give ranges or say "check the Cutoff Explorer".`;
var Route = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json();
	const key = processModule.env.LOVABLE_API_KEY;
	if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
	const gateway = createLovableAiGatewayProvider(key);
	const uiMessages = body.messages.map((m, i) => ({
		id: String(i),
		role: m.role,
		parts: [{
			type: "text",
			text: m.content
		}]
	}));
	return streamText({
		model: gateway("openai/gpt-5.5"),
		system: SYSTEM,
		messages: await convertToModelMessages(uiMessages)
	}).toTextStreamResponse();
} } } });
var SitemapDotxmlRoute = Route$13.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$14
});
var RankPredictorRoute = Route$12.update({
	id: "/rank-predictor",
	path: "/rank-predictor",
	getParentRoute: () => Route$14
});
var DashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$14
});
var CutoffsRoute = Route$10.update({
	id: "/cutoffs",
	path: "/cutoffs",
	getParentRoute: () => Route$14
});
var CounsellingRoute = Route$9.update({
	id: "/counselling",
	path: "/counselling",
	getParentRoute: () => Route$14
});
var CompareRoute = Route$8.update({
	id: "/compare",
	path: "/compare",
	getParentRoute: () => Route$14
});
var CollegesRoute = Route$7.update({
	id: "/colleges",
	path: "/colleges",
	getParentRoute: () => Route$14
});
var ChoiceFillingRoute = Route$6.update({
	id: "/choice-filling",
	path: "/choice-filling",
	getParentRoute: () => Route$14
});
var AiChatRoute = Route$5.update({
	id: "/ai-chat",
	path: "/ai-chat",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$4.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var CollegesIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => CollegesRoute
});
var CollegesCodeRoute = Route$15.update({
	id: "/$code",
	path: "/$code",
	getParentRoute: () => CollegesRoute
});
var ApiCounsellingRoute = Route$1.update({
	id: "/api/counselling",
	path: "/api/counselling",
	getParentRoute: () => Route$14
});
var ApiChatRoute = Route.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$14
});
var CollegesRouteChildren = {
	CollegesCodeRoute,
	CollegesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AiChatRoute,
	ChoiceFillingRoute,
	CollegesRoute: CollegesRoute._addFileChildren(CollegesRouteChildren),
	CompareRoute,
	CounsellingRoute,
	CutoffsRoute,
	DashboardRoute,
	RankPredictorRoute,
	SitemapDotxmlRoute,
	ApiChatRoute,
	ApiCounsellingRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
