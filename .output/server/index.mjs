globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-16T12:04:50.627Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"19-yHADZo6lKl+mSNPU9098EiqzPCE\"",
		"mtime": "2026-07-16T12:04:50.627Z",
		"size": 25,
		"path": "../public/robots.txt"
	},
	"/assets/activity-BleKcr4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-YrU+Xt+ND7EHmiv+DrZae2AF5W8\"",
		"mtime": "2026-07-17T14:35:36.003Z",
		"size": 232,
		"path": "../public/assets/activity-BleKcr4h.js"
	},
	"/assets/about-Bse3lXzY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1928-8OQj8M7ol7pIogUbAF/Z/LAXij4\"",
		"mtime": "2026-07-17T14:35:36.000Z",
		"size": 6440,
		"path": "../public/assets/about-Bse3lXzY.js"
	},
	"/assets/ai-chat-DbrNvOqG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2220-dVqaIua8a9K+qpwZo3E7t1B9OjA\"",
		"mtime": "2026-07-17T14:35:36.006Z",
		"size": 8736,
		"path": "../public/assets/ai-chat-DbrNvOqG.js"
	},
	"/assets/building-2-CYMnYhB6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-RH7wL7dHZEwzDG9h+QR664n3FHQ\"",
		"mtime": "2026-07-17T14:35:36.011Z",
		"size": 381,
		"path": "../public/assets/building-2-CYMnYhB6.js"
	},
	"/assets/api-CdrXPxm7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b68-dBKztdBOthbMAg2u73CBni4OZsY\"",
		"mtime": "2026-07-17T14:35:36.008Z",
		"size": 11112,
		"path": "../public/assets/api-CdrXPxm7.js"
	},
	"/assets/badge-BXHXKMgZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"314-0KzW8WtmrJ2I5qmqMwIaCOaBixc\"",
		"mtime": "2026-07-17T14:35:36.010Z",
		"size": 788,
		"path": "../public/assets/badge-BXHXKMgZ.js"
	},
	"/assets/chevron-up-BKDNBPz-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-53bea5la4U218m4TJGr5VIrdH14\"",
		"mtime": "2026-07-17T14:35:36.013Z",
		"size": 201,
		"path": "../public/assets/chevron-up-BKDNBPz-.js"
	},
	"/assets/choice-filling-nnXGOUAi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"357b-7ErqKX8xdOlS5epAlDcFVGhZ3Gs\"",
		"mtime": "2026-07-17T14:35:36.014Z",
		"size": 13691,
		"path": "../public/assets/choice-filling-nnXGOUAi.js"
	},
	"/assets/circle-alert-Dx3L59HX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-kahedv+UBX0xCXcTE2MQiG385xM\"",
		"mtime": "2026-07-17T14:35:36.016Z",
		"size": 248,
		"path": "../public/assets/circle-alert-Dx3L59HX.js"
	},
	"/assets/colleges-wbL247tL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-wXwqzDi6L+74YbdD581EnDxkoFg\"",
		"mtime": "2026-07-17T14:35:36.017Z",
		"size": 156,
		"path": "../public/assets/colleges-wbL247tL.js"
	},
	"/assets/colleges.index-CwOS-r5E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331a-PfnGx2cgX/wH68tJVR8H9xXRPzo\"",
		"mtime": "2026-07-17T14:35:36.023Z",
		"size": 13082,
		"path": "../public/assets/colleges.index-CwOS-r5E.js"
	},
	"/assets/colleges._code-DDcA2OY2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ce0-CPX76pd6kQlM2lpwXa6FZjPafDw\"",
		"mtime": "2026-07-17T14:35:36.017Z",
		"size": 31968,
		"path": "../public/assets/colleges._code-DDcA2OY2.js"
	},
	"/assets/cutoffs-BG0afBuC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23d9-o2nTRLSTkPnK4CvbHDq5YMCXqFA\"",
		"mtime": "2026-07-17T14:35:36.027Z",
		"size": 9177,
		"path": "../public/assets/cutoffs-BG0afBuC.js"
	},
	"/assets/counselling-CIFZeAwF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50d4-8UQlJfn5kIhJn0IhirzM0cSLF1M\"",
		"mtime": "2026-07-17T14:35:36.026Z",
		"size": 20692,
		"path": "../public/assets/counselling-CIFZeAwF.js"
	},
	"/assets/compare-EbCIYFm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c8d-dbqImg/xWe4XtoHDmjPuVdg6Qnc\"",
		"mtime": "2026-07-17T14:35:36.024Z",
		"size": 11405,
		"path": "../public/assets/compare-EbCIYFm9.js"
	},
	"/assets/dashboard-C4abCuTe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e20-yQ8jLMKvJ6oyDb/BatmPB3ycMws\"",
		"mtime": "2026-07-17T14:35:36.029Z",
		"size": 7712,
		"path": "../public/assets/dashboard-C4abCuTe.js"
	},
	"/assets/database-BpQOBECF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-xjOgiwdilTi4jGaPmvOnFV1xcek\"",
		"mtime": "2026-07-17T14:35:36.030Z",
		"size": 241,
		"path": "../public/assets/database-BpQOBECF.js"
	},
	"/assets/dist-BvMkffs3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"550-4o9wl4stybxv142XyJ2umIGEqhI\"",
		"mtime": "2026-07-17T14:35:36.031Z",
		"size": 1360,
		"path": "../public/assets/dist-BvMkffs3.js"
	},
	"/assets/dist-CpSV3x0j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d25b-PYKmLdFN0rdciT686Y3JcF1sTTA\"",
		"mtime": "2026-07-17T14:35:36.033Z",
		"size": 53851,
		"path": "../public/assets/dist-CpSV3x0j.js"
	},
	"/assets/download-CS9-q-YF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-t1A2vsM+rOiKJUvjh4xs3UoNaks\"",
		"mtime": "2026-07-17T14:35:36.034Z",
		"size": 230,
		"path": "../public/assets/download-CS9-q-YF.js"
	},
	"/assets/engineering-bg-CYO0qN60.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b769-gy9FvX9sqddSdpLGOcjY2rOm3CE\"",
		"mtime": "2026-07-17T14:35:36.047Z",
		"size": 178025,
		"path": "../public/assets/engineering-bg-CYO0qN60.js"
	},
	"/assets/index-DwzAxyAt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"579ae-Qs4btXesTMf9rQg7HaAZGjDVJU4\"",
		"mtime": "2026-07-17T14:35:35.997Z",
		"size": 358830,
		"path": "../public/assets/index-DwzAxyAt.js"
	},
	"/assets/easter-egg-BHLy8HOk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6246-c4Oi9IyqMVknsmQKZSCTYI+RJWE\"",
		"mtime": "2026-07-17T14:35:36.037Z",
		"size": 942662,
		"path": "../public/assets/easter-egg-BHLy8HOk.js"
	},
	"/assets/input-DK5PmIgG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278-uI7qYYrgvtR7CwiM3h1dIsyxv0I\"",
		"mtime": "2026-07-17T14:35:36.050Z",
		"size": 632,
		"path": "../public/assets/input-DK5PmIgG.js"
	},
	"/assets/LineChart-BWZaYB6s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c5c8-Gulps/eCx8aLz0O9oTP52OEApcQ\"",
		"mtime": "2026-07-17T14:35:35.999Z",
		"size": 378312,
		"path": "../public/assets/LineChart-BWZaYB6s.js"
	},
	"/assets/loader-circle-CGrpIQ_1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-WONLd+Xf2iCEX1UUYCndKEEHXYE\"",
		"mtime": "2026-07-17T14:35:36.058Z",
		"size": 142,
		"path": "../public/assets/loader-circle-CGrpIQ_1.js"
	},
	"/assets/map-pin-BFT-uqmB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-0Vc6AwSakpNgeByxeFaBZSxctOA\"",
		"mtime": "2026-07-17T14:35:36.059Z",
		"size": 257,
		"path": "../public/assets/map-pin-BFT-uqmB.js"
	},
	"/assets/mock-data-BOTfpP7r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26ea-iH+Eb1IqZV3JwSQJ4PkNgdued68\"",
		"mtime": "2026-07-17T14:35:36.060Z",
		"size": 9962,
		"path": "../public/assets/mock-data-BOTfpP7r.js"
	},
	"/assets/plus-Cbm6NJQj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-a0ZXuizccwKQGBvb3X4qxXWALqA\"",
		"mtime": "2026-07-17T14:35:36.061Z",
		"size": 151,
		"path": "../public/assets/plus-Cbm6NJQj.js"
	},
	"/assets/routes-McKvcqL8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2716-KKm8lznzOeno5Gb3dP99QQEqjjY\"",
		"mtime": "2026-07-17T14:35:36.064Z",
		"size": 10006,
		"path": "../public/assets/routes-McKvcqL8.js"
	},
	"/assets/rank-predictor-BAj1F5rJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25aa-okvR0OAOoF2RHczEFXKJ+AeYQcY\"",
		"mtime": "2026-07-17T14:35:36.063Z",
		"size": 9642,
		"path": "../public/assets/rank-predictor-BAj1F5rJ.js"
	},
	"/assets/searchable-select-BT9BycWm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d5d-5HPNcuOPHXesnuZKRFXgl1KC7dQ\"",
		"mtime": "2026-07-17T14:35:36.065Z",
		"size": 23901,
		"path": "../public/assets/searchable-select-BT9BycWm.js"
	},
	"/assets/select-Kxys5t0v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"571d-dguqz8hGFG4MWPbh3dk+pra6tDM\"",
		"mtime": "2026-07-17T14:35:36.067Z",
		"size": 22301,
		"path": "../public/assets/select-Kxys5t0v.js"
	},
	"/assets/shield-check-DNLb2eh0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-KFIaLLr/WI2vCAXfD8qVF5pMdT0\"",
		"mtime": "2026-07-17T14:35:36.068Z",
		"size": 318,
		"path": "../public/assets/shield-check-DNLb2eh0.js"
	},
	"/assets/skeleton-Bl4Vvlqt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5-nHHgnQjbwjdGqR0+V7CrB8AjEGo\"",
		"mtime": "2026-07-17T14:35:36.075Z",
		"size": 453,
		"path": "../public/assets/skeleton-Bl4Vvlqt.js"
	},
	"/assets/stat-card-C3KuGg5f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d0-XsKGJG3jrxgxvqU2lS9DHNIzgP4\"",
		"mtime": "2026-07-17T14:35:36.077Z",
		"size": 1488,
		"path": "../public/assets/stat-card-C3KuGg5f.js"
	},
	"/assets/styles-hgIxNcxy.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1d245-k1mS/zKkHfrxXRfwc+6Zalf89BM\"",
		"mtime": "2026-07-17T14:35:36.089Z",
		"size": 119365,
		"path": "../public/assets/styles-hgIxNcxy.css"
	},
	"/assets/switch-Dm2St9nu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3349-SFMwo25t3cAKqCuFZ4eTrlpIdgw\"",
		"mtime": "2026-07-17T14:35:36.078Z",
		"size": 13129,
		"path": "../public/assets/switch-Dm2St9nu.js"
	},
	"/assets/terminal-DDxpVPtX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-pd98oTmKBdw4v7FZuYtUCbrkho0\"",
		"mtime": "2026-07-17T14:35:36.079Z",
		"size": 160,
		"path": "../public/assets/terminal-DDxpVPtX.js"
	},
	"/assets/use-cascading-filters-DyG5WHMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49d-hzHqO5QTOd1v6rdQ8iIPAe5fnnc\"",
		"mtime": "2026-07-17T14:35:36.081Z",
		"size": 1181,
		"path": "../public/assets/use-cascading-filters-DyG5WHMm.js"
	},
	"/assets/users-DzRivybd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-0569KjVt4niCMUWMTev3fW5s6Jc\"",
		"mtime": "2026-07-17T14:35:36.081Z",
		"size": 304,
		"path": "../public/assets/users-DzRivybd.js"
	},
	"/assets/useStore-BoEIJoeC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4529-hTFHB1BLNVA8hsWqr9YYjMtlUJk\"",
		"mtime": "2026-07-17T14:35:36.081Z",
		"size": 17705,
		"path": "../public/assets/useStore-BoEIJoeC.js"
	},
	"/assets/with-selector-DB4IYXk9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2829-EazBbXAR6sF8GoSaFxWG7bKsyyo\"",
		"mtime": "2026-07-17T14:35:36.089Z",
		"size": 10281,
		"path": "../public/assets/with-selector-DB4IYXk9.js"
	},
	"/assets/label-CBbymuGH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-D/0vCO9JgOS1kyuDGyKnMqYuPNY\"",
		"mtime": "2026-07-17T14:35:36.055Z",
		"size": 636,
		"path": "../public/assets/label-CBbymuGH.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy__I514N = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy__I514N
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
