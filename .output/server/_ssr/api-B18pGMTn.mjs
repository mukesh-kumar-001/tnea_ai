import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-B18pGMTn.js
var mapBackendToMockCollege = (c) => {
	return {
		id: c.id,
		code: c.tnea_code,
		name: c.name,
		autonomous: c.autonomous,
		shortName: c.name.split(" ").slice(0, 3).join(" "),
		district: c.district || "Unknown",
		address: c.district ? `${c.district}, Tamil Nadu` : "Tamil Nadu",
		type: c.type || "Self-Financing",
		naac: "Not Accredited",
		nba: false,
		established: c.established_year || 2e3,
		fees: c.fees && c.fees.length > 0 ? c.fees[0].tuition_fee + (c.fees[0].other_fees || 0) : 0,
		hostel: c.hostel ? c.hostel.boys_hostel_available || c.hostel.girls_hostel_available : false,
		hostelFees: c.hostel?.annual_fee || 0,
		placementPercentage: c.placements?.placement_percentage || 0,
		highestPackage: c.placements?.highest_package || 0,
		averagePackage: c.placements?.average_package || 0,
		branches: c.branches ? c.branches.map((b) => b.name) : [],
		recruiters: [],
		facilities: c.facilities ? [
			...c.facilities.has_library ? ["Central Library"] : [],
			...c.facilities.has_sports ? ["Sports Complex"] : [],
			...c.facilities.has_transport ? ["Transport"] : []
		] : [],
		scholarships: [],
		cutoffs: [],
		summary: c.name
	};
};
var fetchColleges = async (page = 1, perPage = 20) => {
	const res = await fetch(`/api/colleges/?page=${page}&per_page=${perPage}`);
	if (!res.ok) throw new Error("Failed to fetch colleges");
	const data = await res.json();
	return {
		...data,
		colleges: data.colleges.map(mapBackendToMockCollege)
	};
};
var fetchAllCollegesList = async () => {
	const res = await fetch(`/api/colleges/?page=1&per_page=1000`);
	if (!res.ok) throw new Error("Failed to fetch all colleges");
	return (await res.json()).colleges.map(mapBackendToMockCollege);
};
var fetchAllBranches = async () => {
	const res = await fetch(`/api/branches/`);
	if (!res.ok) throw new Error("Failed to fetch branches");
	return (await res.json()).branches;
};
var fetchCutoffs = async (filters) => {
	const params = new URLSearchParams();
	Object.entries(filters).forEach(([k, v]) => {
		if (v) params.append(k, String(v));
	});
	const res = await fetch(`/api/cutoffs/?${params.toString()}`);
	if (!res.ok) throw new Error("Failed to fetch cutoffs");
	return await res.json();
};
var fetchRecommendations = async (payload) => {
	const res = await fetch(`/api/recommendations/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!res.ok) throw new Error("Failed to fetch recommendations");
	return await res.json();
};
var useColleges = (page = 1, perPage = 20) => {
	return useQuery({
		queryKey: [
			"colleges",
			page,
			perPage
		],
		queryFn: () => fetchColleges(page, perPage)
	});
};
var useAllColleges = () => {
	return useQuery({
		queryKey: ["all-colleges"],
		queryFn: fetchAllCollegesList
	});
};
var useBranches = () => {
	return useQuery({
		queryKey: ["branches"],
		queryFn: fetchAllBranches
	});
};
var useCutoffs = (filters) => {
	return useQuery({
		queryKey: ["cutoffs", filters],
		queryFn: () => fetchCutoffs(filters)
	});
};
//#endregion
export { useCutoffs as a, useColleges as i, useAllColleges as n, useBranches as r, fetchRecommendations as t };
