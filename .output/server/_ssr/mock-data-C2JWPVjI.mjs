import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { u as cn } from "./engineering-bg-BVrbPAIv.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-C2JWPVjI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var COMMUNITIES = [
	"OC",
	"BC",
	"BCM",
	"MBC",
	"SC",
	"SCA",
	"ST"
];
var DISTRICTS = [
	"Chennai",
	"Coimbatore",
	"Madurai",
	"Tiruchirappalli",
	"Salem",
	"Tirunelveli",
	"Erode",
	"Vellore",
	"Thanjavur",
	"Kanchipuram",
	"Kanyakumari",
	"Namakkal",
	"Dindigul",
	"Karur",
	"Sivaganga"
];
var BRANCHES = [
	"Computer Science and Engineering",
	"Information Technology",
	"Electronics and Communication Engineering",
	"Electrical and Electronics Engineering",
	"Mechanical Engineering",
	"Civil Engineering",
	"Artificial Intelligence and Data Science",
	"Chemical Engineering",
	"Biotechnology",
	"Aeronautical Engineering",
	"Automobile Engineering",
	"Robotics and Automation"
];
var cutoffs = (base, branches) => {
	const rows = [];
	const years = [
		2020,
		2021,
		2022,
		2023,
		2024
	];
	const comms = [
		"OC",
		"BC",
		"MBC",
		"SC",
		"ST"
	];
	const commAdj = {
		OC: 0,
		BC: -1.2,
		BCM: -2,
		MBC: -3,
		SC: -8,
		SCA: -10,
		ST: -12
	};
	for (const branch of branches) {
		const bAdj = branch.includes("Computer") ? 3 : branch.includes("Information") ? 2 : branch.includes("Electronics") ? 1 : branch.includes("Artificial") ? 2.5 : 0;
		for (const year of years) {
			const yAdj = (year - 2024) * .4;
			for (const c of comms) rows.push({
				year,
				branch,
				community: c,
				cutoff: Math.max(120, Math.min(200, +(base + bAdj + commAdj[c] + yAdj + (Math.random() * 1.2 - .6)).toFixed(1)))
			});
		}
	}
	return rows;
};
var recruiters = [
	"TCS",
	"Infosys",
	"Wipro",
	"Zoho",
	"Amazon",
	"Microsoft",
	"Google",
	"Cognizant",
	"Freshworks",
	"L&T",
	"Bosch",
	"Ashok Leyland"
];
var facilities = [
	"Wi-Fi Campus",
	"Central Library",
	"Sports Complex",
	"Innovation Lab",
	"Research Centre",
	"Auditorium",
	"Medical Centre",
	"Cafeteria"
];
var scholarships = [
	"Merit Scholarship",
	"First Graduate Concession",
	"SC/ST Fee Waiver",
	"Sports Quota",
	"Girl Child Incentive"
];
[
	{
		code: "0001",
		name: "College of Engineering, Guindy (Anna University)",
		shortName: "CEG Anna University",
		district: "Chennai",
		address: "Sardar Patel Rd, Guindy, Chennai 600025",
		type: "University Dept.",
		naac: "A++",
		nba: true,
		established: 1794,
		fees: 55e3,
		hostel: true,
		hostelFees: 4e4,
		placementPercentage: 98,
		highestPackage: 44.5,
		averagePackage: 11.2,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(197, [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering"
		]),
		summary: "Flagship engineering college of Tamil Nadu with the oldest engineering pedigree in India. Consistent top placement records and strong research output."
	},
	{
		code: "2006",
		name: "PSG College of Technology",
		shortName: "PSG Tech",
		district: "Coimbatore",
		address: "Avinashi Rd, Peelamedu, Coimbatore 641004",
		type: "Government Aided",
		naac: "A++",
		nba: true,
		established: 1951,
		fees: 85e3,
		hostel: true,
		hostelFees: 65e3,
		placementPercentage: 96,
		highestPackage: 41,
		averagePackage: 10.1,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Robotics and Automation",
			"Biotechnology"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(195, [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering"
		]),
		summary: "Prestigious autonomous college in Coimbatore known for industry-linked programs, strong alumni network and research culture."
	},
	{
		code: "1315",
		name: "SSN College of Engineering",
		shortName: "SSN CE",
		district: "Kanchipuram",
		address: "Rajiv Gandhi Salai, Kalavakkam 603110",
		type: "Self-Financing",
		naac: "A+",
		nba: true,
		established: 1996,
		fees: 165e3,
		hostel: true,
		hostelFees: 9e4,
		placementPercentage: 95,
		highestPackage: 36.5,
		averagePackage: 8.9,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering",
			"Artificial Intelligence and Data Science"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(193, [
			"Computer Science and Engineering",
			"Information Technology",
			"Artificial Intelligence and Data Science",
			"Electronics and Communication Engineering"
		]),
		summary: "Modern residential campus with strong CS placements. Sponsored by Shiv Nadar Foundation."
	},
	{
		code: "2007",
		name: "Thiagarajar College of Engineering",
		shortName: "TCE Madurai",
		district: "Madurai",
		address: "Thiruparankundram, Madurai 625015",
		type: "Government Aided",
		naac: "A",
		nba: true,
		established: 1957,
		fees: 65e3,
		hostel: true,
		hostelFees: 45e3,
		placementPercentage: 92,
		highestPackage: 28,
		averagePackage: 7.5,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(190, [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering"
		]),
		summary: "Autonomous college with strong ties to industry in southern Tamil Nadu."
	},
	{
		code: "1128",
		name: "Coimbatore Institute of Technology",
		shortName: "CIT",
		district: "Coimbatore",
		address: "Civil Aerodrome Post, Coimbatore 641014",
		type: "Government Aided",
		naac: "A+",
		nba: true,
		established: 1956,
		fees: 6e4,
		hostel: true,
		hostelFees: 42e3,
		placementPercentage: 90,
		highestPackage: 24,
		averagePackage: 6.8,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Aeronautical Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(188, [
			"Computer Science and Engineering",
			"Aeronautical Engineering",
			"Electronics and Communication Engineering"
		]),
		summary: "Renowned government-aided institution with a legacy aeronautics program."
	},
	{
		code: "0002",
		name: "Madras Institute of Technology (Anna University)",
		shortName: "MIT Chromepet",
		district: "Chennai",
		address: "Chrompet, Chennai 600044",
		type: "University Dept.",
		naac: "A++",
		nba: true,
		established: 1949,
		fees: 55e3,
		hostel: true,
		hostelFees: 4e4,
		placementPercentage: 94,
		highestPackage: 38,
		averagePackage: 9.5,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Aeronautical Engineering",
			"Automobile Engineering",
			"Electronics and Communication Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(194, [
			"Computer Science and Engineering",
			"Aeronautical Engineering",
			"Automobile Engineering",
			"Information Technology"
		]),
		summary: "Historic Anna University department famed for aeronautical, automobile and instrumentation engineering."
	},
	{
		code: "2701",
		name: "Government College of Technology",
		shortName: "GCT Coimbatore",
		district: "Coimbatore",
		address: "Thadagam Rd, Coimbatore 641013",
		type: "Government",
		naac: "A",
		nba: true,
		established: 1945,
		fees: 45e3,
		hostel: true,
		hostelFees: 35e3,
		placementPercentage: 88,
		highestPackage: 22,
		averagePackage: 6.2,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering",
			"Chemical Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(189, [
			"Computer Science and Engineering",
			"Electronics and Communication Engineering",
			"Mechanical Engineering"
		]),
		summary: "Historic government engineering college with strong academic tradition and low fees."
	},
	{
		code: "1414",
		name: "Sri Sivasubramaniya Nadar College - CSE Branch",
		shortName: "SSN CSE Focus",
		district: "Kanchipuram",
		address: "Rajiv Gandhi Salai, OMR",
		type: "Self-Financing",
		naac: "A+",
		nba: true,
		established: 1996,
		fees: 165e3,
		hostel: true,
		hostelFees: 9e4,
		placementPercentage: 98,
		highestPackage: 44,
		averagePackage: 12.3,
		branches: ["Computer Science and Engineering"],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(196, ["Computer Science and Engineering"]),
		summary: "CS-focused stream at SSN with premium placement outcomes."
	},
	{
		code: "2008",
		name: "Kumaraguru College of Technology",
		shortName: "KCT",
		district: "Coimbatore",
		address: "Chinnavedampatti, Coimbatore 641049",
		type: "Self-Financing",
		naac: "A+",
		nba: true,
		established: 1984,
		fees: 145e3,
		hostel: true,
		hostelFees: 75e3,
		placementPercentage: 89,
		highestPackage: 26,
		averagePackage: 6.5,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Artificial Intelligence and Data Science",
			"Mechanical Engineering",
			"Civil Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(184, [
			"Computer Science and Engineering",
			"Artificial Intelligence and Data Science",
			"Information Technology"
		]),
		summary: "Innovation-first private college with startup incubators and a strong design program."
	},
	{
		code: "3803",
		name: "Mepco Schlenk Engineering College",
		shortName: "Mepco",
		district: "Sivaganga",
		address: "Mepco Engineering College Post, Sivakasi 626005",
		type: "Government Aided",
		naac: "A",
		nba: true,
		established: 1984,
		fees: 55e3,
		hostel: true,
		hostelFees: 4e4,
		placementPercentage: 85,
		highestPackage: 18,
		averagePackage: 5.6,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(180, [
			"Computer Science and Engineering",
			"Information Technology",
			"Electronics and Communication Engineering"
		]),
		summary: "Well-known aided institution in southern Tamil Nadu with steady placement record."
	},
	{
		code: "5901",
		name: "Government College of Engineering, Salem",
		shortName: "GCE Salem",
		district: "Salem",
		address: "Salem 636011",
		type: "Government",
		naac: "A",
		nba: false,
		established: 1966,
		fees: 42e3,
		hostel: true,
		hostelFees: 32e3,
		placementPercentage: 78,
		highestPackage: 14,
		averagePackage: 4.8,
		branches: [
			"Computer Science and Engineering",
			"Electronics and Communication Engineering",
			"Mechanical Engineering",
			"Civil Engineering"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(178, [
			"Computer Science and Engineering",
			"Electronics and Communication Engineering",
			"Mechanical Engineering"
		]),
		summary: "Affordable government college with strong core-engineering focus."
	},
	{
		code: "2611",
		name: "Bannari Amman Institute of Technology",
		shortName: "BIT Sathy",
		district: "Erode",
		address: "Sathyamangalam 638401",
		type: "Self-Financing",
		naac: "A+",
		nba: true,
		established: 1996,
		fees: 13e4,
		hostel: true,
		hostelFees: 7e4,
		placementPercentage: 87,
		highestPackage: 22,
		averagePackage: 6,
		branches: [
			"Computer Science and Engineering",
			"Information Technology",
			"Mechanical Engineering",
			"Civil Engineering",
			"Biotechnology"
		],
		recruiters,
		facilities,
		scholarships,
		cutoffs: cutoffs(182, [
			"Computer Science and Engineering",
			"Information Technology",
			"Biotechnology"
		]),
		summary: "Sprawling residential campus at the foothills of the Western Ghats."
	}
].length * 40, BRANCHES.length;
//#endregion
export { DISTRICTS as n, Label as r, COMMUNITIES as t };
