from app.models.cutoff import YearlyCutoff
from app.models.branch import Branch


class AIEngine:

    @staticmethod
    def generate_recommendations(user_profile, preferences):

        community = user_profile.get("community", "OC")
        general_rank = user_profile.get("general_rank")

        if general_rank is None:
            return {"error": "General Rank is required"}

        try:
            general_rank = int(general_rank)
        except Exception:
            return {"error": "Invalid General Rank"}

        query = (
            YearlyCutoff.query
            .filter(
                YearlyCutoff.year == 2025,
                YearlyCutoff.category == community,
                YearlyCutoff.general_rank.isnot(None)
            )
        )

        preferred_branches = preferences.get("preferred_branches", [])

        if preferred_branches:
            query = (
                query.join(YearlyCutoff.college_branch)
                .join(Branch)
                .filter(Branch.code.in_(preferred_branches))
            )

        results = query.all()

        dream = []
        target = []
        safe = []

        seen = set()

        preferred_districts = [
            d.lower()
            for d in preferences.get("preferred_districts", [])
            if d
        ]

        for record in results:

            if not record.college_branch:
                continue

            cb = record.college_branch

            if not cb.college or not cb.branch:
                continue

            college = cb.college
            branch = cb.branch

            if preferred_districts:
                if (
                    not college.district
                    or college.district.lower() not in preferred_districts
                ):
                    continue

            key = (college.id, branch.id)

            if key in seen:
                continue

            cutoff_rank = record.general_rank

            diff = cutoff_rank - general_rank

            item = {
                "college_id": college.id,
                "name": college.name,
                "branch": branch.name,
                "college_code": college.tnea_code,
                "historical_cutoff_rank": cutoff_rank,
                "probability": AIEngine._calculate_probability(diff)
            }

            if diff < -5000:
                item["explanation"] = (
                    "This college is historically more competitive."
                )
                dream.append(item)

            elif diff <= 2000:
                item["explanation"] = (
                    "You have a good chance based on previous cutoffs."
                )
                target.append(item)

            else:
                item["explanation"] = (
                    "This is a safe option based on previous cutoffs."
                )
                safe.append(item)

            seen.add(key)

        dream.sort(key=lambda x: x["probability"], reverse=True)
        target.sort(key=lambda x: x["probability"], reverse=True)
        safe.sort(key=lambda x: x["probability"], reverse=True)

        return {
            "dream": dream[:10],
            "target": target[:10],
            "safe": safe[:10]
        }

    @staticmethod
    def _calculate_probability(diff):

        if diff >= 15000:
            return 99

        if diff >= 10000:
            return 95

        if diff >= 5000:
            return 90

        if diff >= 2000:
            return 80

        if diff >= 0:
            return 70

        if diff >= -3000:
            return 50

        if diff >= -8000:
            return 30

        return 10