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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"19-yHADZo6lKl+mSNPU9098EiqzPCE\"",
		"mtime": "2026-07-16T12:04:50.627Z",
		"size": 25,
		"path": "../public/robots.txt"
	},
	"/assets/about-BsJ_Rp58.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1928-b5feGbFvTS+fDdEM3xUn34l6+TE\"",
		"mtime": "2026-07-17T10:31:02.477Z",
		"size": 6440,
		"path": "../public/assets/about-BsJ_Rp58.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-16T12:04:50.627Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/activity-Dwy9J7hx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-16IaTvm9OvJQu6/tiGl4txG82l8\"",
		"mtime": "2026-07-17T10:31:02.481Z",
		"size": 232,
		"path": "../public/assets/activity-Dwy9J7hx.js"
	},
	"/assets/ai-chat-CCPY8lXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2220-hcoAJuI7eGcoDH6k1XSAP92hMMc\"",
		"mtime": "2026-07-17T10:31:02.483Z",
		"size": 8736,
		"path": "../public/assets/ai-chat-CCPY8lXY.js"
	},
	"/assets/api-CiPJWWHe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b68-NK2So8w0D7NYomiwXGBXtL6jCSA\"",
		"mtime": "2026-07-17T10:31:02.484Z",
		"size": 11112,
		"path": "../public/assets/api-CiPJWWHe.js"
	},
	"/assets/badge-1m_4yAFD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"314-4jn1/u/a2XQwZfPU87SIAa8XpMU\"",
		"mtime": "2026-07-17T10:31:02.485Z",
		"size": 788,
		"path": "../public/assets/badge-1m_4yAFD.js"
	},
	"/assets/building-2-CYDOkkTy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-daZ1OuPAZtZSVpnkmtG4KjvIy04\"",
		"mtime": "2026-07-17T10:31:02.487Z",
		"size": 381,
		"path": "../public/assets/building-2-CYDOkkTy.js"
	},
	"/assets/chevron-up-BdhxS4gm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-B0qCiWOszaQ5ZxK/xkmdbpeWLk8\"",
		"mtime": "2026-07-17T10:31:02.488Z",
		"size": 201,
		"path": "../public/assets/chevron-up-BdhxS4gm.js"
	},
	"/assets/circle-alert-jWnmCxwD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-aZX4BiArom7Zz9fWQ4XxUAMNSnI\"",
		"mtime": "2026-07-17T10:31:02.491Z",
		"size": 248,
		"path": "../public/assets/circle-alert-jWnmCxwD.js"
	},
	"/assets/choice-filling-CKj5jarD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"357b-4fsbnYvgQRqEDwSacN+BMeWuBgM\"",
		"mtime": "2026-07-17T10:31:02.490Z",
		"size": 13691,
		"path": "../public/assets/choice-filling-CKj5jarD.js"
	},
	"/assets/colleges-Bd3jI3Pw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-QnbWcGX2WOqmfxviHnpXj33L650\"",
		"mtime": "2026-07-17T10:31:02.492Z",
		"size": 156,
		"path": "../public/assets/colleges-Bd3jI3Pw.js"
	},
	"/assets/colleges.index-MQV-1F_q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3308-4JUT4DfOiEn5iRGDzAp+GCZgYdg\"",
		"mtime": "2026-07-17T10:31:02.497Z",
		"size": 13064,
		"path": "../public/assets/colleges.index-MQV-1F_q.js"
	},
	"/assets/colleges._code-Ck2Srcv_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c0a-++SbgDDwmifMSlVVQM1dxspcJ7g\"",
		"mtime": "2026-07-17T10:31:02.494Z",
		"size": 31754,
		"path": "../public/assets/colleges._code-Ck2Srcv_.js"
	},
	"/assets/compare-Dk0tLWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c81-WksTj0kBidmaAdBVG/kYcjEnmwA\"",
		"mtime": "2026-07-17T10:31:02.500Z",
		"size": 11393,
		"path": "../public/assets/compare-Dk0tLWC2.js"
	},
	"/assets/counselling-C53PKO7j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50d4-BRDVNRNfsGasYzXd0lbSk3dDojE\"",
		"mtime": "2026-07-17T10:31:02.501Z",
		"size": 20692,
		"path": "../public/assets/counselling-C53PKO7j.js"
	},
	"/assets/cutoffs-fbWB_b-9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234f-yk7Q6aJmxrYea3NjMQGUPD7+0tQ\"",
		"mtime": "2026-07-17T10:31:02.503Z",
		"size": 9039,
		"path": "../public/assets/cutoffs-fbWB_b-9.js"
	},
	"/assets/database-B-DXycN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-aNw/FLqTOGib77F3M55ytbczhMc\"",
		"mtime": "2026-07-17T10:31:02.506Z",
		"size": 241,
		"path": "../public/assets/database-B-DXycN2.js"
	},
	"/assets/dashboard-DD92U1gV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e20-+mQQP50UeEUNFwnq8poEWxVn/CY\"",
		"mtime": "2026-07-17T10:31:02.505Z",
		"size": 7712,
		"path": "../public/assets/dashboard-DD92U1gV.js"
	},
	"/assets/dist-C-JFb3wx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d25b-VlXRE+WKc4N357ZyhqAL0KY1bao\"",
		"mtime": "2026-07-17T10:31:02.510Z",
		"size": 53851,
		"path": "../public/assets/dist-C-JFb3wx.js"
	},
	"/assets/dist-D_stDP3c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"550-VwJMifijNNxlcVBq3sAJOsIKqfI\"",
		"mtime": "2026-07-17T10:31:02.515Z",
		"size": 1360,
		"path": "../public/assets/dist-D_stDP3c.js"
	},
	"/assets/engineering-bg-XEFDWbvJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b769-DJk58ERrrXxHyWy2LinkNygABDg\"",
		"mtime": "2026-07-17T10:31:02.522Z",
		"size": 178025,
		"path": "../public/assets/engineering-bg-XEFDWbvJ.js"
	},
	"/assets/index-DmYE0YOQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"579ae-SMeX5G0a07uFNQZ0BRwae8l9Ct8\"",
		"mtime": "2026-07-17T10:31:02.474Z",
		"size": 358830,
		"path": "../public/assets/index-DmYE0YOQ.js"
	},
	"/assets/easter-egg-Bowv1b5e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6246-wUkrYw9pK2VnogYYhdHXz3JdZtE\"",
		"mtime": "2026-07-17T10:31:02.520Z",
		"size": 942662,
		"path": "../public/assets/easter-egg-Bowv1b5e.js"
	},
	"/assets/download-CfAiikMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Ov77V99zGUAyoHaZDeFeDAjxbGM\"",
		"mtime": "2026-07-17T10:31:02.517Z",
		"size": 230,
		"path": "../public/assets/download-CfAiikMw.js"
	},
	"/assets/input-DL64x18T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278-ZWqlgzuZz1z2XWCFJY4fUUZQzwI\"",
		"mtime": "2026-07-17T10:31:02.523Z",
		"size": 632,
		"path": "../public/assets/input-DL64x18T.js"
	},
	"/assets/label-60sC6-QA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-C/G82mqe6JE6yw8HxZAktEK/5lA\"",
		"mtime": "2026-07-17T10:31:02.525Z",
		"size": 636,
		"path": "../public/assets/label-60sC6-QA.js"
	},
	"/assets/loader-circle-Cl2TaoGb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-FIC1mZ5SUvdgU011+4Jenr10x2s\"",
		"mtime": "2026-07-17T10:31:02.526Z",
		"size": 142,
		"path": "../public/assets/loader-circle-Cl2TaoGb.js"
	},
	"/assets/map-pin-C9sdoSbL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-OI5l42XrzEvUOEO0c5EB8YtZfvU\"",
		"mtime": "2026-07-17T10:31:02.529Z",
		"size": 257,
		"path": "../public/assets/map-pin-C9sdoSbL.js"
	},
	"/assets/mock-data-BOTfpP7r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26ea-iH+Eb1IqZV3JwSQJ4PkNgdued68\"",
		"mtime": "2026-07-17T10:31:02.532Z",
		"size": 9962,
		"path": "../public/assets/mock-data-BOTfpP7r.js"
	},
	"/assets/LineChart-DqjYl8jG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c5c8-KoV+QYMt5tSNo3jD4LBFqC6u6Dc\"",
		"mtime": "2026-07-17T10:31:02.475Z",
		"size": 378312,
		"path": "../public/assets/LineChart-DqjYl8jG.js"
	},
	"/assets/plus-PLeFrzQf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-/GZQiy5DFRaxSqvd4uRhsSWewu4\"",
		"mtime": "2026-07-17T10:31:02.533Z",
		"size": 151,
		"path": "../public/assets/plus-PLeFrzQf.js"
	},
	"/assets/rank-predictor-BUszx6G8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25aa-yrfJy73oZ20Gc6bDwYC46SzBgsg\"",
		"mtime": "2026-07-17T10:31:02.535Z",
		"size": 9642,
		"path": "../public/assets/rank-predictor-BUszx6G8.js"
	},
	"/assets/routes-BNXF8Ody.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2716-zRDCaKZKztIUUh4EA0Ug5i3MJo4\"",
		"mtime": "2026-07-17T10:31:02.536Z",
		"size": 10006,
		"path": "../public/assets/routes-BNXF8Ody.js"
	},
	"/assets/searchable-select-Bmm1XKQX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d5d-rz1nd7vPM9UCN0Qx3+luyRrvv2o\"",
		"mtime": "2026-07-17T10:31:02.538Z",
		"size": 23901,
		"path": "../public/assets/searchable-select-Bmm1XKQX.js"
	},
	"/assets/select-oK-dymx4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"571d-ADSPl/sYXFzeCRtGxcsOnl13Cig\"",
		"mtime": "2026-07-17T10:31:02.539Z",
		"size": 22301,
		"path": "../public/assets/select-oK-dymx4.js"
	},
	"/assets/shield-check-c4oNNWzR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-+1FbTcYrKBCMFzyyS2HyyIKqCVI\"",
		"mtime": "2026-07-17T10:31:02.541Z",
		"size": 318,
		"path": "../public/assets/shield-check-c4oNNWzR.js"
	},
	"/assets/skeleton-wIgYW-kx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5-OB5gRjRXgcxJz/HMvp28QBehcX0\"",
		"mtime": "2026-07-17T10:31:02.543Z",
		"size": 453,
		"path": "../public/assets/skeleton-wIgYW-kx.js"
	},
	"/assets/stat-card-D-wEx99u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d0-YDNcPrKcVQU+2g2aB1o+esfEERU\"",
		"mtime": "2026-07-17T10:31:02.550Z",
		"size": 1488,
		"path": "../public/assets/stat-card-D-wEx99u.js"
	},
	"/assets/styles-UQ4Yu7U_.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1d225-ijK8HZoqnuwKMAwBmzp+cuAo13g\"",
		"mtime": "2026-07-17T10:31:02.563Z",
		"size": 119333,
		"path": "../public/assets/styles-UQ4Yu7U_.css"
	},
	"/assets/switch-DZdeY6Ch.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3349-FaBabtHdVQX17imFOMwSQBdyeK4\"",
		"mtime": "2026-07-17T10:31:02.553Z",
		"size": 13129,
		"path": "../public/assets/switch-DZdeY6Ch.js"
	},
	"/assets/terminal-Bisy3_1c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-imgs9/l77UsVplO2tua+dzUcKFo\"",
		"mtime": "2026-07-17T10:31:02.555Z",
		"size": 160,
		"path": "../public/assets/terminal-Bisy3_1c.js"
	},
	"/assets/use-cascading-filters-DyG5WHMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49d-hzHqO5QTOd1v6rdQ8iIPAe5fnnc\"",
		"mtime": "2026-07-17T10:31:02.556Z",
		"size": 1181,
		"path": "../public/assets/use-cascading-filters-DyG5WHMm.js"
	},
	"/assets/users-oidFIrzg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-mGPIGqq2Uq5ujKuCWmXU1cA9ydE\"",
		"mtime": "2026-07-17T10:31:02.560Z",
		"size": 304,
		"path": "../public/assets/users-oidFIrzg.js"
	},
	"/assets/useStore-BoEIJoeC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4529-hTFHB1BLNVA8hsWqr9YYjMtlUJk\"",
		"mtime": "2026-07-17T10:31:02.558Z",
		"size": 17705,
		"path": "../public/assets/useStore-BoEIJoeC.js"
	},
	"/assets/with-selector-DB4IYXk9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2829-EazBbXAR6sF8GoSaFxWG7bKsyyo\"",
		"mtime": "2026-07-17T10:31:02.561Z",
		"size": 10281,
		"path": "../public/assets/with-selector-DB4IYXk9.js"
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
