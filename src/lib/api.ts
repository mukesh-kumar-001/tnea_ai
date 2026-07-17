import { useQuery, useMutation } from "@tanstack/react-query";
import { type College as MockCollege, type CutoffRow } from "./mock-data";

export interface ApiCollegeResponse {
  id: number;
  tnea_code: string;
  name: string;
  district: string;
  type: string;
  autonomous: boolean;
  established_year?: number;
}

export interface ApiCutoffResponse {
  branch_code: string;
  branch_name: string;
  category: string;
  college_code: string;
  college_name: string;
  community_rank: number | null;
  cutoff_mark: number | null;
  general_rank: number | null;
  year: number;
}

const titleCase = (str: string) => str ? str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) : "Unknown";

const mapBackendToMockCollege = (c: any): MockCollege => {
  return {
    id: c.id,
    code: c.tnea_code,
    name: c.name,
    autonomous: c.autonomous,
    shortName: c.name.split(" ").slice(0, 3).join(" "), // Simple derived shortName
    district: titleCase(c.district),
    address: c.district ? `${titleCase(c.district)}, Tamil Nadu` : "Tamil Nadu",
    type: (c.type || "Self-Financing") as any,
    naac: "Not Accredited",
    nba: false,
    established: c.established_year || 2000,
    fees: c.fees && c.fees.length > 0 && c.fees[0].tuition_fee !== null ? c.fees[0].tuition_fee + (c.fees[0].other_fees || 0) : null,
    hostel: c.hostel ? (c.hostel.boys_hostel_available || c.hostel.girls_hostel_available) : null,
    hostelFees: c.hostel?.annual_fee || null,
    placementPercentage: c.placements?.placement_percentage || null,
    highestPackage: c.placements?.highest_package || null,
    averagePackage: c.placements?.average_package || null,
    branches: c.branches ? c.branches.map((b: any) => b.name) : [],
    recruiters: [], // Still mock or empty if not in DB
    facilities: c.facilities ? [
      ...(c.facilities.has_library ? ["Central Library"] : []),
      ...(c.facilities.has_sports ? ["Sports Complex"] : []),
      ...(c.facilities.has_transport ? ["Transport"] : [])
    ] : [],
    scholarships: [], // Still mock or empty if not in DB
    cutoffs: [],
    summary: c.name
  };
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const fetchColleges = async (page = 1, perPage = 20) => {
  const res = await fetch(`${API_BASE}/api/colleges/?page=${page}&per_page=${perPage}`);
  if (!res.ok) throw new Error("Failed to fetch colleges");
  const data = await res.json();
  return {
    ...data,
    colleges: data.colleges.map(mapBackendToMockCollege) as MockCollege[]
  };
};

export const fetchAllCollegesList = async () => {
  const res = await fetch(`${API_BASE}/api/colleges/?page=1&per_page=1000`);
  if (!res.ok) throw new Error("Failed to fetch all colleges");
  const data = await res.json();
  return data.colleges.map(mapBackendToMockCollege) as MockCollege[];
};

export const fetchCollegeById = async (id: number) => {
  const res = await fetch(`${API_BASE}/api/colleges/${id}`);
  if (!res.ok) throw new Error("Failed to fetch college");
  const data = await res.json();
  return mapBackendToMockCollege(data);
};

export const fetchAllBranches = async () => {
  const res = await fetch(`${API_BASE}/api/branches/`);
  if (!res.ok) throw new Error("Failed to fetch branches");
  const data = await res.json();
  return data.branches as { code: string; name: string }[];
};

export const fetchCutoffs = async (filters: { college_code?: string; branch_code?: string; category?: string; year?: number; page?: number; per_page?: number }) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, String(v));
  });
  const res = await fetch(`${API_BASE}/api/cutoffs/?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch cutoffs");
  return await res.json() as { data: ApiCutoffResponse[]; total: number; pages: number; current_page: number };
};

export const fetchRecommendations = async (payload: any) => {
  const res = await fetch(`${API_BASE}/api/recommendations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMsg = "Failed to fetch recommendations";
    try {
      const errData = await res.json();
      if (errData.error) errorMsg = errData.error;
    } catch (e) {
      // Ignore JSON parse errors for 500s
    }
    throw new Error(errorMsg);
  }
  return await res.json();
};

// --- React Query Hooks ---

export const useColleges = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["colleges", page, perPage],
    queryFn: () => fetchColleges(page, perPage),
  });
};

export const useAllColleges = () => {
  return useQuery({
    queryKey: ["all-colleges"],
    queryFn: fetchAllCollegesList,
  });
};

export const useBranches = () => {
  return useQuery({
    queryKey: ["branches"],
    queryFn: fetchAllBranches,
  });
};

export const useCutoffs = (filters: any) => {
  return useQuery({
    queryKey: ["cutoffs", filters],
    queryFn: () => fetchCutoffs(filters),
  });
};
