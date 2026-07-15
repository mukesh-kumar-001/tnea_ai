from app.models.cutoff import YearlyCutoff
from app.models.college import College
from app.models.branch import Branch, CollegeBranch

class AIEngine:
    @staticmethod
    def generate_recommendations(user_profile, preferences):
        community = user_profile.get('community', 'OC')
        rank = user_profile.get('general_rank')
        if community != 'OC' and user_profile.get('community_rank'):
            rank = user_profile.get('community_rank')
            
        if not rank:
            return {"error": "Rank is required for recommendations"}
            
        query = YearlyCutoff.query.filter_by(category=community).join(CollegeBranch)
        
        branches = preferences.get('preferred_branches', [])
        if branches:
            query = query.join(Branch).filter(Branch.code.in_(branches))
            
        results = query.all()
        
        dream, target, safe = [], [], []
        
        for record in results:
            cb = record.college_branch
            college = cb.college
            
            districts = preferences.get('preferred_districts', [])
            if districts and college.district not in districts:
                continue
                
            cutoff_rank = record.community_rank if record.community_rank else record.general_rank
            if not cutoff_rank: continue
                
            diff = cutoff_rank - rank
            
            college_info = {
                "college_id": college.id,
                "name": college.name,
                "branch": cb.branch.name,
                "historical_cutoff_rank": cutoff_rank,
                "probability": AIEngine._calculate_probability(diff)
            }
            
            if diff < -5000:
                college_info['explanation'] = "Highly competitive based on historical trends."
                dream.append(college_info)
            elif -5000 <= diff <= 2000:
                college_info['explanation'] = "Good chance of admission based on recent cutoffs."
                target.append(college_info)
            elif diff > 2000:
                college_info['explanation'] = "Safe option as your rank is well within the historical cutoff."
                safe.append(college_info)
                
        dream.sort(key=lambda x: x['probability'], reverse=True)
        target.sort(key=lambda x: x['probability'], reverse=True)
        safe.sort(key=lambda x: x['probability'], reverse=True)
        
        return {
            "dream": dream[:10],
            "target": target[:10],
            "safe": safe[:10]
        }
        
    @staticmethod
    def _calculate_probability(rank_diff):
        if rank_diff > 5000: return 0.95
        if rank_diff > 0: return 0.70 + (0.25 * (rank_diff / 5000))
        if rank_diff > -5000: return 0.30 + (0.40 * ((5000 + rank_diff) / 5000))
        return 0.10
