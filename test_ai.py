from app import create_app
from app.services.ai_engine import AIEngine

app = create_app()
with app.app_context():
    user_profile = {
        "community": "BC",
        "general_rank": 2500,
        "community_rank": 1400
    }
    preferences = {
        "preferred_branches": [],
        "preferred_districts": []
    }
    
    res = AIEngine.generate_recommendations(user_profile, preferences)
    print("Recommendations size:", len(res.get("dream", [])), len(res.get("target", [])), len(res.get("safe", [])))
