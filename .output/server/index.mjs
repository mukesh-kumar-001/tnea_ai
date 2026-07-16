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
		"mtime": "2026-07-14T12:04:51.000Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-07-14T12:04:51.000Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/about-DIUcHbos.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191c-ZM7qHQUotxlLhmbNy7afBeFdjKs\"",
		"mtime": "2026-07-15T12:01:48.289Z",
		"size": 6428,
		"path": "../public/assets/about-DIUcHbos.js"
	},
	"/assets/api-Gd93FHTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a8d-xMeD2BiSkEYSvOp8nQDMwJnRR80\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 10893,
		"path": "../public/assets/api-Gd93FHTz.js"
	},
	"/assets/badge-B6oanjt6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"314-T9vt9SaP4eOGJFSDeeCQyl/9Of0\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 788,
		"path": "../public/assets/badge-B6oanjt6.js"
	},
	"/assets/activity-B9-D53eD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-V/zqXsMjAZQkK75+KiRxxeQYjSs\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 232,
		"path": "../public/assets/activity-B9-D53eD.js"
	},
	"/assets/building-2-BzUpvVjV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-Kscr6b9+cLLUqW2uJSP72XQO6b4\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 381,
		"path": "../public/assets/building-2-BzUpvVjV.js"
	},
	"/assets/ai-chat-Cw7m0g5d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2220-pB1CQ79iIEZiXKKlQf31y26YT7k\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 8736,
		"path": "../public/assets/ai-chat-Cw7m0g5d.js"
	},
	"/assets/colleges-mpZi-oxn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-vd1HPrtUCqAZo0aEn01S9+mPK1c\"",
		"mtime": "2026-07-15T12:01:48.306Z",
		"size": 156,
		"path": "../public/assets/colleges-mpZi-oxn.js"
	},
	"/assets/colleges.index-Cp0aWqWg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"321a-q2AAv6tDSHCOcXmG2a+z4E0o6SI\"",
		"mtime": "2026-07-15T12:01:48.306Z",
		"size": 12826,
		"path": "../public/assets/colleges.index-Cp0aWqWg.js"
	},
	"/assets/colleges._code-D7S0e7P1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"726f-Be3NTgV40HSCsAhoo9qZS3XRuV8\"",
		"mtime": "2026-07-15T12:01:48.306Z",
		"size": 29295,
		"path": "../public/assets/colleges._code-D7S0e7P1.js"
	},
	"/assets/counselling-CpuuyHzu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46db-y2yb3lI4MYkn0ak+G8R33o8LQhw\"",
		"mtime": "2026-07-15T12:01:48.313Z",
		"size": 18139,
		"path": "../public/assets/counselling-CpuuyHzu.js"
	},
	"/assets/compare-CIqPUbgZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23ce-dlvel/C1oxuGKAgzpGC+Synd8i0\"",
		"mtime": "2026-07-15T12:01:48.313Z",
		"size": 9166,
		"path": "../public/assets/compare-CIqPUbgZ.js"
	},
	"/assets/cutoffs-B41veQ3Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"239a-DPeWZb7gguYuM4D+IyyelUUV5Rk\"",
		"mtime": "2026-07-15T12:01:48.313Z",
		"size": 9114,
		"path": "../public/assets/cutoffs-B41veQ3Z.js"
	},
	"/assets/dashboard-DxbAGkt0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e20-BDIGF01r/VF4/7iPY+KRfRWh0m8\"",
		"mtime": "2026-07-15T12:01:48.313Z",
		"size": 7712,
		"path": "../public/assets/dashboard-DxbAGkt0.js"
	},
	"/assets/database-C6YVXMol.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-BpcEfPgdWqtfIl2UPygLFa1oOms\"",
		"mtime": "2026-07-15T12:01:48.313Z",
		"size": 241,
		"path": "../public/assets/database-C6YVXMol.js"
	},
	"/assets/dist-BLHTSXbc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"199c-vQCQE1uBKgQF3aPXIo3OFP+incE\"",
		"mtime": "2026-07-15T12:01:48.331Z",
		"size": 6556,
		"path": "../public/assets/dist-BLHTSXbc.js"
	},
	"/assets/download-nu7G21AM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-YVUcflFjkTV/UHphx62Jd5/lMcA\"",
		"mtime": "2026-07-15T12:01:48.331Z",
		"size": 230,
		"path": "../public/assets/download-nu7G21AM.js"
	},
	"/assets/engineering-bg-ToDrzyqX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b706-nTUDgWN0wFpo1eeGaQ6LgMqlm6I\"",
		"mtime": "2026-07-15T12:01:48.331Z",
		"size": 177926,
		"path": "../public/assets/engineering-bg-ToDrzyqX.js"
	},
	"/assets/input-DmREmfN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278-5OznEwm7JPB07xGi5e/GtNd5I2M\"",
		"mtime": "2026-07-15T12:01:48.340Z",
		"size": 632,
		"path": "../public/assets/input-DmREmfN2.js"
	},
	"/assets/LineChart-t2A5Z3G5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c5c8-SLNW/lkzsXKPZKuvNRN8wNzXcd0\"",
		"mtime": "2026-07-15T12:01:48.289Z",
		"size": 378312,
		"path": "../public/assets/LineChart-t2A5Z3G5.js"
	},
	"/assets/loader-circle-BfpAVMaW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-ddwARFgBFxsB6aOB90cqrSXVqc0\"",
		"mtime": "2026-07-15T12:01:48.340Z",
		"size": 142,
		"path": "../public/assets/loader-circle-BfpAVMaW.js"
	},
	"/assets/index-8Fmjuhgc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57a57-DM3s6iLBxbUcvARjEwKmWlL53wk\"",
		"mtime": "2026-07-15T12:01:48.281Z",
		"size": 358999,
		"path": "../public/assets/index-8Fmjuhgc.js"
	},
	"/assets/choice-filling-IzUty7Ra.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31a7-OwLqLm+1tZdfN0lGu8fzygbf8AM\"",
		"mtime": "2026-07-15T12:01:48.298Z",
		"size": 12711,
		"path": "../public/assets/choice-filling-IzUty7Ra.js"
	},
	"/assets/easter-egg-B7dwmJNX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6246-SVC4uH4EAIhvQDa/zx/RxBReD6I\"",
		"mtime": "2026-07-15T12:01:48.331Z",
		"size": 942662,
		"path": "../public/assets/easter-egg-B7dwmJNX.js"
	},
	"/assets/plus-BeAoOin-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-78DsmLBOvYtQJofDoQVqAAaVlOE\"",
		"mtime": "2026-07-15T12:01:48.340Z",
		"size": 151,
		"path": "../public/assets/plus-BeAoOin-.js"
	},
	"/assets/mock-data-C6pOvLrW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"295e-BDlyc1KN+iR6wsrH6iAEnmP8Nnw\"",
		"mtime": "2026-07-15T12:01:48.340Z",
		"size": 10590,
		"path": "../public/assets/mock-data-C6pOvLrW.js"
	},
	"/assets/rank-predictor-fFvhJ2Gd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"262e-iNCZP++9268cwKPTOM8/sFuIqQs\"",
		"mtime": "2026-07-15T12:01:48.348Z",
		"size": 9774,
		"path": "../public/assets/rank-predictor-fFvhJ2Gd.js"
	},
	"/assets/routes-BSYiB3P9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271c-VdvHikDsUkXCw0KyVR8JQZg87zg\"",
		"mtime": "2026-07-15T12:01:48.348Z",
		"size": 10012,
		"path": "../public/assets/routes-BSYiB3P9.js"
	},
	"/assets/select-Da5cMp7z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"113ab-eGFBCxJ+9B0WsYlxk0EsfAjH+U8\"",
		"mtime": "2026-07-15T12:01:48.348Z",
		"size": 70571,
		"path": "../public/assets/select-Da5cMp7z.js"
	},
	"/assets/shield-check-CRTzbJxG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-U0EJq6VJCdjY1/GnbfAS1dW6gdg\"",
		"mtime": "2026-07-15T12:01:48.356Z",
		"size": 318,
		"path": "../public/assets/shield-check-CRTzbJxG.js"
	},
	"/assets/skeleton-BJ82YHq7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-3rTXc9U1GR9zXtOq6fOrA3sqSjY\"",
		"mtime": "2026-07-15T12:01:48.356Z",
		"size": 649,
		"path": "../public/assets/skeleton-BJ82YHq7.js"
	},
	"/assets/stat-card-2Dai8FNc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d0-qWx+PfW43vecnJnBfulhhP4eKVk\"",
		"mtime": "2026-07-15T12:01:48.356Z",
		"size": 1488,
		"path": "../public/assets/stat-card-2Dai8FNc.js"
	},
	"/assets/styles-DJBOYl3d.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1cf43-LOEFdmQ31Au7VcgyBvfooNZrc68\"",
		"mtime": "2026-07-15T12:01:48.400Z",
		"size": 118595,
		"path": "../public/assets/styles-DJBOYl3d.css"
	},
	"/assets/switch-hkDf_wrE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331a-I9Vo36/21zC6dQVx68i6ZDF4KSA\"",
		"mtime": "2026-07-15T12:01:48.364Z",
		"size": 13082,
		"path": "../public/assets/switch-hkDf_wrE.js"
	},
	"/assets/terminal-CdXy4XJm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-anMEHRWxKRR2NL1F1bPujyX+zV0\"",
		"mtime": "2026-07-15T12:01:48.364Z",
		"size": 160,
		"path": "../public/assets/terminal-CdXy4XJm.js"
	},
	"/assets/use-cascading-filters-apKeqj_q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b1-2OVQtGHP/w5ib7vbjlLvjDGqS8U\"",
		"mtime": "2026-07-15T12:01:48.364Z",
		"size": 689,
		"path": "../public/assets/use-cascading-filters-apKeqj_q.js"
	},
	"/assets/users-BaszG_Jg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-MgvRcVNnWuxzYNBgUhi+iXvBgiw\"",
		"mtime": "2026-07-15T12:01:48.373Z",
		"size": 304,
		"path": "../public/assets/users-BaszG_Jg.js"
	},
	"/assets/useStore-BoEIJoeC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4529-hTFHB1BLNVA8hsWqr9YYjMtlUJk\"",
		"mtime": "2026-07-15T12:01:48.364Z",
		"size": 17705,
		"path": "../public/assets/useStore-BoEIJoeC.js"
	},
	"/assets/with-selector-DB4IYXk9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2829-EazBbXAR6sF8GoSaFxWG7bKsyyo\"",
		"mtime": "2026-07-15T12:01:48.382Z",
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
var _lazy_7W7KUe = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_7W7KUe
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
