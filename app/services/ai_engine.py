from app.models.cutoff import YearlyCutoff
from app.models.college import College
from app.models.branch import Branch, CollegeBranch

class AIEngine:
    @staticmethod
    def generate_recommendations(user_profile, preferences):
        community = user_profile.get('community', 'OC')
        general_rank = user_profile.get('general_rank')
        community_rank = user_profile.get('community_rank')

        use_community_rank = (community != 'OC' and community_rank is not None)
        rank = community_rank if use_community_rank else general_rank
            
        if not rank:
            return {"error": "Rank is required for recommendations"}
            
        query = YearlyCutoff.query.filter_by(category=community).join(CollegeBranch)
        
        branches = preferences.get('preferred_branches', [])
        if branches:
            query = query.join(Branch).filter(Branch.code.in_(branches))
            
        # Order the query by year descending so we evaluate the most recent cutoffs first
        query = query.order_by(YearlyCutoff.year.desc())
        results = query.all()
        
        dream, target, safe = [], [], []
        seen = set()
        
        for record in results:
            cb = record.college_branch
            college = cb.college
            
            # Create a unique key for the college + branch combo
            combo_key = f"{college.id}-{cb.branch.name}"
            if combo_key in seen:
                continue
            
            districts = [d.lower() for d in preferences.get('preferred_districts', [])]
            if districts and (not college.district or college.district.lower() not in districts):
                continue
                
            if use_community_rank and record.community_rank is not None:
                cutoff_rank = record.community_rank
            else:
                if record.general_rank is None:
                    continue
                # The database only contains the general rank of the last admitted student for the community quota.
                # Therefore, we MUST fall back to comparing the user's general rank against it.
                cutoff_rank = record.general_rank
                rank = general_rank # Ensure we compare general against general
                
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
                seen.add(combo_key)
            elif -5000 <= diff <= 2000:
                college_info['explanation'] = "Good chance of admission based on recent cutoffs."
                target.append(college_info)
                seen.add(combo_key)
            elif diff > 2000:
                college_info['explanation'] = "Safe option as your rank is well within the historical cutoff."
                safe.append(college_info)
                seen.add(combo_key)
                
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
